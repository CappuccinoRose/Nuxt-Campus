/**
 * GET /api/categories
 */
export default defineEventHandler(() => {
  return { ok: true, data: categories }
})
