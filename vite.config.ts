import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.ts'),
      name: "vue-openweather",
      fileName: (format) => `vue-openweather.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    Icons({
      autoInstall: true
    }),
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'i'
        })
      ]
    })
  ]
})
