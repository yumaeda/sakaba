/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Menu from '../interfaces/Menu'
import MenuDictionary from '../MenuDictionary'
import MenuPrice from './MenuPrice'

interface Props {
    menus: Menu[],
    category: number,
    subCategory: number,
    region: number
}

const CategoryList: React.FC<Props> = (props) => {
    const { menus, category, subCategory, region } = props

    return (menus.length > 0) ?  (
        <div>
            <h2 className="menu-category">{MenuDictionary[category].text}</h2>
            <h4 className="menu-sub-category">{MenuDictionary[category][subCategory].text}</h4>
            <h6 className="menu-region">{MenuDictionary[category][subCategory][region]}</h6>
            <ul className="menu-list">
            {
                menus.map((menu) => {
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
