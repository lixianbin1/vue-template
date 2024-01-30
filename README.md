<h1 align='center'>template-vue3-test</h1>

<br>

<p align='center'>
<a href="./README.en.md">English</a> | <b>简体中文</b>
</p>

<br>

## 介绍

- 基于[Vue 3](https://cn.vuejs.org/), [Vite](https://cn.vitejs.dev/), [pnpm](https://pnpm.io/)进行项目搭建

- Vite使用[ esbuild ](https://esbuild.github.io/getting-started/) 进行打包管理

- 使用[ Typescript ](https://www.typescriptlang.org/) 进行类型声明和检查

- 基于文件的[ vite-plugin-pages ](https://github.com/hannoeru/vite-plugin-pages) [vue-router](https://router.vuejs.org/)管理和 [ vite-plugin-vue-layouts ](https://github.com/johncampionjr/vite-plugin-vue-layouts) 布局管理

- 使用[ unplugin-auto-import ](https://github.com/antfu/unplugin-auto-import) 和[unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 进行自动化管理

- 使用[ axios ](https://www.axios-http.cn/docs/intro)进行网络请求

- 使用[ Pinia ](https://pinia.vuejs.org)进行状态管理

- 使用[ SCSS ](https://www.sass.hk/guide/)进行样式扩展

- 加入[ VueUse ](https://vueuse.org/guide/) Composition API 工具以便于简化开发工作

- 加入 [ vue-i18n ](./locales) 进行国际化进行翻译


- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://github.com/antfu/unocss/tree/main/packages/preset-icons)




- 🦔 使用 [critters](https://github.com/GoogleChromeLabs/critters) 的生成关键 CSS

<br>

## 预配置

### UI 框架

- [UnoCSS](https://github.com/antfu/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

### Icons

- [Iconify](https://iconify.design) - 使用任意的图标集，浏览：[🔍Icônes](https://icones.netlify.app/)
- [UnoCSS 的纯 CSS 图标方案](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### 插件

- [Vue I18n](https://github.com/intlify/vue-i18n-next) - 国际化
  - [`unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - Vue I18n 的 Vite 插件
- [VueUse](https://github.com/antfu/vueuse) - 实用的 Composition API 工具合集
- [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - 站点地图生成器
- [`@vueuse/head`](https://github.com/vueuse/head) - 响应式地操作文档头信息
- [`vite-plugin-vue-inspector`](https://github.com/webfansplz/vite-plugin-vue-inspector) - 点击页面元素自动跳转到本地IDE对应的 Vue 组件

### 编码风格

- [ESLint](https://eslint.org/) 配置为 [@antfu/eslint-config](https://github.com/antfu/eslint-config), 单引号, 无分号.

### 开发工具
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - 基于 Vite 的单元测试框架
- [Cypress](https://cypress.io/) - E2E 测试
- [pnpm](https://pnpm.js.org/) - 快, 节省磁盘空间的包管理器
- [VS Code 扩展](./.vscode/extensions.json)
  - [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - 自动启动 Vite 服务器
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE 支持
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - 图标内联显示和自动补全
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - 多合一的 I18n 支持
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

> Vitesse 需要 Node 版本 >=14.18

## 使用

### 开发

只需要执行以下命令就可以在 http://localhost:3333 中看到

```bash
pnpm dev
```

### 构建

构建该应用只需要执行以下命令

```bash
pnpm build
```

然后你会看到用于发布的 `dist` 文件夹被生成。