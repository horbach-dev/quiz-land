import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { EnvUnsupported } from './app/EnvUnsupported';
import { init } from './app/init';
import { App } from './app';
import './app/mockEnv';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const isDev = import.meta.env.VITE_DEV;

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;

  await init({
    debug: isDev,
    eruda: true,
    // eruda: isDev && ['ios', 'android'].includes(platform),
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
  root.render(<EnvUnsupported />);
}
