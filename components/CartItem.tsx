import React, { ChangeEvent } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { getNumberComma } from '@/utils/helper'

import { CartItem } from '@/store/cart/cart.types'
import { removeFromCart, updateCart } from '@/store/cart/cartSlice'

interface Props {
  cartItem: CartItem
}

const CartItem = ({ cartItem }: Props) => {
  const dispatch = useDispatch()
  const updateCartItem = (
    event: ChangeEvent<HTMLSelectElement>,
    key: string,
  ) => {
    let payload = {
      key,
      value:
        key === 'quantity' ? parseInt(event.target.value) : event.target.value,
      id: cartItem.id,
    }

    dispatch(updateCart(payload))
  }

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          src={cartItem.thumbnail}
          width={120}
          height={120}
          alt="Product Image"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {cartItem.name}
          </div>

          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {cartItem.subtitle}
          </div>

          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : ${getNumberComma(cartItem.price)}
          </div>
        </div>

        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {cartItem.subtitle}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <select
                className="hover:text-black"
                value={cartItem.selectedSize}
                onChange={(event) => updateCartItem(event, 'selectedSize')}
              >
                {cartItem.size.data.map((option, i) => (
                  <option
                    key={i}
                    value={option.size}
                    disabled={!option.enabled}
                  >
                    {option.size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity: </div>
              <select
                className="hover:text-black"
                value={cartItem.quantity}
                onChange={(event) => updateCartItem(event, 'quantity')}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((value, i) => (
                  <option key={i} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-black/[0.5] hover:text-red-600 text-[16px] md:text-[20px]"
            onClick={() => dispatch(removeFromCart({ id: cartItem.id }))}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
