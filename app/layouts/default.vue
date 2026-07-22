<template>
  <div class="shell">
    <AppHeader />
    <main class="shell__main">
      <slot />
    </main>
    <AppFooter />
    <AppToastHost />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shell__main {
  flex: 1;
  padding-block: 1.5rem 3rem;
}
</style>
