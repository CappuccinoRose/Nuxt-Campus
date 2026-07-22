/**
 * GET /api/products/:id
 * 商品详情，并累加浏览量
 */
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少商品 id' })
  }

  const product = bumpViews(id)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: '商品不存在' })
  }

  return { ok: true, data: product }
})
