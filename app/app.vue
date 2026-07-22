<template>
  <!--
    app.vue 是应用根组件。
    NuxtLayout 负责套用 layouts/*，NuxtPage 负责渲染 pages/*。
    NuxtLoadingIndicator 提供顶部加载进度条。
  -->
  <NuxtLoadingIndicator color="#0f766e" :height="3" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
