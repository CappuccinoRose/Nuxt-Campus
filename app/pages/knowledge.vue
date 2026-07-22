<script setup lang="ts">
useSeoMeta({
  title: 'Nuxt 知识点',
  description: 'Nuxt学习项目覆盖的知识点清单',
})

const groups = [
  {
    title: '项目结构与配置',
    items: [
      { name: 'nuxt.config.ts', where: '根目录', tip: 'devtools、css、runtimeConfig、app.head、routeRules、experimental.typedPages' },
      { name: 'app.config.ts', where: 'app/', tip: '主题色与功能开关，useAppConfig() 读取' },
      { name: 'app.vue', where: 'app/', tip: '根组件：NuxtLayout + NuxtPage + NuxtLoadingIndicator' },
      { name: 'runtimeConfig', where: 'nuxt.config', tip: 'public 可读；private 仅服务端（login 接口有演示）' },
      { name: 'routeRules', where: 'nuxt.config', tip: '首页 SSR、about/knowledge 预渲染、create CSR' },
    ],
  },
  {
    title: '路由与页面',
    items: [
      { name: '文件路由', where: 'app/pages', tip: '目录结构自动生成路由' },
      { name: '动态路由', where: 'products/[id]、categories/[slug]', tip: 'route.params 读取参数' },
      { name: '嵌套目录', where: 'pages/products/*', tip: '形成 /products、/products/:id、/products/create' },
      { name: 'definePageMeta', where: 'login / create / profile', tip: '指定 layout、middleware' },
      { name: '页面过渡', where: 'nuxt.config + CSS', tip: 'pageTransition / layoutTransition' },
      { name: 'navigateTo', where: '多处', tip: '中间件跳转、登录后重定向、删除后返回' },
    ],
  },
  {
    title: '布局与组件',
    items: [
      { name: 'layouts', where: 'default / auth / blank', tip: '多布局切换' },
      { name: '组件自动导入', where: 'app/components', tip: '无需手动 import ProductCard 等' },
      { name: '插槽 slot', where: 'layouts + AppAlert', tip: '布局插槽与内容插槽' },
    ],
  },
  {
    title: '数据获取',
    items: [
      { name: 'useFetch', where: '列表 / 分类 / 详情', tip: 'SSR 友好，自动脱水' },
      { name: 'useAsyncData', where: '首页 stats', tip: '自定义异步逻辑封装' },
      { name: '$fetch', where: '登录 / 发布 / composable', tip: '命令式请求，适合事件回调' },
      { name: 'watch query', where: 'products/index', tip: '筛选变化自动重新请求' },
      { name: 'refresh()', where: '首页 / 收藏', tip: '手动刷新数据' },
    ],
  },
  {
    title: '状态与组合式函数',
    items: [
      { name: 'composables 自动导入', where: 'app/composables', tip: 'useAuth / useFavorites / useProducts / useFormat' },
      { name: 'useState', where: 'useAuth / toast', tip: '跨组件 SSR 友好状态' },
      { name: 'useCookie', where: '登录态 / 收藏', tip: '持久化到浏览器 Cookie' },
      { name: 'useRoute / useRouter', where: '筛选同步 URL', tip: '路由状态与筛选联动' },
    ],
  },
  {
    title: '中间件与插件',
    items: [
      { name: '全局中间件', where: 'logging.global.ts', tip: '每次导航打印日志' },
      { name: '命名中间件 auth', where: 'create / profile', tip: '未登录跳转登录页' },
      { name: '命名中间件 guest', where: 'login', tip: '已登录不可再进登录页' },
      { name: '插件 site.ts', where: 'app/plugins', tip: 'provide 站点信息（双端）' },
      { name: '插件 toast.client.ts', where: 'app/plugins', tip: '仅客户端插件（.client）' },
    ],
  },
  {
    title: 'Nitro Server',
    items: [
      { name: 'server/api/*', where: 'server/', tip: '文件系统 API 路由' },
      { name: 'HTTP 方法后缀', where: '*.get.ts / *.post.ts / *.delete.ts', tip: '按方法拆分处理函数' },
      { name: '动态 API', where: 'products/[id].get.ts', tip: 'getRouterParam 取参' },
      { name: 'createError', where: '多个 API', tip: '统一错误响应' },
      { name: 'server/utils', where: 'store / filter', tip: '服务端工具自动导入' },
      { name: 'readBody / getQuery', where: 'API handlers', tip: '读请求体与查询参数' },
    ],
  },
  {
    title: 'SEO 与体验',
    items: [
      { name: 'useSeoMeta', where: '各页面', tip: 'title / description / og*' },
      { name: 'useHead', where: 'about', tip: '更底层的 head 管理' },
      { name: 'error.vue', where: 'app/', tip: '自定义错误页' },
      { name: 'NuxtLoadingIndicator', where: 'app.vue', tip: '顶部加载条' },
      { name: 'SSR / CSR / prerender', where: 'routeRules', tip: '同一项目混合渲染策略' },
    ],
  },
]
</script>

<template>
  <div class="container">
    <header class="page-head">
      <h1>Nuxt 知识点地图</h1>
      <p>按模块对照源码学习。建议边改边看 Network / Nuxt DevTools。</p>
    </header>

    <div class="groups">
      <section v-for="g in groups" :key="g.title" class="group">
        <h2>{{ g.title }}</h2>
        <div class="table">
          <div v-for="item in g.items" :key="item.name" class="row">
            <strong>{{ item.name }}</strong>
            <code>{{ item.where }}</code>
            <span>{{ item.tip }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-head {
  margin-bottom: 1.5rem;
}

h1 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 2rem;
}

.page-head p {
  margin: 0;
  color: var(--color-muted);
}

.groups {
  display: grid;
  gap: 1rem;
}

.group {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1rem 1.15rem;
}

h2 {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  color: var(--color-primary);
}

.row {
  display: grid;
  grid-template-columns: 180px 220px 1fr;
  gap: 0.75rem;
  padding: 0.55rem 0;
  border-top: 1px dashed var(--color-border);
  align-items: start;
}

.row:first-child {
  border-top: none;
}

code {
  background: #ecfdf5;
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: var(--color-primary-dark);
  word-break: break-all;
}

.row span {
  color: var(--color-muted);
  font-size: 0.92rem;
}

@media (max-width: 800px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
</style>
