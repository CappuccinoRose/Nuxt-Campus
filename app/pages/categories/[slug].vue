<script setup lang="ts">
/**
 * 动态路由：/categories/:slug
 */
const route = useRoute()
const slug = computed(() => String(route.params.slug))

const { data: categories } = await useFetch('/api/categories', { key: 'categories' })
const category = computed(() => categories.value?.data.find((c) => c.slug === slug.value))

if (!category.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '分类不存在',
    fatal: true,
  })
}

useSeoMeta({
  title: () => category.value?.name || '分类',
  description: () => category.value?.description,
})

const { data, pending } = await useFetch('/api/products', {
  query: computed(() => ({ category: slug.value, sort: 'newest' })),
  key: `category-${slug.value}`,
})
</script>

<template>
  <div class="container">
    <header class="page-head">
      <p class="eyebrow">分类专区</p>
      <h1>{{ category?.icon }} {{ category?.name }}</h1>
      <p>{{ category?.description }}</p>
    </header>

    <div v-if="pending" class="state">加载中…</div>
    <div v-else-if="!data?.data?.length" class="state">该分类暂无商品</div>
    <div v-else class="grid">
      <ProductCard v-for="p in data.data" :key="p.id" :product="p" />
    </div>
  </div>
</template>

<style scoped>
.page-head {
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0;
  color: var(--color-accent);
  font-weight: 600;
}

h1 {
  margin: 0.25rem 0;
  font-family: var(--font-display);
  font-size: 2rem;
}

.page-head p:last-child {
  margin: 0;
  color: var(--color-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.state {
  padding: 2rem;
  text-align: center;
  color: var(--color-muted);
}
</style>
