<script setup lang="ts">
import type { Category } from '~~/shared/types'

defineProps<{
  categories: Category[]
}>()
</script>

<template>
  <div class="cats">
    <NuxtLink
      v-for="c in categories"
      :key="c.slug"
      :to="`/categories/${c.slug}`"
      class="cat"
    >
      <span class="cat__icon">{{ c.icon }}</span>
      <span>
        <strong>{{ c.name }}</strong>
        <small>{{ c.description }}</small>
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.cats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.85rem;
}

.cat {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  padding: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color 0.2s, transform 0.2s;
}

.cat:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.cat__icon {
  font-size: 1.6rem;
}

.cat strong {
  display: block;
  line-height: 1.2;
}

.cat small {
  color: var(--color-muted);
  font-size: 0.8rem;
}
</style>
