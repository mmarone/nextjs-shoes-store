import HeroBanner from '@/components/HeroBanner'

import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { fetchData } from '@/utils/api'

import { Product } from '@/types'

interface Props {
  products: Product[]
}

export default function Home({ products }: Props) {
  return (
    <main>
      <HeroBanner />
      <Wrapper>
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Cushioning for Your Miles
          </div>
          <div className="text-md md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus
            aspernatur praesentium quod aliquam perferendis repellat similique
            dignissimos.
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {products.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </Wrapper>
    </main>
  )
}

export async function getStaticProps() {
  const products = await fetchData<Product[]>('products')

  return {
    props: { products },
  }
}
