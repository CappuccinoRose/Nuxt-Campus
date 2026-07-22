<script setup lang="ts">
const { $site } = useNuxtApp()

useSeoMeta({
  title: '首页',
  description: `${$site.name} —— ${$site.campus} 校园二手市集`,
  ogTitle: `${$site.name} 校园二手市集`,
  ogDescription: '在校园里发现好物，让闲置重新流动。',
})

// useAsyncData：适合需要自定义请求逻辑的场景
// 并行请求，避免串行 await 拉长 SSR 时间
const [{ data: stats, pending, error, refresh }, { data: categories }] = await Promise.all([
  useAsyncData('home-stats', () => $fetch('/api/stats')),
  useFetch('/api/categories', { key: 'categories' }),
])
</script>

<template>
  <div class="container">
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow">{{ $site.campus }} · Nuxt学习项目</p>
        <h1>{{ $site.name }}</h1>
        <p class="lead">
          校园二手市集学习项目。在业务流里掌握 Nuxt 的路由、SSR、Server API、中间件与状态管理。
        </p>
        <div class="hero__cta">
          <NuxtLink to="/products" class="btn">逛市集</NuxtLink>
          <NuxtLink to="/products/create" class="btn btn--ghost">发布闲置</NuxtLink>
          <NuxtLink to="/knowledge" class="btn btn--ghost">查看知识点</NuxtLink>
        </div>
      </div>

      <div class="hero__panel">
        <div v-if="pending" class="skeleton">加载统计中…</div>
        <div v-else-if="error" class="error-box">
          <p>统计加载失败</p>
          <button type="button" class="btn btn--ghost" @click="refresh()">重试</button>
        </div>
        <template v-else>
          <div class="stats">
            <div>
              <strong>{{ stats?.data.totalProducts }}</strong>
              <span>在售闲置</span>
            </div>
            <div>
              <strong>{{ stats?.data.totalViews }}</strong>
              <span>累计浏览</span>
            </div>
            <div>
              <strong>¥{{ stats?.data.avgPrice }}</strong>
              <span>均价</span>
            </div>
          </div>
          <h2>热门闲置</h2>
          <ul class="hot">
            <li v-for="item in stats?.data.hot" :key="item.id">
              <NuxtLink :to="`/products/${item.id}`">
                {{ item.title }}
                <small>{{ item.views }} 浏览</small>
              </NuxtLink>
            </li>
          </ul>
        </template>
      </div>
    </section>

    <section class="section">
      <div class="section__head">
        <h2>按分类逛</h2>
        <AppAlert>动态路由示例：/categories/[slug]</AppAlert>
      </div>
      <CategoryGrid :categories="categories?.data || []" />
    </section>
  </div>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 1.5rem;
  align-items: stretch;
  margin-bottom: 2.5rem;
}

.hero__copy {
  padding: 1.5rem 0;
}

.eyebrow {
  color: var(--color-accent);
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0 0 0.5rem;
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.1;
  margin: 0 0 0.75rem;
}

.lead {
  color: var(--color-muted);
  font-size: 1.05rem;
  max-width: 36rem;
  margin: 0 0 1.25rem;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.hero__panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) + 4px);
  padding: 1.25rem;
  box-shadow: var(--shadow-md);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.stats strong {
  display: block;
  font-size: 1.4rem;
  color: var(--color-primary);
}

.stats span {
  color: var(--color-muted);
  font-size: 0.82rem;
}

.hero__panel h2,
.section__head h2 {
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
}

.hot {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.hot a {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  background: #f0fdfa;
  font-weight: 500;
}

.hot small {
  color: var(--color-muted);
  white-space: nowrap;
}

.section__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.skeleton,
.error-box {
  color: var(--color-muted);
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
