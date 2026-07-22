<script setup lang="ts">
const { $site } = useNuxtApp()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p>
        <strong>{{ $site.name }}</strong>
        · {{ $site.campus }} · {{ year }}
      </p>
      <p class="muted">Nuxt学习项目 · 覆盖路由、SSR、Server API、中间件、状态管理等核心知识点</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.65);
  padding: 1.25rem 0;
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.92rem;
}

.muted {
  color: var(--color-muted);
  margin: 0;
}

p {
  margin: 0;
}
</style>
