import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base:'/template-vue3-test/',

  lang: 'zh-CN',
  title: 'template-vue3-test',
  description: '使用 Vue3 构建的网站模板',

  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'template-vue3-test',
      description: 'Website templates built with Vue3',
    },
    '/': {
      lang: 'zh-CN',
      title: 'template-vue3-test',
      description: '使用 Vue3 构建的网站模板',
    },
  },

  theme: defaultTheme({
    logo: './img/logo01.png',
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        navbar: [
          {
            text: '首页',
            link: '/',
          },
          {
            text: '开始使用',
            link: 'get-started',
          },
        ],
      },
      '/en/': {
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'Home',
            link: '/en/',
          },
          {
            text: 'Get Started',
            link: '/en/get-started',
          },
        ],
      },
    },
  }),

  bundler: viteBundler(),
})