/**
 * useFavorites —— 收藏夹
 * 使用 useCookie 持久化，刷新后仍保留
 */
export function useFavorites() {
  const ids = useCookie<string[]>('campus_favorites', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 30,
  })

  const count = computed(() => ids.value.length)

  function has(id: string) {
    return ids.value.includes(id)
  }

  function toggle(id: string) {
    if (has(id)) {
      ids.value = ids.value.filter((x) => x !== id)
      return false
    }
    ids.value = [...ids.value, id]
    return true
  }

  function clear() {
    ids.value = []
  }

  return { ids, count, has, toggle, clear }
}
