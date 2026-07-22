/**
 * GET /api/products
 * 查询商品列表，支持 q / category / minPrice / maxPrice / sort
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)

  const list = filterProducts(listProducts(), {
    q: typeof query.q === 'string' ? query.q : undefined,
    category: typeof query.category === 'string' ? query.category : undefined,
    minPrice: query.minPrice != null ? Number(query.minPrice) : undefined,
    maxPrice: query.maxPrice != null ? Number(query.maxPrice) : undefined,
    sort: (query.sort as 'newest' | 'price-asc' | 'price-desc' | 'views') || 'newest',
  })

  return {
    ok: true,
    total: list.length,
    data: list,
  }
})
