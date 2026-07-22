import type { Category, Product } from '../../shared/types'

/**
 * 内存数据层 —— 学习项目不引入数据库。
 * 服务端进程内共享；热重载时会重置。
 */

export const categories: Category[] = [
  { slug: 'books', name: '教材书籍', description: '教材、考研资料、课外读物', icon: '📚' },
  { slug: 'electronics', name: '数码电器', description: '耳机、键盘、平板等', icon: '💻' },
  { slug: 'daily', name: '生活日用', description: '宿舍好物、收纳、小家电', icon: '🧺' },
  { slug: 'sports', name: '运动户外', description: '球拍、骑行、露营装备', icon: '🏀' },
  { slug: 'others', name: '其他闲置', description: '票券、手办、杂物', icon: '🎁' },
]

// 使用本地 SVG 占位图，避免 Unsplash 外链拖慢首屏
const covers = [
  '/covers/books.svg',
  '/covers/electronics.svg',
  '/covers/daily.svg',
  '/covers/sports.svg',
  '/covers/books-alt.svg',
  '/covers/electronics-alt.svg',
]

let products: Product[] = [
  {
    id: 'p1',
    title: '高等数学同济第七版（上下册）',
    description: '几乎全新，笔记很少。适合大一新生。可面交图书馆门口。',
    price: 35,
    category: 'books',
    condition: 'like-new',
    seller: '小林',
    campus: '匿名大学·东校区',
    cover: covers[0],
    tags: ['高数', '教材'],
    createdAt: '2026-07-18T08:00:00.000Z',
    views: 128,
  },
  {
    id: 'p2',
    title: '机械键盘 Keychron K2',
    description: '茶轴，用了一年，键帽轻微磨损，手感依旧。附原装盒。',
    price: 280,
    category: 'electronics',
    condition: 'good',
    seller: '阿哲',
    campus: '匿名大学·西校区',
    cover: covers[1],
    tags: ['键盘', '数码'],
    createdAt: '2026-07-19T10:30:00.000Z',
    views: 256,
  },
  {
    id: 'p3',
    title: '宿舍桌面收纳套装',
    description: '含笔筒、文件架、抽屉盒，搬家清仓，成套带走更便宜。',
    price: 45,
    category: 'daily',
    condition: 'good',
    seller: '小雨',
    campus: '匿名大学·东校区',
    cover: covers[2],
    tags: ['收纳', '宿舍'],
    createdAt: '2026-07-20T14:00:00.000Z',
    views: 89,
  },
  {
    id: 'p4',
    title: '尤尼克斯羽毛球拍（单只）',
    description: '进阶入门拍，线床已穿好，送两筒球。操场当面试打。',
    price: 120,
    category: 'sports',
    condition: 'good',
    seller: '阿杰',
    campus: '匿名大学·南校区',
    cover: covers[3],
    tags: ['羽毛球', '运动'],
    createdAt: '2026-07-21T09:15:00.000Z',
    views: 167,
  },
  {
    id: 'p5',
    title: '考研英语真题精讲精练',
    description: '做了一半，答案册齐全。毕业出清。',
    price: 28,
    category: 'books',
    condition: 'fair',
    seller: '学姐学长互助社',
    campus: '匿名大学·东校区',
    cover: covers[4],
    tags: ['考研', '英语'],
    createdAt: '2026-07-17T16:40:00.000Z',
    views: 203,
  },
  {
    id: 'p6',
    title: '索尼 WH-1000XM4 降噪耳机',
    description: '续航优秀，降噪给力。耳机垫轻微老化，功能正常。',
    price: 680,
    category: 'electronics',
    condition: 'good',
    seller: '阿哲',
    campus: '匿名大学·西校区',
    cover: covers[5],
    tags: ['耳机', '降噪'],
    createdAt: '2026-07-22T02:00:00.000Z',
    views: 312,
  },
]

let seq = 7

export function listProducts() {
  return products
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

export function createProduct(input: Omit<Product, 'id' | 'createdAt' | 'views'>) {
  const product: Product = {
    ...input,
    id: `p${seq++}`,
    createdAt: new Date().toISOString(),
    views: 0,
  }
  products = [product, ...products]
  return product
}

export function updateProduct(id: string, patch: Partial<Product>) {
  const idx = products.findIndex((p) => p.id === id)
  if (idx < 0) return null
  products[idx] = { ...products[idx], ...patch, id }
  return products[idx]
}

export function deleteProduct(id: string) {
  const before = products.length
  products = products.filter((p) => p.id !== id)
  return products.length < before
}

export function bumpViews(id: string) {
  const p = getProduct(id)
  if (p) p.views += 1
  return p
}
