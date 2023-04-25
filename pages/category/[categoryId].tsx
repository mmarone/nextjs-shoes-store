import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { fetchData } from '@/utils/api'

import Wrapper from '@/components/Wrapper'
import ProductCard from '@/components/ProductCard'
import { Category, Product } from '@/types'

interface Props {
  category: Category
  products: Product[]
}

const Category = ({ category, products = [] }: Props) => {
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            {category.name}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
  const products = await fetchData<Product[]>(
    `products/category/${categoryId}`,
  )

  return {
    props: {
      category,
      products,
    },
  }
}
