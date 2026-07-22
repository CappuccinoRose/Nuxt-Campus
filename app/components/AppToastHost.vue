<script setup lang="ts">
const toasts = useState<Array<{ id: number, message: string, type: string }>>('toasts', () => [])
</script>

<template>
  <div class="toast-host" aria-live="polite">
    <div
      v-for="t in toasts"
      :key="t.id"
      class="toast"
      :class="[`toast--${t.type}`]"
    >
      {{ t.message }}
    </div>
  </div>
</template>
