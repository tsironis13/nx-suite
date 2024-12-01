/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,

    ssr: {
      noExternal: [
        '@analogjs/trpc',
        '@trpc/server',
        '@ng-web-apis/**',
        '@taiga-ui/**',
        '@maskito/**',
      ],
    },

    build: {
      outDir: '../../dist/apps/portfolio/client',
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
          externals: {
            inline: ['tslib'],
          },
          rollupConfig: {
            plugins: [
              typescriptPaths({
                tsConfigPath: 'tsconfig.base.json',
                preserveExtensions: true,
              }),
            ],
          },
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
            dest: './assets/taiga-ui/icons',
          },
          {
            src: './public/**',
            dest: './assets/images',
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
