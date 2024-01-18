import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({
  plugins: [
    vue(),
    Layouts(),
    AutoImport({ 
      imports: [ //需要全局自动导入的模块
        'vue',
      ],
      dts: 'src/auto-imports.d.ts', //自动生成的导入文件路径
      dirs: [ //需要自动导入的模块文件
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true, //在vue模板中开启
      resolvers: [ //自定义解析器，兼容unplugin-vue-components

      ],
    }),
    Components({
      extensions: ['vue'], //需要全局自动导入的模块
      include: [/\.vue$/, /\.vue\?vue/], //包含匹配文件
      exclude: [/[\\/]\.git[\\/]/], //过滤匹配文件
      dts: 'src/components.d.ts', //自动生成的导入文件路径
      resolvers: [ //自定义解析器

      ],
    }),
    Pages({
      extensions: ['vue'], //有效的文件后缀
      dirs: 'src/pages', //指定文件根目录
      extendRoute(route, parent) {
        return route
      },
    }),
  ],
  // 本地服务
  server:{
    open:true,
    port:8080,
    host:"0.0.0.0",
    proxy: { //设置代理
      '/api': { 
        target: 'http://localhost:8087/', //本地
        // target: 'http://xxx.xxx.xxx.xxx:8087/',
        changeOrigin: true, // 是否跨域
        rewrite: path => path.replace('/^\/api/', '/api'),
      },
    },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    }
  }
})
