import type { Product, ProductQuery } from '~~/shared/types'

/**
 * useProducts —— 封装商品相关请求
 * 展示 composable 如何组合 useFetch / $fetch
 */
export function useProducts() {
  function fetchList(query: ProductQuery = {}) {
    // useFetch 在 setup 中调用时自动处理 SSR 数据脱水
    return useFetch<{ ok: boolean, total: number, data: Product[] }>('/api/products', {
      query,
      // 根据查询参数生成 key，避免不同筛选条件共用缓存
      key: `products-${JSON.stringify(query)}`,
      watch: false,
    })
  }

  function fetchOne(id: MaybeRefOrGetter<string>) {
    // 使用 getter + 动态 key，保证 /products/p1 → /products/p2 切换时会重新请求
    return useFetch<{ ok: boolean, data: Product }>(
      () => `/api/products/${toValue(id)}`,
      {
        key: computed(() => `product-${toValue(id)}`),
      },
    )
  }

  async function create(payload: Partial<Product>) {
    return await $fetch<{ ok: boolean, data: Product }>('/api/products', {
      method: 'POST',
      body: payload,
    })
  }

  async function remove(id: string) {
    return await $fetch<{ ok: boolean }>(`/api/products/${id}`, {
      method: 'DELETE',
    })
  }

  return { fetchList, fetchOne, create, remove }
}
