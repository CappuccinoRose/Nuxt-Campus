<script setup lang="ts">
/**
 * 自定义错误页
 * Nuxt 在抛出 createError / 找不到页面时会渲染此组件
 */
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleClear = () => clearError({ redirect: '/' })

useSeoMeta({
  title: `错误 ${props.error.statusCode || ''}`,
})
</script>

<template>
  <div class="error-page">
    <div class="panel">
      <p class="code">{{ error.statusCode || 500 }}</p>
      <h1>{{ error.statusMessage || '出错了' }}</h1>
      <p class="msg">{{ error.message }}</p>
      <div class="actions">
        <button type="button" class="btn" @click="handleClear">回到首页</button>
        <NuxtLink to="/products" class="btn btn--ghost">去市集</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background:
    radial-gradient(circle at 20% 20%, rgba(15, 118, 110, 0.15), transparent 40%),
    var(--color-bg);
}

.panel {
  width: min(100%, 480px);
  text-align: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) + 4px);
  padding: 2rem 1.5rem;
  box-shadow: var(--shadow-md);
}

.code {
  margin: 0;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

h1 {
  margin: 0.5rem 0;
  font-family: var(--font-display);
}

.msg {
  color: var(--color-muted);
  margin: 0 0 1.25rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
