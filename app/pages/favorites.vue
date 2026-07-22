<script setup lang="ts">
useSeoMeta({
  title: '我的收藏',
  description: '基于 useCookie 持久化的收藏列表',
})

const { ids, count, clear } = useFavorites()
const { $toast } = useNuxtApp()

// 根据收藏 id 拉取商品列表，再在客户端过滤
const { data, pending, refresh } = await useFetch('/api/products', {
  key: 'favorites-source',
})

const favorites = computed(() =>
  (data.value?.data || []).filter((p) => ids.value.includes(p.id)),
)

function onClear() {
  clear()
  $toast.success('已清空收藏')
}
</script>

<template>
  <div class="container">
    <header class="page-head">
      <div>
        <h1>我的收藏</h1>
        <p>共 {{ count }} 件 · 数据保存在 Cookie（useCookie）</p>
      </div>
      <div class="actions">
        <button type="button" class="btn btn--ghost" @click="refresh()">刷新</button>
        <button type="button" class="btn btn--danger" :disabled="!count" @click="onClear">
          清空
        </button>
      </div>
    </header>

    <div v-if="pending" class="state">加载中…</div>
    <div v-else-if="!favorites.length" class="state">
      还没有收藏，去
      <NuxtLink to="/products">市集</NuxtLink>
      逛逛吧
    </div>
    <div v-else class="grid">
      <ProductCard v-for="p in favorites" :key="p.id" :product="p" />
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
}

.page-head p {
  margin: 0;
  color: var(--color-muted);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.state {
  padding: 2.5rem;
  text-align: center;
  color: var(--color-muted);
}

.state a {
  color: var(--color-primary);
  font-weight: 600;
}
</style>
