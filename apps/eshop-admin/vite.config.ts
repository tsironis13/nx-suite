/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,

    ssr: {
      noExternal: ['@analogjs/trpc', '@trpc/server'],
    },

    build: {
      outDir: '../../dist/apps/eshop-admin/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      analog({
        ssr: true,
        nitro: {
          routeRules: {
            '/': {
              prerender: false,
            },
          },
        },
      }),
      viteStaticCopy({
        targets: [
          {
            src: '../../node_modules/@taiga-ui/icons/src/**',
            dest: '/assets/taiga-ui/icons',
          },
        ],
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
