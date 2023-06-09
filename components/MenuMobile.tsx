import React from 'react'
import Link from 'next/link'

import { BsChevronDown } from 'react-icons/bs'

import { Category } from '@/types'

const data = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'About', url: '/about' },
  { id: 3, name: 'Categories', subMenu: true },
  { id: 4, name: 'Contact', url: '/contact' },
]

interface Props {
  showCatMenu: boolean
  handleShowCatMenu: (value: boolean) => void
  handleShowMobileMenu: (value: boolean) => void
  categories: Category[]
}

const MenuMobile = ({
  showCatMenu,
  handleShowCatMenu,
  handleShowMobileMenu,
  categories,
}: Props) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <li
                className="cursor-pointer py-4 px-5 border-b flex flex-col relative"
                onClick={() => handleShowCatMenu(!showCatMenu)}
              >
                <div className="flex justify-between items-center">
                  {item.name}
                  <BsChevronDown size={14} />
                </div>
                {showCatMenu && (
                  <ul className="bg-black/[0.05] -mx-5 mt-4 -mb-4">
                    {categories?.map((category) => {
                      return (
                        <Link
                          key={category.id}
                          href={`/category/${category.id}`}
                          onClick={() => {
                            handleShowCatMenu(false)
                            handleShowMobileMenu(false)
                          }}
                        >
                          <li className="py-4 px-8 border-t flex justify-between">
                            {category.name}
                            <span className="opacity-50 text-sm">
                              ({category.docCount})
                            </span>
                          </li>
                        </Link>
                      )
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="py-4 px-5 border-b">
                <Link
                  href={item.url!}
                  onClick={() => handleShowMobileMenu(false)}
                >
                  {item.name}
                </Link>
              </li>
            )}
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default MenuMobile
