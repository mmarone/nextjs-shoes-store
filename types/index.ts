export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  description: string
  size: Size
  images: string[]
  thumbnail: string
  originalPrice: number
  categories: Category[]
}

interface Size {
  data: { size: string; enabled: boolean }[]
}

export interface Category {
  id: string
  name: string
  docCount: number
}

export interface ProductResponse {
  data: Product[]
  total: number
}