<script setup lang="ts">
/**
 * 动态路由：pages/products/[id].vue → /products/:id
 */
const route = useRoute()
const id = computed(() => String(route.params.id))

const { fetchOne, remove } = useProducts()
const { data, error, pending } = await fetchOne(id)

const { price, relativeTime, conditionLabel } = useFormat()
const { has, toggle } = useFavorites()
const { isLoggedIn } = useAuth()
const { $toast } = useNuxtApp()
const { data: categories } = await useFetch('/api/categories', { key: 'categories' })

const categoryName = computed(() => {
  const slug = data.value?.data.category
  return categories.value?.data.find((c) => c.slug === slug)?.name || slug
})

// 动态 SEO：根据商品信息设置标题
useSeoMeta({
  title: () => data.value?.data.title || '商品详情',
  description: () => data.value?.data.description?.slice(0, 120) || '',
  ogImage: () => data.value?.data.cover,
})

async function onDelete() {
  if (!isLoggedIn.value) {
    $toast.error('请先登录再执行删除（演示权限）')
    return navigateTo('/login?redirect=' + encodeURIComponent(route.fullPath))
  }
  if (!confirm('确认删除该商品？')) return
  try {
    await remove(id.value)
    $toast.success('已删除')
    navigateTo('/products')
  }
  catch (e: any) {
    $toast.error(e?.data?.statusMessage || '删除失败')
  }
}

function onFav() {
  if (!data.value?.data) return
  const added = toggle(data.value.data.id)
  $toast.success(added ? '已加入收藏' : '已取消收藏')
}

// 商品不存在时，展示 Nuxt 错误页
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || '商品不存在',
    fatal: true,
  })
}
</script>

<template>
  <div class="container">
    <div v-if="pending" class="state">加载中…</div>
    <template v-else-if="data?.data">
      <nav class="crumb">
        <NuxtLink to="/products">市集</NuxtLink>
        <span>/</span>
        <NuxtLink :to="`/categories/${data.data.category}`">{{ categoryName }}</NuxtLink>
        <span>/</span>
        <span>{{ data.data.title }}</span>
      </nav>

      <article class="detail">
        <div class="detail__media">
          <img :src="data.data.cover" :alt="data.data.title">
        </div>
        <div class="detail__body">
          <h1>{{ data.data.title }}</h1>
          <p class="price">{{ price(data.data.price) }}</p>
          <ul class="meta">
            <li>成色：{{ conditionLabel[data.data.condition] }}</li>
            <li>卖家：{{ data.data.seller }}</li>
            <li>校区：{{ data.data.campus }}</li>
            <li>浏览：{{ data.data.views }}</li>
            <li>发布：{{ relativeTime(data.data.createdAt) }}</li>
          </ul>
          <p class="desc">{{ data.data.description }}</p>
          <div class="tags">
            <span v-for="tag in data.data.tags" :key="tag">#{{ tag }}</span>
          </div>
          <div class="actions">
            <button type="button" class="btn" @click="onFav">
              {{ has(data.data.id) ? '取消收藏' : '收藏' }}
            </button>
            <button type="button" class="btn btn--danger" @click="onDelete">删除商品</button>
            <NuxtLink to="/products" class="btn btn--ghost">返回列表</NuxtLink>
          </div>
          <AppAlert type="warn">删除接口演示权限：需登录后操作</AppAlert>
        </div>
      </article>
    </template>
  </div>
</template>

<style scoped>
.crumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  color: var(--color-muted);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.crumb a {
  color: var(--color-primary);
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) + 2px);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.detail__media img {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
}

.detail__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.8rem;
  line-height: 1.25;
}

.price {
  margin: 0;
  color: var(--color-accent);
  font-size: 1.8rem;
  font-weight: 700;
}

.meta {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.25rem;
  color: var(--color-muted);
  font-size: 0.92rem;
}

.desc {
  margin: 0;
  white-space: pre-wrap;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tags span {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: #ecfdf5;
  color: var(--color-primary);
  font-size: 0.82rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.state {
  padding: 3rem;
  text-align: center;
  color: var(--color-muted);
}

@media (max-width: 800px) {
  .detail {
    grid-template-columns: 1fr;
  }
}
</style>
