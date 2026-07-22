<script setup lang="ts">
useSeoMeta({
  title: '市集',
  description: '浏览校园闲置商品，支持搜索与筛选',
})

const route = useRoute()
const router = useRouter()

const { data: categories } = await useFetch('/api/categories', { key: 'categories' })

// 筛选状态与 URL query 同步 —— 演示 useRoute + navigateTo 组合
const filter = reactive({
  q: String(route.query.q || ''),
  category: String(route.query.category || ''),
  sort: String(route.query.sort || 'newest'),
  minPrice: String(route.query.minPrice || ''),
  maxPrice: String(route.query.maxPrice || ''),
})

const queryParams = computed(() => ({
  q: filter.q || undefined,
  category: filter.category || undefined,
  sort: filter.sort || 'newest',
  minPrice: filter.minPrice || undefined,
  maxPrice: filter.maxPrice || undefined,
}))

// watch 筛选变化 → 更新 URL，并触发重新请求
watch(
  filter,
  () => {
    router.replace({ query: queryParams.value })
  },
  { deep: true },
)

const { data, pending, error, refresh } = await useFetch('/api/products', {
  query: queryParams,
  // 关键监听 query，自动重新请求
  watch: [queryParams],
  key: 'products-list',
})
</script>

<template>
  <div class="container">
    <header class="page-head">
      <div>
        <h1>校园市集</h1>
        <p>共 {{ data?.total ?? 0 }} 件闲置 · 本页演示 useFetch + 响应式 query</p>
      </div>
      <NuxtLink to="/products/create" class="btn">发布闲置</NuxtLink>
    </header>

    <ProductFilter v-model="filter" :categories="categories?.data || []" />

    <div v-if="pending" class="state">加载中…</div>
    <div v-else-if="error" class="state">
      加载失败
      <button type="button" class="btn btn--ghost" @click="refresh()">重试</button>
    </div>
    <div v-else-if="!data?.data?.length" class="state">没有符合条件的商品，试试放宽筛选。</div>
    <div v-else class="grid">
      <ProductCard v-for="p in data.data" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<style scoped>
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

h1 {
  margin: 0 0 0.25rem;
  font-family: var(--font-display);
  font-size: 2rem;
}

.page-head p {
  margin: 0;
  color: var(--color-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.state {
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--color-muted);
  display: grid;
  gap: 0.75rem;
  justify-items: center;
}
</style>
