<script setup lang="ts">
const route = useRoute()
const { $site } = useNuxtApp()
const { user, isLoggedIn, logout } = useAuth()
const { count } = useFavorites()

const links = [
  { to: '/', label: '首页' },
  { to: '/products', label: '市集' },
  { to: '/favorites', label: '收藏' },
  { to: '/knowledge', label: '知识点' },
  { to: '/about', label: '关于' },
]

function isActive(path: string) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function onLogout() {
  logout()
  navigateTo('/')
}
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="brand">
        <span class="brand__mark">CM</span>
        <span>
          <strong>{{ $site.name }}</strong>
          <small>{{ $site.campus }}</small>
        </span>
      </NuxtLink>

      <nav class="nav" aria-label="主导航">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          :class="{ 'is-active': isActive(link.to) }"
        >
          {{ link.label }}
          <span v-if="link.to === '/favorites' && count" class="badge">{{ count }}</span>
        </NuxtLink>
      </nav>

      <div class="header__actions">
        <NuxtLink to="/products/create" class="btn btn--accent">发布闲置</NuxtLink>
        <template v-if="isLoggedIn">
          <NuxtLink to="/profile" class="user">{{ user?.name }}</NuxtLink>
          <button type="button" class="btn btn--ghost" @click="onLogout">退出</button>
        </template>
        <NuxtLink v-else to="/login" class="btn btn--ghost">登录</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: rgba(244, 250, 248, 0.88);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 0.85rem;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 160px;
}

.brand__mark {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
}

.brand strong {
  display: block;
  font-size: 1.05rem;
  line-height: 1.2;
}

.brand small {
  color: var(--color-muted);
  font-size: 0.75rem;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  flex: 1;
}

.nav__link {
  position: relative;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  color: var(--color-muted);
  font-weight: 500;
}

.nav__link:hover,
.nav__link.is-active {
  color: var(--color-primary);
  background: rgba(15, 118, 110, 0.08);
}

.badge {
  display: inline-grid;
  place-items: center;
  min-width: 1.15rem;
  height: 1.15rem;
  margin-left: 0.2rem;
  padding-inline: 0.25rem;
  border-radius: 999px;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.7rem;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user {
  font-weight: 600;
  color: var(--color-primary);
}

@media (max-width: 800px) {
  .header__actions .btn--accent {
    display: none;
  }
}
</style>
