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

const subMenuData = [
  { id: 1, name: 'Jordan', docCount: 11 },
  { id: 2, name: 'Sneakers', docCount: 11 },
  { id: 3, name: 'Running shoes', docCount: 11 },
  { id: 4, name: 'Football shoes', docCount: 11 },
]

interface Props {
  showCatMenu: boolean
  handleShowCatMenu: (value: boolean) => void
  categories: Category[]
}

const Menu = ({ showCatMenu, handleShowCatMenu, categories }: Props) => {
  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <li
                className="cursor-pointer flex items-center gap-2 relative"
                onMouseEnter={() => handleShowCatMenu(true)}
                onMouseLeave={() => handleShowCatMenu(false)}
              >
                {item.name}
                <BsChevronDown size={14} />
                {showCatMenu && (
                  <ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
                    {categories?.map((category) => {
                      return (
                        <Link key={category.id} href={`/category/${category.id}`}>
                          <li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
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
              <li>
                <Link href={item.url!}>{item.name}</Link>
              </li>
            )}
          </React.Fragment>
        )
      })}
    </ul>
  )
}

export default Menu
