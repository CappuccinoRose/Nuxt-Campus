<script setup lang="ts">
import type { Category } from '~~/shared/types'

const props = defineProps<{
  categories: Category[]
}>()

const model = defineModel<{
  q: string
  category: string
  sort: string
  minPrice: string
  maxPrice: string
}>({ required: true })

const sortOptions = [
  { value: 'newest', label: '最新发布' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'views', label: '浏览最多' },
]

function reset() {
  model.value = {
    q: '',
    category: '',
    sort: 'newest',
    minPrice: '',
    maxPrice: '',
  }
}
</script>

<template>
  <form class="filter" @submit.prevent>
    <div class="field">
      <label for="q">关键词</label>
      <input id="q" v-model="model.q" type="search" placeholder="搜标题 / 描述 / 标签">
    </div>

    <div class="field">
      <label for="category">分类</label>
      <select id="category" v-model="model.category">
        <option value="">全部分类</option>
        <option v-for="c in props.categories" :key="c.slug" :value="c.slug">
          {{ c.icon }} {{ c.name }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="sort">排序</label>
      <select id="sort" v-model="model.sort">
        <option v-for="s in sortOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
      </select>
    </div>

    <div class="field">
      <label for="minPrice">最低价</label>
      <input id="minPrice" v-model="model.minPrice" type="number" min="0" placeholder="0">
    </div>

    <div class="field">
      <label for="maxPrice">最高价</label>
      <input id="maxPrice" v-model="model.maxPrice" type="number" min="0" placeholder="不限">
    </div>

    <button type="button" class="btn btn--ghost" @click="reset">重置</button>
  </form>
</template>

<style scoped>
.filter {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 0.7fr 0.7fr auto;
  gap: 0.75rem;
  align-items: end;
  padding: 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 1.25rem;
}

.field {
  margin-bottom: 0;
}

@media (max-width: 960px) {
  .filter {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .filter {
    grid-template-columns: 1fr;
  }
}
</style>
