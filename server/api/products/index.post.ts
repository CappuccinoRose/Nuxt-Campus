import type { ProductCondition } from '../../../shared/types'

/**
 * POST /api/products
 * 发布新商品（演示 body 校验）
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.title || !body?.price || !body?.category) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少必要字段：title / price / category',
    })
  }

  const product = createProduct({
    title: String(body.title).trim(),
    description: String(body.description || '').trim(),
    price: Number(body.price),
    category: String(body.category),
    condition: (body.condition || 'good') as ProductCondition,
    seller: String(body.seller || '匿名同学'),
    campus: String(body.campus || '匿名大学'),
    cover: String(body.cover || '/covers/default.svg'),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
  })

  setResponseStatus(event, 201)
  return { ok: true, data: product }
})
