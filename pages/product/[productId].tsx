import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { IoMdHeartEmpty } from 'react-icons/io'
import ReactMarkdown from 'react-markdown'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Wrapper from '@/components/Wrapper'
import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
import RelatedProducts from '@/components/RelatedProducts'
import { Product, ProductResponse } from '@/types'
import { fetchData } from '@/utils/api'
import { getNumberComma } from '@/utils/helper'
import { addToCart } from '@/store/cart/cartSlice'

interface Props {
  relatedProducts: Product[]
  product: Product
}

const ProductDetails = ({ relatedProducts, product }: Props) => {
  const [selectedSize, setSelectedSize] = useState('')
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch()

  const notify = () => {
    toast.success('Success. Check your cart!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={product.images} />
          </div>
          <div className="flex-[1] py-3">
            <div className="text-[34px] font-semibold leading-[1] mb-2">
              {product.name}
            </div>
            <div className="text-lg font-semibold mb-5">{product.subtitle}</div>
            <div>MRP: ${getNumberComma(product.price)}</div>
            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guild
                </div>
              </div>
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {product.size.data.map((item, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      item.enabled
                        ? 'hover:boder-black cursor-pointer'
                        : 'cursor-not-allowed bg-black/[0.1] opacity-50'
                    } ${selectedSize === item.size ? 'border-black' : ''}`}
                    onClick={() => {
                      setSelectedSize(item.size)
                      setShowError(false)
                    }}
                  >
                    {item.size}
                  </div>
                ))}
              </div>
              {showError && (
                <div className="text-red-600 mt-1">
                  Size selection is required
                </div>
              )}
            </div>
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true)
                  document.getElementById('sizesGrid')?.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  })
                } else {
                  dispatch(
                    addToCart({
                      ...product,
                      selectedSize,
                      oneQuantityPrice: product.price,
                    }),
                  )
                  notify()
                }
              }}
            >
              Add to Cart
            </button>
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
              Whishlist
              <IoMdHeartEmpty size={20} />
            </button>

            <div>
              <div className="text-lg font-bold md-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>{product.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts products={relatedProducts} />
      </Wrapper>
    </div>
  )
}

export default ProductDetails

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchData<ProductResponse>('products')

  const paths = products.data?.map((product) => ({
    params: {
      productId: product.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const productId = context.params?.productId as string
  const product = await fetchData<Product>(`products/${productId}`)
  const products = await fetchData<ProductResponse>(`products?limit=5&offset=0`)

  return {
    props: {
      product,
      relatedProducts: products.data,
    },
  }
}
