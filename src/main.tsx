import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { EnvUnsupported } from './app/EnvUnsupported';
import { init } from './app/init';
import { App } from './app';
import './app/mockEnv';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug')
    || import.meta.env.DEV;

  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  })
    .then(() => {
      root.render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    });
} catch (_: any) {
  root.render(<EnvUnsupported/>);
}
