<template>
  <span class="alert" :class="`alert--${type}`">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ type?: 'info' | 'success' | 'warn' }>(), {
  type: 'info',
})
</script>

<style scoped>
.alert {
  display: inline-flex;
  padding: 0.45rem 0.75rem;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 500;
}

.alert--info {
  background: #ecfdf5;
  color: var(--color-primary);
}

.alert--success {
  background: #d1fae5;
  color: var(--color-success);
}

.alert--warn {
  background: #ffedd5;
  color: #c2410c;
}
</style>
