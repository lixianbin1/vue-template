<h1 align='center'>template-vue3-test</h1>

<br>

<p align='center'>
<b>English</b> | <a href="./README.md">简体中文</a>

</p>

<br>

## Features

 - Based on [Vue 3](https://cn.vuejs.org/), [Vite](https://cn.vitejs.dev/), [pnpm](https://pnpm.io/)Carry out project construction

 - Vite uses [esbuild](https://esbuild.github.io/getting-started/)Perform packaging management

 - Using [Typescript](https://www.typescriptlang.org/)Make type declarations and checks

 - File based [vite plugin pages](https://github.com/hannoeru/vite-plugin-pages)[vue router](https://router.vuejs.org/)Management and [vite plugin vue layouts](https://github.com/johncampionjr/vite-plugin-vue-layouts)Layout management

 - Using [unplugin auto import](https://github.com/antfu/unplugin-auto-import)And [unplugin vue components](https://github.com/unplugin/unplugin-vue-components)Perform automated management

 - Using [axios](https://www.axios-http.cn/docs/intro)Make network requests-Using [Pinia](https://pinia.vuejs.org)Perform status management

 - Using [SCSS](https://www.sass.hk/guide/)Perform style extension-Join [VueUse](https://vueuse.org/guide/)Composition API tool for simplifying development work

 - Join [vue-i18n] (./locals) for internationalization and translation

<br>

> Vitesse requires Node >=14.18

## Usage

### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

To build the test, you need to execute the following command

```Bash
Pnpm build test
```

Then you will see that the 'dist' folder for publishing is generated. And execute simulated static file server execution