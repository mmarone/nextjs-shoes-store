import { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import useSWR from 'swr'

import { fetchData } from '@/utils/api'

import Wrapper from '@/components/Wrapper'
import ProductCard from '@/components/ProductCard'
import { Category, ProductResponse } from '@/types'
import { useRouter } from 'next/router'

const pageSize = 3

interface Props {
  category: Category
  products: ProductResponse
}

const Category = ({ category, products }: Props) => {
  const [pageIndex, setPageIndex] = useState(1)
  const offset = (pageIndex - 1) * pageSize
  const { query } = useRouter()

  useEffect(() => {
    setPageIndex(1)
  }, [query])

  const { data, error, isLoading } = useSWR(
    `products/category/${category.id}?limit=${pageSize}&offset=${offset}`,
    fetchData<ProductResponse>,
    {
      fallbackData: products,
    },
  )

  const totalPages = Math.ceil((data?.total || 0) / pageSize)

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category.name}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {data?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {(data?.total || 0) > pageSize && (
            <div className="flex gap-3 items-center justify-center my-16 md:my-0">
              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={pageIndex === 1}
                onClick={() => setPageIndex(pageIndex - 1)}
              >
                Previous
              </button>

              <span className="font-bold">{`${pageIndex} of ${
                data && totalPages
              }`}</span>

              <button
                className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                disabled={pageIndex === (data && totalPages)}
                onClick={() => setPageIndex(pageIndex + 1)}
              >
                Next
              </button>
            </div>
          )}

          {isLoading && (
            <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
              <img src="/spinner.svg" width={150} alt="loading" />
              <span className="text-2xl font-medium">Loading...</span>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  )
}

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchData<Category[]>('categories')

  const paths = categories?.map((category) => ({
    params: {
      categoryId: category.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryId = context.params?.categoryId as string

  const category = await fetchData<Category>(`categories/${categoryId}`)
  const products = await fetchData<ProductResponse>(
    `products/category/${categoryId}?limit=${pageSize}&offset=0`,
  )

  return {
    props: {
      category,
      products,
    },
  }
}
