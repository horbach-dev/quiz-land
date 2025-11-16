import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ngrok } from 'vite-plugin-ngrok';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());



  return {
    plugins: [
      react(),
      env.VITE_USE_NGROK && ngrok({
        authtoken: env.VITE_NGROK_TOKEN,
        domain: env.VITE_NGROK_DOMAIN,
        port: 5173,
      })
    ],
    server: {
      host: true,
      allowedHosts: [
        env.VITE_NGROK_DOMAIN?.replace('https://', '').replace('http://', ''),
      ],
    },
  }
})
