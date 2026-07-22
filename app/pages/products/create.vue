<script setup lang="ts">
/**
 * 发布页：
 * - definePageMeta 指定 layout / middleware / ssr 相关行为
 * - routeRules 中此路径配置为 ssr: false（CSR）
 */
definePageMeta({
  middleware: 'auth',
  title: '发布闲置',
})

useSeoMeta({
  title: '发布闲置',
  description: '发布校园闲置商品',
})

const { user } = useAuth()
const { create } = useProducts()
const { $toast } = useNuxtApp()
const config = useRuntimeConfig()
const appConfig = useAppConfig()

const { data: categories } = await useFetch('/api/categories', { key: 'categories' })

const form = reactive({
  title: '',
  description: '',
  price: 50,
  category: 'books',
  condition: 'good',
  campus: config.public.campusName as string,
  cover: '/covers/default.svg',
  tagsText: '',
})

const submitting = ref(false)

async function onSubmit() {
  if (!form.title.trim()) {
    $toast.error('请填写标题')
    return
  }
  submitting.value = true
  try {
    const res = await create({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      condition: form.condition as any,
      seller: user.value?.name || '匿名同学',
      campus: form.campus,
      cover: form.cover,
      tags: form.tagsText
        .split(/[,，\s]+/)
        .map((t) => t.trim())
        .filter(Boolean),
    })
    $toast.success('发布成功')
    navigateTo(`/products/${res.data.id}`)
  }
  catch (e: any) {
    $toast.error(e?.data?.statusMessage || '发布失败')
  }
  finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="container narrow">
    <header class="page-head">
      <h1>发布闲置</h1>
      <p>
        本页受 <code>middleware: 'auth'</code> 保护，且在
        <code>routeRules</code> 中配置为 CSR（ssr: false）
      </p>
    </header>

    <form class="form" @submit.prevent="onSubmit">
      <div class="field">
        <label for="title">标题</label>
        <input id="title" v-model="form.title" required maxlength="40" placeholder="简洁描述物品">
      </div>

      <div class="field">
        <label for="description">描述</label>
        <textarea id="description" v-model="form.description" rows="4" placeholder="成色、交易方式、取货地点…" />
      </div>

      <div class="row">
        <div class="field">
          <label for="price">价格（元）</label>
          <input id="price" v-model.number="form.price" type="number" min="1" required>
        </div>
        <div class="field">
          <label for="category">分类</label>
          <select id="category" v-model="form.category">
            <option v-for="c in categories?.data || []" :key="c.slug" :value="c.slug">
              {{ c.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label for="condition">成色</label>
          <select id="condition" v-model="form.condition">
            <option value="new">全新</option>
            <option value="like-new">几乎全新</option>
            <option value="good">轻度使用</option>
            <option value="fair">明显使用痕迹</option>
          </select>
        </div>
        <div class="field">
          <label for="campus">校区</label>
          <input id="campus" v-model="form.campus">
        </div>
      </div>

      <div class="field">
        <label for="cover">封面图 URL</label>
        <input id="cover" v-model="form.cover" placeholder="粘贴图片链接">
        <small>{{ appConfig.features.maxUploadHint }}</small>
      </div>

      <div class="field">
        <label for="tags">标签（逗号分隔）</label>
        <input id="tags" v-model="form.tagsText" placeholder="教材, 高数">
      </div>

      <div class="actions">
        <button type="submit" class="btn" :disabled="submitting">
          {{ submitting ? '发布中…' : '确认发布' }}
        </button>
        <NuxtLink to="/products" class="btn btn--ghost">取消</NuxtLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
.narrow {
  max-width: 720px;
}

.page-head {
  margin-bottom: 1.25rem;
}

h1 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
}

.page-head p {
  margin: 0;
  color: var(--color-muted);
}

code {
  background: #ecfdf5;
  padding: 0.1rem 0.35rem;
  border-radius: 6px;
  font-size: 0.85em;
}

.form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.field small {
  color: var(--color-muted);
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
