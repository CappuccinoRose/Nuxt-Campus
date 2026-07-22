/**
 * DELETE /api/products/:id
 */
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少商品 id' })
  }

  const ok = deleteProduct(id)
  if (!ok) {
    throw createError({ statusCode: 404, statusMessage: '商品不存在' })
  }

  return { ok: true }
})
