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

<br>

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

构建测试，则需执行以下命令

```bash
pnpm build-test
```

然后你会看到用于发布的 `dist` 文件夹被生成。并执行模拟静态文件服务器的执行