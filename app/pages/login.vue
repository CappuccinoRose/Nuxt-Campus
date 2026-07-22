<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest',
})

useSeoMeta({ title: '登录' })

const route = useRoute()
const { login } = useAuth()
const { $toast } = useNuxtApp()

const form = reactive({
  studentId: '20260001',
  name: '匿名同学',
})
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    await login(form.studentId, form.name)
    $toast.success('登录成功')
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    navigateTo(redirect)
  }
  catch (e: any) {
    $toast.error(e?.data?.statusMessage || '登录失败')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>学生登录</h1>
    <p class="desc">演示 <code>layout: 'auth'</code> + <code>middleware: 'guest'</code></p>
    <p class="hint">学号需为 8 位数字，默认已填好可直接登录。</p>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <label for="studentId">学号</label>
        <input id="studentId" v-model="form.studentId" required placeholder="20260001">
      </div>
      <div class="field">
        <label for="name">昵称</label>
        <input id="name" v-model="form.name" required placeholder="你的昵称">
      </div>
      <button class="btn" type="submit" :disabled="loading" style="width: 100%">
        {{ loading ? '登录中…' : '进入市集' }}
      </button>
    </form>

    <p class="back">
      <NuxtLink to="/">← 返回首页</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  text-align: center;
}

.desc,
.hint {
  text-align: center;
  color: var(--color-muted);
  margin: 0 0 0.75rem;
  font-size: 0.92rem;
}

code {
  background: #ecfdf5;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
}

.back {
  margin-top: 1.25rem;
  text-align: center;
}

.back a {
  color: var(--color-primary);
}
</style>
