# Nuxt学习项目 · 匿名大学校园二手市集

面向 Nuxt 学习者的完整前端项目。通过「校园二手市集」业务，把路由、SSR、Server API、中间件、状态、SEO 等核心能力串成一条可运行链路。

> 当前技术栈：Nuxt `^4.5` + Vue 3 + Nitro（内置）+ TypeScript  
> 站点名：**Nuxt学习项目** · 校区：**匿名大学**

---

## 一、五个方案对比与最终选型

| # | 方案 | 优点 | 不足 | 结论 |
|---|---|---|---|---|
| 1 | **DevBlog 技术博客** | SEO、内容页、动态路由清晰 | CRUD / 权限 / 表单闭环弱 | 备选 |
| 2 | **RecipeBook 菜谱社区** | 筛选交互多、组件复用强 | 服务端写操作与鉴权场景弱 | 备选 |
| 3 | **MovieBox 影讯站** | 外部 API、SSR 很典型 | 缺少本地发布与权限闭环 | 备选 |
| 4 | **SkillTrack 学习看板** | 状态管理练手友好 | 路由层级与 SEO 场景偏少 | 备选 |
| 5 | **校园二手市集** | 列表/详情/发布/登录/收藏/API/中间件/多布局/SEO/混合渲染一次覆盖 | 业务略复杂 | **选定** |

---

## 二、项目能做什么

1. **首页**：统计数据、热门商品、分类入口  
2. **市集列表**：关键词 / 分类 / 价格 / 排序，URL query 同步  
3. **商品详情**：动态路由、动态 SEO、收藏、删除  
4. **发布闲置**：登录保护 + CSR 页面 + POST API  
5. **分类页**：`/categories/:slug`  
6. **收藏夹**：`useCookie` 持久化  
7. **登录 / 个人中心**：中间件鉴权、Cookie 登录态  
8. **知识点页**：对照源码的 Nuxt 知识地图  
9. **错误页**：`error.vue` 统一处理 404/业务错误  

演示账号：学号 `20260001`，昵称任意（≥2 字），登录页已预填。

---

## 三、快速开始

```bash
npm install
npm run dev
```

浏览器打开：http://localhost:3000

---

## 四、性能说明（已优化）

- 去掉 Google Fonts 外链，改用系统字体  
- 商品封面改为本地 SVG，不再请求 Unsplash  
- 首页 `stats` / `categories` 并行请求  
- 关闭开发期 DevTools 与页面过渡动画，减少首屏等待  

更细的知识点说明见：[docs/NUXT_KNOWLEDGE.md](./docs/NUXT_KNOWLEDGE.md)

---

## 五、建议学习路径

1. 打开 `/knowledge` 建立知识地图  
2. 看 `nuxt.config.ts` 的 `runtimeConfig` / `routeRules`  
3. 从首页到市集，观察 `useAsyncData` / `useFetch`  
4. 进入商品详情，对照动态路由与 Server API  
5. 未登录点「发布闲置」，体会 `middleware/auth`  
6. 登录后发布 / 收藏，观察 Cookie 状态  

---

## 六、API 一览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/products` | 列表 |
| POST | `/api/products` | 发布 |
| GET | `/api/products/:id` | 详情 |
| DELETE | `/api/products/:id` | 删除 |
| GET | `/api/categories` | 分类 |
| GET | `/api/stats` | 统计 |
| POST | `/api/auth/login` | 登录 |

数据保存在服务端内存中，重启 dev server 会重置；收藏与登录态在浏览器 Cookie 中。
