import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Product } from '@/types'
import { getDiscountedPricePercentage, getNumberComma } from '@/utils/helper'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/product/${product.id}`}>
      <Image
        className="w-full"
        src={product.thumbnail}
        width={500}
        height={500}
        alt="Product Image"
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{product.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">
            ${getNumberComma(product.price)}
          </p>

          {product.originalPrice > product.price && (
            <>
              <p className="text-base font-medium line-through">
                ${getNumberComma(product?.originalPrice)}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPricePercentage(
                  product.originalPrice,
                  product.price,
                )}
                % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
