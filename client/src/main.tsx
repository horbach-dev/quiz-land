import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { EnvUnsupported } from './app/EnvUnsupported.tsx';
import { init } from './app/initTelegram.ts';
import { App } from './app';
import './app/mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const isDev = import.meta.env.VITE_DEV;

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug')
    || import.meta.env.DEV;

  await init({
    debug,
    eruda: isDev && ['ios', 'android'].includes(platform),
    // eruda: true,
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
