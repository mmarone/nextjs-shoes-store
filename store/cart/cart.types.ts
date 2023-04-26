import { Product } from '@/types'

export interface CartItem extends Product {
  selectedSize: string
  oneQuantityPrice: number
  quantity: number
}
