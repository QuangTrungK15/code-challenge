import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(`Building in mode: ${mode}`);
  console.log(
    `Loaded env vars:`,
    Object.keys(env).filter((k) => k.startsWith('VITE_'))
  );
  const isProduction = mode === 'production';

  return {
    plugins: [
      react({
        babel: {
          plugins: ['babel-plugin-react-compiler']
        }
      }),
      tailwindcss(),
      checker({
        overlay: false,
        typescript: true
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    server: {
      host: '127.0.0.1',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    },
    build: {
      outDir: 'build',
      sourcemap: !isProduction,
      rollupOptions: {
        input: {
          main: 'index.html'
        },
        output: {
          entryFileNames: 'entry-[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks(id) {
            // Split components into separate chunks
            if (id.includes('/src/components/')) {
              const componentName = id.split('/src/components/')[1].split('/')[0];
              return `comp-${componentName}`;
            }

            // Split vendor code more granularly
            if (id.includes('node_modules')) {
              const directories = id.split('node_modules/')[1].split('/');
              const packageName = directories[0].startsWith('@') ? `${directories[0]}/${directories[1]}` : directories[0];

              // React core libraries
              if (packageName === 'react' || packageName === 'react-dom') {
                return 'vendor-react';
              }

              // Redux
              if (packageName.includes('redux') || packageName.includes('@reduxjs')) {
                return 'vendor-redux';
              }

              // Other large dependencies
              if (packageName === 'axios') {
                return 'vendor-axios';
              }

              // All other node_modules
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
