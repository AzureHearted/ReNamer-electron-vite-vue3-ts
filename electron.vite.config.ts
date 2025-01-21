import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//s 自动按需引入配置
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'

//s NaiveUi配置
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

//s vxe-table配置
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@common': resolve('src/common')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/preload/index.ts'),
          addRule: resolve(__dirname, 'src/preload/index.ts')
        }
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/renderer/index.html'),
          addRule: resolve(__dirname, 'src/renderer/index.html')
        }
      }
    },
    server: {},
    resolve: {
      alias: {
        '@common': resolve('src/common'),
        '@renderer': resolve('src/renderer/src'),
        '@style': resolve('src/renderer/src/styles'),
        '@utils': resolve('src/renderer/src/utils')
      }
    },
    plugins: [
      vue(),
      vueDevTools(),
      //s 自动导入
      autoImport({
        imports: [
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        resolvers: [
          // ElementPlusResolver({
          //   importStyle: 'sass'
          // })
        ],
        dts: 'types/auto-imports.d.ts'
      }),
      //s 组件自动导入
      components({
        resolvers: [
          // ElementPlusResolver({
          //   importStyle: 'sass'
          // }),
          NaiveUiResolver()
        ],
        dts: 'types/components.d.ts'
      }),
      lazyImport({
        resolvers: [
          VxeResolver({
            libraryName: 'vxe-table'
          }),
          VxeResolver({
            libraryName: 'vxe-pc-ui'
          })
        ]
      })
    ]
  }
})
