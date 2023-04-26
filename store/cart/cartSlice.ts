import { CartItem } from './cart.types'
import { createSlice } from '@reduxjs/toolkit'

interface CartState {
  cartItems: CartItem[]
}

const initialState: CartState = {
  cartItems: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload.id,
      )
      if (item) {
        item.quantity++
        item.price = item.originalPrice * item.quantity
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.key === 'quantity') {
            cartItem.price = cartItem.oneQuantityPrice * action.payload.value
          }

          return { ...cartItem, [action.payload.key]: action.payload.value }
        }

        return cartItem
      })
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id,
      )
    },
  },
})

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
