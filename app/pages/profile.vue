<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useSeoMeta({ title: '个人中心' })

const { user, logout } = useAuth()
const { count } = useFavorites()
const config = useRuntimeConfig()
const appConfig = useAppConfig()

function onLogout() {
  logout()
  navigateTo('/')
}
</script>

<template>
  <div class="container narrow">
    <h1>个人中心</h1>
    <p class="desc">受 auth 中间件保护，未登录会跳转到登录页并带回 redirect。</p>

    <div class="panel">
      <div class="row">
        <span>昵称</span>
        <strong>{{ user?.name }}</strong>
      </div>
      <div class="row">
        <span>学号</span>
        <strong>{{ user?.studentId }}</strong>
      </div>
      <div class="row">
        <span>校区</span>
        <strong>{{ user?.campus }}</strong>
      </div>
      <div class="row">
        <span>收藏数</span>
        <strong>{{ count }}</strong>
      </div>
    </div>

    <div class="panel">
      <h2>运行时配置演示</h2>
      <p>public.appName：{{ config.public.appName }}</p>
      <p>public.campusName：{{ config.public.campusName }}</p>
      <p>appConfig.theme.primary：{{ appConfig.theme.primary }}</p>
      <p class="muted">private.apiSecret 不会出现在客户端（请在服务端接口中查看）</p>
    </div>

    <div class="actions">
      <NuxtLink to="/products/create" class="btn">去发布</NuxtLink>
      <button type="button" class="btn btn--ghost" @click="onLogout">退出登录</button>
    </div>
  </div>
</template>

<style scoped>
.narrow {
  max-width: 640px;
}

h1 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
}

.desc {
  color: var(--color-muted);
  margin: 0 0 1.25rem;
}

.panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.1rem 1.25rem;
  margin-bottom: 1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 0.55rem 0;
  border-bottom: 1px dashed var(--color-border);
}

.row:last-child {
  border-bottom: none;
}

h2 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.panel p {
  margin: 0.35rem 0;
}

.muted {
  color: var(--color-muted);
  font-size: 0.88rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
}
</style>
