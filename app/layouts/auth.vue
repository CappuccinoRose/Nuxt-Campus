<template>
  <!-- 登录页专用布局：居中卡片，无主导航干扰 -->
  <div class="auth-layout">
    <div class="auth-layout__card">
      <slot />
    </div>
    <AppToastHost />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background:
    linear-gradient(145deg, rgba(15, 118, 110, 0.12), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(234, 88, 12, 0.12), transparent 40%),
    var(--color-bg);
}

.auth-layout__card {
  width: min(100%, 420px);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: calc(var(--radius) + 4px);
  padding: 2rem 1.75rem;
  box-shadow: var(--shadow-md);
}
</style>
