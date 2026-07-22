/**
 * 命名中间件 guest
 * 已登录用户访问登录页时，重定向回首页或 redirect 参数
 */
export default defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn.value) {
    const redirect = typeof to.query.redirect === 'string' ? to.query.redirect : '/'
    return navigateTo(redirect)
  }
})
