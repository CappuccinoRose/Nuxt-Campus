/**
 * 命名中间件 auth
 * 在页面中通过 definePageMeta({ middleware: 'auth' }) 启用
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn.value) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }
})
