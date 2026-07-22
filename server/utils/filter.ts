import type { Product, ProductQuery } from '../../shared/types'

/**
 * 按查询条件过滤 / 排序商品
 */
export function filterProducts(list: Product[], query: ProductQuery) {
  let result = [...list]

  if (query.q) {
    const q = query.q.toLowerCase()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q)
        || p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  if (query.category) {
    result = result.filter((p) => p.category === query.category)
  }

  if (query.minPrice != null && !Number.isNaN(query.minPrice)) {
    result = result.filter((p) => p.price >= query.minPrice!)
  }

  if (query.maxPrice != null && !Number.isNaN(query.maxPrice)) {
    result = result.filter((p) => p.price <= query.maxPrice!)
  }

  switch (query.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'views':
      result.sort((a, b) => b.views - a.views)
      break
    case 'newest':
    default:
      result.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
  }

  return result
}
