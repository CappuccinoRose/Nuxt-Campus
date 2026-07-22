/**
 * 共享类型定义
 * Nuxt 会自动扫描 shared/ 或 types/；这里放在 types/ 便于学习
 */
export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair'

export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: ProductCondition
  seller: string
  campus: string
  cover: string
  tags: string[]
  createdAt: string
  views: number
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
}

export interface User {
  id: string
  name: string
  studentId: string
  campus: string
}

export interface LoginPayload {
  studentId: string
  name: string
}

export interface ProductQuery {
  q?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'views'
}
