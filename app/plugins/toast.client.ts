/**
 * 客户端插件：注册简易 Toast
 * .client.ts 表示仅在浏览器运行
 */
export default defineNuxtPlugin(() => {
  const toasts = useState<Array<{ id: number, message: string, type: string }>>('toasts', () => [])
  let seq = 0

  function show(message: string, type: 'info' | 'success' | 'error' = 'info', duration = 2400) {
    const id = ++seq
    toasts.value = [...toasts.value, { id, message, type }]
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, duration)
  }

  return {
    provide: {
      toast: {
        show,
        success: (msg: string) => show(msg, 'success'),
        error: (msg: string) => show(msg, 'error'),
      },
    },
  }
})
