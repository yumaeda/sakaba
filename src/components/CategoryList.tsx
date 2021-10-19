/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Menu from '../interfaces/Menu'
import MenuPrice from './MenuPrice'

interface Props {
    menus: Menu[]
    subCategory: number
    region: number
}

const CategoryList: React.FC<Props> = (props) => {
    const { menus, region, subCategory } = props

    return (menus.length > 0) ?  (
        <div>
            <h6 className="menu-region">{}</h6>
            <ul className="menu-list">
            {
                menus.filter((menu: Menu) => menu.sub_category == subCategory && menu.region == region).map((menu) => {
                    return (
                        <li className="menu-item">
                            <div className="menu-name-cell">
                                <span className="menu-name">{menu.name}</span>
                                <br />
                                <span className="menu-name-ja">{menu.name_jpn}</span>
                            </div>
                            <MenuPrice price={menu.price} isMinPrice={menu.is_min_price} />
                        </li>
                    )
                })
            }
            </ul>
        </div>
    ) : <></>
}

export default CategoryList
