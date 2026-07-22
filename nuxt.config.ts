// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // 开发期关闭 DevTools，减少首屏编译与运行时开销
  devtools: { enabled: false },

  // 全局 CSS
  css: ['~/assets/css/main.css'],

  // 运行时配置：区分 public（客户端可读）与 private（仅服务端）
  runtimeConfig: {
    // 仅服务端可读（例如真实项目中的数据库密钥）
    apiSecret: 'campus-mart-secret',
    public: {
      // 客户端与服务端都能访问
      appName: 'Nuxt学习项目',
      campusName: '匿名大学',
      apiBase: '/api',
    },
  },

  // 应用级元信息默认值
  app: {
    head: {
      titleTemplate: '%s · Nuxt学习项目',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { name: 'description', content: 'Nuxt学习项目 · 匿名大学校园二手市集' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      // 不再外链 Google Fonts，避免国内网络拖慢首屏
    },
  },

  // 路由规则：演示 SSR / 预渲染等不同渲染策略（去掉 SWR，避免开发态额外等待）
  routeRules: {
    '/': { ssr: true },
    '/products': { ssr: true },
    // 关于页 / 知识点：构建时预渲染（适合静态内容）
    '/about': { prerender: true },
    '/knowledge': { prerender: true },
    // 发布页：仅客户端渲染（依赖登录态交互更重）
    '/products/create': { ssr: false },
  },

  // 实验特性：便于学习 typedPages
  experimental: {
    typedPages: true,
  },
})
