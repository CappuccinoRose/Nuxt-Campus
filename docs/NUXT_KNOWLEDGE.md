# Nuxt学习项目 · 知识点详解

本文与源码一一对应，建议开着项目边看边改。

站点名：**Nuxt学习项目** · 校区：**匿名大学**

---

## 1. 应用入口与配置

### 1.1 `app.vue`
- 根组件只负责壳子：`NuxtLoadingIndicator` + `NuxtLayout` + `NuxtPage`
- **不要**在普通页面里再包一层 `NuxtLayout`（旧模板常见误用）

### 1.2 `nuxt.config.ts`
| 配置项 | 作用 |
|---|---|
| `css` | 全局样式入口 |
| `runtimeConfig` | 运行时配置；`public` 双端可读，顶层字段仅服务端 |
| `app.head` | 默认 HTML head |
| `app.pageTransition` | 页面切换动画 |
| `routeRules` | 按路由配置 SSR / SWR / CSR / prerender |
| `experimental.typedPages` | 路由类型提示 |

### 1.3 `app.config.ts`
- 适合主题色、功能开关等**非敏感**配置
- 组件内：`const appConfig = useAppConfig()`
- 与 `runtimeConfig` 区别：后者可从环境变量注入，可含密钥

---

## 2. 文件路由（Pages）

Nuxt 根据 `app/pages` 目录生成路由：

```text
pages/index.vue                 → /
pages/products/index.vue        → /products
pages/products/[id].vue         → /products/:id
pages/products/create.vue       → /products/create
pages/categories/[slug].vue     → /categories/:slug
pages/login.vue                 → /login
```

### 常用 API
- `useRoute()`：读 `params` / `query`
- `useRouter()` / `navigateTo()`：跳转
- `definePageMeta({ layout, middleware })`：页面元信息

### 动态 SEO 示例
商品详情页根据数据设置：

```ts
useSeoMeta({
  title: () => data.value?.data.title || '商品详情',
  ogImage: () => data.value?.data.cover,
})
```

---

## 3. 布局（Layouts）

| 布局 | 用途 |
|---|---|
| `default` | 带顶栏底栏的主布局 |
| `auth` | 登录页居中卡片 |
| `blank` | 极简壳（可扩展） |

页面启用：

```ts
definePageMeta({ layout: 'auth' })
```

未指定时使用 `default`。

---

## 4. 组件自动导入

`app/components` 下的组件无需 `import`：

- `AppHeader` / `AppFooter` / `AppToastHost`
- `ProductCard` / `ProductFilter` / `CategoryGrid`
- `AppAlert`

命名约定：目录名会成为前缀（本项目多为扁平结构）。

---

## 5. 数据获取

### 5.1 `useFetch`
- 在 setup 中调用，SSR 时服务端请求，结果脱水到客户端，避免重复请求
- 支持 `query`、`key`、`watch`

市集页示例：筛选条件变化 → 自动重新请求。

### 5.2 `useAsyncData`
- 更底层，适合自定义请求组合
- 首页统计使用：`useAsyncData('home-stats', () => $fetch('/api/stats'))`

### 5.3 `$fetch`
- 命令式，适合点击事件（登录、发布、删除）
- **不要**在 setup 顶层直接 `$fetch` 代替 `useFetch`（会丢 SSR 优势，且可能重复请求）

### 5.4 错误处理
```ts
throw createError({ statusCode: 404, statusMessage: '商品不存在', fatal: true })
```
会进入 `app/error.vue`。

---

## 6. Composables

`app/composables` 自动导入：

| 函数 | 职责 |
|---|---|
| `useAuth` | 登录态：`useCookie` + `useState` |
| `useFavorites` | 收藏：`useCookie` |
| `useProducts` | 封装商品请求 |
| `useFormat` | 价格 / 相对时间 / 成色文案 |

### `useState` vs `useCookie`
- `useState`：同一次应用生命周期内共享，SSR 可脱水
- `useCookie`：写入浏览器 Cookie，刷新后仍在

---

## 7. 中间件（Middleware）

| 文件 | 类型 | 行为 |
|---|---|---|
| `logging.global.ts` | 全局 | 每次路由切换打印日志 |
| `auth.ts` | 命名 | 未登录 → `/login?redirect=...` |
| `guest.ts` | 命名 | 已登录访问登录页 → 重定向走 |

启用命名中间件：

```ts
definePageMeta({ middleware: 'auth' })
```

---

## 8. 插件（Plugins）

| 文件 | 范围 | 作用 |
|---|---|---|
| `site.ts` | 双端 | `provide.site` 站点名 / 校区 |
| `toast.client.ts` | 仅客户端 | `$toast.success()` 等 |

使用：

```ts
const { $site, $toast } = useNuxtApp()
```

后缀约定：
- `.client.ts`：仅浏览器
- `.server.ts`：仅服务端

---

## 9. Nitro Server API

路径映射：

```text
server/api/products/index.get.ts  → GET  /api/products
server/api/products/index.post.ts → POST /api/products
server/api/products/[id].get.ts   → GET  /api/products/:id
server/api/auth/login.post.ts     → POST /api/auth/login
```

常用工具（自动可用）：
- `defineEventHandler`
- `getQuery` / `readBody` / `getRouterParam`
- `createError` / `setResponseStatus`
- `useRuntimeConfig(event)`（服务端读私有配置）

`server/utils/*` 也会自动导入（如 `listProducts`、`filterProducts`）。

---

## 10. 渲染策略（routeRules）

本项目在 `nuxt.config.ts` 中演示混合渲染：

| 路由 | 策略 | 含义 |
|---|---|---|
| `/` | `ssr: true` | 标准服务端渲染 |
| `/products` | `ssr: true` | 标准服务端渲染 |
| `/about`、`/knowledge` | `prerender: true` | 构建时预渲染成静态 |
| `/products/create` | `ssr: false` | 纯客户端渲染 |

学习建议：用 Nuxt DevTools 的 Payload / Timeline 观察差异。

---

## 11. SEO 与 Head

- `useSeoMeta`：类型友好的常用 meta
- `useHead`：完整 head 管理（脚本、link、复杂 meta）
- `titleTemplate: '%s · Nuxt学习项目'`：统一标题后缀

---

## 12. 体验相关

- `NuxtLoadingIndicator`：顶部进度条
- `error.vue` + `clearError({ redirect: '/' })`：错误恢复
- 为加快首屏：已去掉外链字体/图片与页面过渡动画

---

## 13. 建议动手练习

1. 在 `store.ts` 增加一个商品字段（如 `negotiable`），打通 API → 列表 → 详情  
2. 给删除接口加「仅卖家本人可删」的服务端校验（用请求头模拟 token）  
3. 把收藏从 Cookie 改为 `useState` + `localStorage` 插件，对比差异  
4. 为 `/products` 增加分页（改 API + 列表 UI）  
5. 新增一个 `layouts/admin.vue`，做一个简单管理页  

---

## 14. 官方文档速查

- [Nuxt 文档](https://nuxt.com/docs/getting-started/introduction)
- [数据获取](https://nuxt.com/docs/getting-started/data-fetching)
- [路由中间件](https://nuxt.com/docs/guide/directory-structure/middleware)
- [Server 目录](https://nuxt.com/docs/guide/directory-structure/server)
- [渲染模式 / routeRules](https://nuxt.com/docs/guide/concepts/rendering)
