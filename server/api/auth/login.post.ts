/**
 * POST /api/auth/login
 * 模拟登录：校验学号格式后返回用户信息
 * 真实项目应签发 JWT / Session，这里用前端 cookie 存用户
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const studentId = String(body?.studentId || '').trim()
  const name = String(body?.name || '').trim()

  // 硬编码规则：学号需为 8 位数字（方便学习调试）
  if (!/^\d{8}$/.test(studentId)) {
    throw createError({
      statusCode: 400,
      statusMessage: '学号格式错误，请输入 8 位数字（示例：20260001）',
    })
  }

  if (!name || name.length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: '请输入至少 2 个字符的昵称',
    })
  }

  const config = useRuntimeConfig(event)

  return {
    ok: true,
    // 演示：服务端可读取 private runtimeConfig
    serverHint: `signed-by:${config.apiSecret.slice(0, 6)}***`,
    data: {
      id: `u_${studentId}`,
      name,
      studentId,
      campus: config.public.campusName,
    },
  }
})
