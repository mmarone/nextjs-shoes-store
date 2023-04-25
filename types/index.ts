export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  description: string
  size: object
  images: string[]
  thumbnail: string
  originalPrice: number
  categories: Category[]
}

interface Category {
  id: string
  name: string
}
