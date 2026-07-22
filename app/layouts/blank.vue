<template>
  <!-- 极简布局：用于错误页或特殊落地页 -->
  <div class="blank">
    <slot />
  </div>
</template>

<style scoped>
.blank {
  min-height: 100vh;
}
</style>
