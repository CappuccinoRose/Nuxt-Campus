/**
 * useFormat —— 简单格式化工具
 */
export function useFormat() {
  function price(n: number) {
    return `¥${n.toFixed(n % 1 === 0 ? 0 : 2)}`
  }

  function relativeTime(iso: string) {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return '刚刚'
    if (mins < 60) return `${mins} 分钟前`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours} 小时前`
    const days = Math.floor(hours / 24)
    return `${days} 天前`
  }

  const conditionLabel: Record<string, string> = {
    new: '全新',
    'like-new': '几乎全新',
    good: '轻度使用',
    fair: '明显使用痕迹',
  }

  return { price, relativeTime, conditionLabel }
}
