/**
 * GET /api/stats
 * 首页统计数据
 */
export default defineEventHandler(() => {
  const list = listProducts()
  const byCategory = categories.map((c) => ({
    ...c,
    count: list.filter((p) => p.category === c.slug).length,
  }))

  return {
    ok: true,
    data: {
      totalProducts: list.length,
      totalViews: list.reduce((sum, p) => sum + p.views, 0),
      avgPrice: Math.round(list.reduce((sum, p) => sum + p.price, 0) / (list.length || 1)),
      byCategory,
      hot: [...list].sort((a, b) => b.views - a.views).slice(0, 3),
    },
  }
})
