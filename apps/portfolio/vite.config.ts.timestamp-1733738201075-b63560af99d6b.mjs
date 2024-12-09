// apps/portfolio/vite.config.ts
import analog from "file:///C:/Users/tsiro/Documents/Web%20Development/angular/nx-suite/node_modules/@analogjs/platform/src/index.js";
import { nxViteTsPaths } from "file:///C:/Users/tsiro/Documents/Web%20Development/angular/nx-suite/node_modules/@nx/vite/plugins/nx-tsconfig-paths.plugin.js";
import { typescriptPaths } from "file:///C:/Users/tsiro/Documents/Web%20Development/angular/nx-suite/node_modules/rollup-plugin-typescript-paths/dist/index.js";
import { defineConfig, splitVendorChunkPlugin } from "file:///C:/Users/tsiro/Documents/Web%20Development/angular/nx-suite/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///C:/Users/tsiro/Documents/Web%20Development/angular/nx-suite/node_modules/vite-plugin-static-copy/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\tsiro\\Documents\\Web Development\\angular\\nx-suite\\apps\\portfolio";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    root: __vite_injected_original_dirname,
    cacheDir: `../../node_modules/.vite`,
    ssr: {
      noExternal: [
        "@analogjs/trpc",
        "@trpc/server",
        "@ng-web-apis/**",
        "@taiga-ui/**",
        "@maskito/**"
      ]
    },
    build: {
      outDir: "../../dist/apps/portfolio/client",
      reportCompressedSize: true,
      target: ["es2020"]
    },
    server: {
      fs: {
        allow: ["."]
      }
    },
    plugins: [
      analog({
        ssr: true,
        nitro: {
          externals: {
            inline: ["tslib"]
          },
          rollupConfig: {
            plugins: [
              typescriptPaths({
                tsConfigPath: "tsconfig.base.json",
                preserveExtensions: true
              })
            ]
          },
          routeRules: {
            "/": {
              prerender: false
            }
          }
        }
      }),
      viteStaticCopy({
        targets: [
          {
            src: "../../node_modules/@taiga-ui/icons/src/**",
            dest: "./assets/taiga-ui/icons"
          },
          {
            src: "./public/**",
            dest: "./assets/images"
          }
        ]
      }),
      nxViteTsPaths(),
      splitVendorChunkPlugin()
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["src/test-setup.ts"],
      include: ["**/*.spec.ts"],
      reporters: ["default"]
    },
    define: {
      "import.meta.vitest": mode !== "production"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBwcy9wb3J0Zm9saW8vdml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx0c2lyb1xcXFxEb2N1bWVudHNcXFxcV2ViIERldmVsb3BtZW50XFxcXGFuZ3VsYXJcXFxcbngtc3VpdGVcXFxcYXBwc1xcXFxwb3J0Zm9saW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHRzaXJvXFxcXERvY3VtZW50c1xcXFxXZWIgRGV2ZWxvcG1lbnRcXFxcYW5ndWxhclxcXFxueC1zdWl0ZVxcXFxhcHBzXFxcXHBvcnRmb2xpb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdHNpcm8vRG9jdW1lbnRzL1dlYiUyMERldmVsb3BtZW50L2FuZ3VsYXIvbngtc3VpdGUvYXBwcy9wb3J0Zm9saW8vdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCBhbmFsb2cgZnJvbSAnQGFuYWxvZ2pzL3BsYXRmb3JtJztcbmltcG9ydCB7IG54Vml0ZVRzUGF0aHMgfSBmcm9tICdAbngvdml0ZS9wbHVnaW5zL254LXRzY29uZmlnLXBhdGhzLnBsdWdpbic7XG5pbXBvcnQgeyB0eXBlc2NyaXB0UGF0aHMgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXR5cGVzY3JpcHQtcGF0aHMnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBzcGxpdFZlbmRvckNodW5rUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgcmV0dXJuIHtcbiAgICByb290OiBfX2Rpcm5hbWUsXG4gICAgY2FjaGVEaXI6IGAuLi8uLi9ub2RlX21vZHVsZXMvLnZpdGVgLFxuXG4gICAgc3NyOiB7XG4gICAgICBub0V4dGVybmFsOiBbXG4gICAgICAgICdAYW5hbG9nanMvdHJwYycsXG4gICAgICAgICdAdHJwYy9zZXJ2ZXInLFxuICAgICAgICAnQG5nLXdlYi1hcGlzLyoqJyxcbiAgICAgICAgJ0B0YWlnYS11aS8qKicsXG4gICAgICAgICdAbWFza2l0by8qKicsXG4gICAgICBdLFxuICAgIH0sXG5cbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiAnLi4vLi4vZGlzdC9hcHBzL3BvcnRmb2xpby9jbGllbnQnLFxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXG4gICAgICB0YXJnZXQ6IFsnZXMyMDIwJ10sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGZzOiB7XG4gICAgICAgIGFsbG93OiBbJy4nXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICBhbmFsb2coe1xuICAgICAgICBzc3I6IHRydWUsXG4gICAgICAgIG5pdHJvOiB7XG4gICAgICAgICAgZXh0ZXJuYWxzOiB7XG4gICAgICAgICAgICBpbmxpbmU6IFsndHNsaWInXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJvbGx1cENvbmZpZzoge1xuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICB0eXBlc2NyaXB0UGF0aHMoe1xuICAgICAgICAgICAgICAgIHRzQ29uZmlnUGF0aDogJ3RzY29uZmlnLmJhc2UuanNvbicsXG4gICAgICAgICAgICAgICAgcHJlc2VydmVFeHRlbnNpb25zOiB0cnVlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByb3V0ZVJ1bGVzOiB7XG4gICAgICAgICAgICAnLyc6IHtcbiAgICAgICAgICAgICAgcHJlcmVuZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICB0YXJnZXRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnLi4vLi4vbm9kZV9tb2R1bGVzL0B0YWlnYS11aS9pY29ucy9zcmMvKionLFxuICAgICAgICAgICAgZGVzdDogJy4vYXNzZXRzL3RhaWdhLXVpL2ljb25zJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJy4vcHVibGljLyoqJyxcbiAgICAgICAgICAgIGRlc3Q6ICcuL2Fzc2V0cy9pbWFnZXMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIG54Vml0ZVRzUGF0aHMoKSxcbiAgICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcbiAgICBdLFxuICAgIHRlc3Q6IHtcbiAgICAgIGdsb2JhbHM6IHRydWUsXG4gICAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgICAgIHNldHVwRmlsZXM6IFsnc3JjL3Rlc3Qtc2V0dXAudHMnXSxcbiAgICAgIGluY2x1ZGU6IFsnKiovKi5zcGVjLnRzJ10sXG4gICAgICByZXBvcnRlcnM6IFsnZGVmYXVsdCddLFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAnaW1wb3J0Lm1ldGEudml0ZXN0JzogbW9kZSAhPT0gJ3Byb2R1Y3Rpb24nLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxPQUFPLFlBQVk7QUFDbkIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxjQUFjLDhCQUE4QjtBQUNyRCxTQUFTLHNCQUFzQjtBQU4vQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsSUFFVixLQUFLO0FBQUEsTUFDSCxZQUFZO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1Isc0JBQXNCO0FBQUEsTUFDdEIsUUFBUSxDQUFDLFFBQVE7QUFBQSxJQUNuQjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsT0FBTyxDQUFDLEdBQUc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFVBQ0wsV0FBVztBQUFBLFlBQ1QsUUFBUSxDQUFDLE9BQU87QUFBQSxVQUNsQjtBQUFBLFVBQ0EsY0FBYztBQUFBLFlBQ1osU0FBUztBQUFBLGNBQ1AsZ0JBQWdCO0FBQUEsZ0JBQ2QsY0FBYztBQUFBLGdCQUNkLG9CQUFvQjtBQUFBLGNBQ3RCLENBQUM7QUFBQSxZQUNIO0FBQUEsVUFDRjtBQUFBLFVBQ0EsWUFBWTtBQUFBLFlBQ1YsS0FBSztBQUFBLGNBQ0gsV0FBVztBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsZUFBZTtBQUFBLFFBQ2IsU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxjQUFjO0FBQUEsTUFDZCx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0EsTUFBTTtBQUFBLE1BQ0osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDLG1CQUFtQjtBQUFBLE1BQ2hDLFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDeEIsV0FBVyxDQUFDLFNBQVM7QUFBQSxJQUN2QjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sc0JBQXNCLFNBQVM7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
