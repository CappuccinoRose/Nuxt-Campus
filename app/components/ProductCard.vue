<script setup lang="ts">
import type { Product } from '~~/shared/types'

defineProps<{
  product: Product
}>()

const { price, relativeTime, conditionLabel } = useFormat()
const { has, toggle } = useFavorites()
const { $toast } = useNuxtApp()

function onToggle(id: string, title: string) {
  const added = toggle(id)
  $toast.success(added ? `已收藏「${title}」` : `已取消收藏`)
}
</script>

<template>
  <article class="card">
    <NuxtLink :to="`/products/${product.id}`" class="card__media">
      <img :src="product.cover" :alt="product.title" loading="lazy">
      <span class="chip">{{ conditionLabel[product.condition] }}</span>
    </NuxtLink>

    <div class="card__body">
      <div class="card__top">
        <NuxtLink :to="`/products/${product.id}`" class="title">{{ product.title }}</NuxtLink>
        <button
          type="button"
          class="fav"
          :class="{ 'is-on': has(product.id) }"
          :aria-label="has(product.id) ? '取消收藏' : '收藏'"
          @click="onToggle(product.id, product.title)"
        >
          ♥
        </button>
      </div>
      <p class="price">{{ price(product.price) }}</p>
      <p class="meta">
        {{ product.seller }} · {{ relativeTime(product.createdAt) }} · {{ product.views }} 浏览
      </p>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #d1fae5;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.card:hover .card__media img {
  transform: scale(1.04);
}

.chip {
  position: absolute;
  left: 0.65rem;
  bottom: 0.65rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
}

.card__body {
  padding: 0.9rem 1rem 1.05rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.card__top {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.title {
  flex: 1;
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fav {
  border: none;
  background: transparent;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 1.15rem;
  line-height: 1;
  padding: 0;
}

.fav.is-on {
  color: var(--color-accent);
}

.price {
  margin: 0;
  color: var(--color-accent);
  font-size: 1.2rem;
  font-weight: 700;
}

.meta {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.82rem;
}
</style>
