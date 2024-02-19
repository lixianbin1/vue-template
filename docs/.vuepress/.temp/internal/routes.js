export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "v-0a2bba05" */"D:/Project/template-vue3-test/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":"开始使用"} }],
  ["/", { loader: () => import(/* webpackChunkName: "v-4ec95bbd" */"D:/Project/template-vue3-test/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"Home"} }],
  ["/en/get-started.html", { loader: () => import(/* webpackChunkName: "v-3d4a2a02" */"D:/Project/template-vue3-test/docs/.vuepress/.temp/pages/en/get-started.html.js"), meta: {"title":"Get Started"} }],
  ["/en/", { loader: () => import(/* webpackChunkName: "v-41875037" */"D:/Project/template-vue3-test/docs/.vuepress/.temp/pages/en/index.html.js"), meta: {"title":"Home"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "v-8fe89ed2" */"D:/Project/template-vue3-test/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);
