# 乾坤微前端架构

官网： [qiankun 微服务架构](https://qiankun.umijs.org/zh)

微前端的意义： [微前端的核心价值](https://zhuanlan.zhihu.com/p/95085796)、[微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)



## 什么是微前端架构？

微前端架构 旨在解决单体应用在相对长的时间跨度下，由于参与人员不同、团队不断变迁，从一个普通应用演变成一个巨石应用后，随之而来的应用难以维护的问题。

微前端价值：

- 与技术栈无关：主框架不限制接入应用的技术栈，微应用具有完全自主权；
- 独立开发、独立部署：微应用可以仓库独立，前后端独立发布，部署完成侯主框架自动完成同步更新；
- 独立运行时：每个微应用之间状态隔离，运行时状态不共享；
- 增量升级：旧系统难以做技术栈升级和迁移时，可以使用微前端接入新系统；



## 核心概念

### 主应用（基座）

主应用 就好比一个“大管家”，负责 **全局路由的规划**、**管理整个项目的状态**，还要 **调度各个微应用**，控制它们什么时候“登场”，在项目中起着统筹协调的关键作用。

### 微应用

微应用 则是一个个独立开发、独立部署的业务模块。每一个微应用都负责特定的业务功能，而且不同的微应用还可以使用不同的技术栈（不局限于 Vue、React、Angular 等），这就大大的提高了项目开发的灵活性。

### 通信机制

主应用和微应用之间需要进行数据交互时，需要通过 `props` 或者 `全局状态` 来共享数据，这样能够协同工作，实现整个项目的功能。



## 基本使用

### 主应用配置

#### 创建主应用

```shell
# 创建 vue3 的主应用，名称叫 micro-base
pnpm create vite

# 安装 qiankun 框架
pnpm i qiankun -S
```

#### 注册微应用

新建 `src/micro/apps.ts` 文件，用于专门管理微应用。

```ts 
const apps = [
  {
    name: "vue-app",
    activeRule: "/vue-app",
    entry: "http://localhost:9523",
    container: "#micro-app-container",
  },
];

export default apps;
```

参数：

|    参数    | 是否必选 | 描述                                                         |
| :--------: | :------: | :----------------------------------------------------------- |
|    name    |   必选   | 微应用名称，微应用之间必须确保唯一                           |
| activeRule |   必选   | 微应用触发的路由规则，触发路由规则后将加载该微应用           |
|   entry    |   必选   | 微应用入口，通过地址加载微应用                               |
| container  |   必选   | 微应用挂载节点，微应用加载完成后将挂载到该节点上（在主应用中定义） |
|   loader   |   可选   | loading 状态发生变化时会调用的方法                           |
|   props    |   可选   | 主应用需要传递给微应用的数据（应用通信）                     |

#### 创建微应用路由

在 `src/router/index.ts` 中，新增微应用路由出口，通过该出口，可以配合基座项目的主路由出口使用。

```ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/vue-app",
      name: "vueApp",
      component: () => import("../views/MicroAppView.vue"),
    },
  ],
});
```

新建 `MicroAppView.vue` 文件，写入 div 标签，配置微应用出口。

```vue [MicroAppView.vue]
<template>
  <!-- 通过路由加载当前页面，然后微应用将该div作为出口 -->
  <div id="micro-app-container"></div>
</template>
```



#### 启动主应用

在 `main.ts` 中，注册微应用，然后启动 qiankun。

```ts
import apps from './micro/apps.ts';
import { registerMicroApps, start } from 'qiankun';

// 注册微应用
registerMicroApps(apps, {
  beforeLoad: [
    async (app) => console.log(`主应用里，微应用 ${app.name} 第一次触发加载.`),
  ],
  beforeMount: [
    async (app) => console.log(`主应用里，微应用 ${app.name} 挂载触发之前.`),
  ],
  afterMount: [
    async (app) => console.log(`主应用里，微应用 ${app.name} 挂载触发之后.`),
  ],
  beforeUnmount: [
    async (app) => console.log(`主应用里，微应用 ${app.name} 卸载触发之前.`),
  ],
  afterUnmount: [
    async (app) => console.log(`主应用里，微应用 ${app.name} 卸载触发之后.`),
  ],
});

// 启动qiankun
start({
  // 预加载所有的微应用
  prefetch: "all",
  sandbox: {
    // 是否开启沙箱，开启之后微应用之间样式是隔离的
    experimentalStyleIsolation: true,
    // 是否开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 [shadow dom] 节点，从而确保微应用的样式不会对全局造成影响
    strictStyleIsolation: false,
  },
});
```

>关于 `start()` 的配置参数，可以 [查看文档](https://qiankun.umijs.org/zh/api#startopts)。



### 微应用配置

#### 创建微应用

由于 qiankun 框架和 Vite 集成的并不好，所以微应用需要使用 vite-plugin-qiankun 第三方插件来实现。

```shell
# 创建 vue3 的微应用，名称叫 micro-vue-app
pnpm create vite

# 安装 vite-plugin-qiankun 插件
pnpm i vite-plugin-qiankun
```

#### 导出生命周期钩子

在 `main.ts` 中，导出微应用的生命周期钩子。

```ts
import {
  qiankunWindow,
  renderWithQiankun,
  type QiankunProps,
} from "vite-plugin-qiankun/dist/helper.js";

let app: any = null;
// 如果不是 qiankun 模式下启动微应用，则按照正常模式渲染页面
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  app = createApp(App);
  app.use(router);
  app.mount("#app");
} else {
  renderWithQiankun({
    mount(props: QiankunProps) {
      const { container } = props;
      app = createApp(App);
      app.mount(container ? container.querySelector("#app") : "#app");
    },
    bootstrap() {
      console.log("微应用里，vueApp bootstrap.");
    },
    update(props: QiankunProps) {
      console.log("微应用里，vueApp update.");
    },
    unmount(props: QiankunProps) {
      console.log("微应用里，vueApp unmount.");
      app?.unmount();
      app = null;
    },
  });
}
```



#### 配置微应用信息

在 `vite.config.ts` 中，配置微应用的地址、URL 地址等信息。

```ts
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  base: "/vue-app", // 与主应用的 activeRule 一致
  server: {
    port: 9523,
    cors: true,
  },
  plugins: [
    vue(),
    qiankun("vue-app", {
      useDevMode: true, // 使用开发模式
    }),
  ],
});
```



### 应用通信

应用通信可以主应用的 `src/micro/apps.ts` 中，为微应用配置 `props` 属性进行数据传递。

```ts
const apps = [
  {
    name: "vue-app",
    activeRule: "/vue-app",
    entry: "http://localhost:9523",
    container: "#micro-app-container",
    props: {
      token: "123456",
      expiresTime: "20250408235959"
    }
  },
];

export default apps;
```

在微应用的 `mount(props)` 方法的 `props` 参数中，获取主应用传递的数据。

```ts
let app: any = null;
// 如果不是 qiankun 模式下启动微应用，则按照正常模式渲染页面
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  app = createApp(App);
  app.use(router);
  app.mount("#app");
} else {
  renderWithQiankun({
    mount(props: QiankunProps) {
      // 从props中，获取主应用传递的数据
      const { container, token, expiresTime } = props;
      app = createApp(App);
      app.mount(container ? container.querySelector("#app") : "#app");
    },
    bootstrap() {
      console.log("微应用里，vueApp bootstrap.");
    },
    update(props: QiankunProps) {
      console.log("微应用里，vueApp update.");
    },
    unmount(props: QiankunProps) {
      console.log("微应用里，vueApp unmount.");
      app?.unmount();
      app = null;
    },
  });
}
```