<script setup lang="ts">
/**
 * 关于页：routeRules 中配置了 prerender: true
 */
useSeoMeta({
  title: '关于项目',
  description: 'Nuxt学习项目介绍与方案选型说明',
})

useHead({
  meta: [
    { name: 'keywords', content: 'Nuxt,SSR,Nitro,校园二手,学习项目' },
  ],
})
</script>

<template>
  <div class="container narrow">
    <h1>关于 Nuxt学习项目</h1>
    <p class="lead">
      这是一个面向 Nuxt 学习者的校园二手市集项目，目标是在完整业务链路中覆盖框架核心能力。
    </p>

    <section>
      <h2>方案对比（最终选定本项目）</h2>
      <ol>
        <li><strong>DevBlog 技术博客</strong>：偏内容与 SEO，但对表单/权限/CRUD 覆盖较弱。</li>
        <li><strong>RecipeBook 菜谱社区</strong>：交互丰富，但服务端状态与权限场景偏弱。</li>
        <li><strong>MovieBox 影讯站</strong>：适合外部 API / SSR，但缺少本地写操作闭环。</li>
        <li><strong>SkillTrack 学习看板</strong>：状态管理强，但路由与 SEO 场景不够完整。</li>
        <li>
          <strong>校园二手市集（选定）</strong>：同时覆盖列表/详情/发布/登录/收藏/
          Server API / 中间件 / 多布局 / SEO / 路由规则，最适合系统学习。
        </li>
      </ol>
    </section>

    <section>
      <h2>本页知识点</h2>
      <ul>
        <li><code>useSeoMeta</code> / <code>useHead</code> 设置页面元信息</li>
        <li><code>routeRules['/about'] = { prerender: true }</code> 构建时预渲染</li>
      </ul>
    </section>

    <NuxtLink to="/knowledge" class="btn">查看完整知识点清单</NuxtLink>
  </div>
</template>

<style scoped>
.narrow {
  max-width: 760px;
}

h1 {
  font-family: var(--font-display);
  margin: 0 0 0.5rem;
}

.lead {
  color: var(--color-muted);
  font-size: 1.05rem;
}

section {
  margin: 1.5rem 0;
}

h2 {
  margin: 0 0 0.75rem;
  font-size: 1.15rem;
}

ol,
ul {
  padding-left: 1.2rem;
  line-height: 1.7;
}

code {
  background: #ecfdf5;
  padding: 0.1rem 0.35rem;
  border-radius: 6px;
  font-size: 0.88em;
}
</style>
