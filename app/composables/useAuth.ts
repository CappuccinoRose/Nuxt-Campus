import type { User } from '~~/shared/types'

/**
 * useAuth —— 演示 useCookie + useState 做跨组件登录态
 * cookie 可在 SSR 与客户端之间共享；useState 做同一次请求内缓存
 */
export function useAuth() {
  const userCookie = useCookie<User | null>('campus_user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 7, // 7 天
    sameSite: 'lax',
  })

  // useState 的 key 全局唯一，SSR 会把状态脱水到客户端
  const user = useState<User | null>('auth-user', () => userCookie.value)

  const isLoggedIn = computed(() => !!user.value)

  async function login(studentId: string, name: string) {
    const res = await $fetch<{ ok: boolean, data: User }>('/api/auth/login', {
      method: 'POST',
      body: { studentId, name },
    })
    user.value = res.data
    userCookie.value = res.data
    return res.data
  }

  function logout() {
    user.value = null
    userCookie.value = null
  }

  return { user, isLoggedIn, login, logout }
}
