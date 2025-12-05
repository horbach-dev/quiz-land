import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
import ngrok from '@ngrok/ngrok';
import path from 'path';

const VITE_PORT = 5173;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const plugins: PluginOption[] = [react(), tailwindcss()];

  if (env.VITE_USE_NGROK) {
    plugins.push(
      ngrokPlugin({
        port: VITE_PORT,
        token: env.VITE_NGROK_TOKEN,
        domain: env.VITE_NGROK_DOMAIN,
      }),
    );
  }

  if (env.VITE_VISUALIZER) {
    plugins.push(
      visualizer({
        filename: 'stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    );
  }

  return {
    plugins,
    server: {
      port: VITE_PORT,
      host: true,
      allowedHosts: [env.VITE_NGROK_DOMAIN],
    },
    root: path.resolve(__dirname),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      outDir: '../docs',
      emptyOutDir: true,
    },
    base: '/quiz-land/',
  };
});

let ngrokListener: ngrok.Listener | null = null;
function ngrokPlugin({
  token,
  domain,
  port,
}: {
  token: string;
  domain: string;
  port: number;
}) {
  return {
    name: 'vite-plugin-ngrok-runner',
    async buildStart() {
      if (ngrokListener) return;

      try {
        ngrokListener = await ngrok.connect({
          addr: port,
          authtoken: token,
          domain,
        });

        console.log('----------------------------------------');
        console.log('🌍 Public Ngrok URL:', ngrokListener.url());
        console.log('----------------------------------------');
      } catch (error) {
        console.error('Ошибка запуска ngrok:', error);
        process.exit(1);
      }
    },

    async buildEnd() {
      if (ngrokListener) {
        await ngrokListener.close();
        ngrokListener = null;
        console.log('Ngrok disconnected.');
      }
    },
  };
}
