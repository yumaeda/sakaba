/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Menu from '../../interfaces/Menu'
import Restaurant from '../../interfaces/Restaurant'
import MenuDictionary from '../../MenuDictionary'
import MenuPrice from '../MenuPrice'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()
    const [menus, setMenus] = React.useState<Menu[]>()
    const apiUrl = 'https://api.sakaba.link'

    React.useEffect(() => {
        fetch(`${apiUrl}/restaurants`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurants(JSON.parse(data.body).filter((restaurant: Restaurant) => atob(restaurant.id) == match.params.restaurant))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiUrl}/menus`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setMenus(JSON.parse(data.body).filter((menu: Menu) => atob(menu.restaurant_id) == match.params.restaurant))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const baseImagePath = 'https://tokyo-takeout.com'
        const imageDir = `${baseImagePath}/images`

        const restaurant = restaurants ? restaurants[0] : null
        return (restaurant == null) ? <div>{}</div>
            : (
            <>
                <header className="menu-header"
                        style={{ backgroundImage: `url(${imageDir}/menu-headers/${atob(restaurant.id)}.png)`}}>
                    <h1 className="header-label">{restaurant.name}</h1>
                </header>
                <div className="contents">
                    {
                        Object.keys(MenuDictionary).map((key: string) => {
                            let category = parseInt(key) 
                            return Object.keys(MenuDictionary[category]).filter((subKey: string) => subKey != 'text').map((subKey: string) => {
                                let subCategory = parseInt(subKey)
                                return Object.keys(MenuDictionary[category][subCategory]).filter((regionKey: string) => regionKey != 'text').map((regionKey: string) => {
                                    let region = parseInt(regionKey)
                                    return (
                                        <div>
                                            <h2 className="menu-category">{MenuDictionary[category].text}</h2>
                                            <h4 className="menu-sub-category">{MenuDictionary[category][subCategory].text}</h4>
                                            <h6 className="menu-region">{MenuDictionary[category][subCategory][region]}</h6>
                                            <ul className="menu-list">
                                            {
                                                (menus != null) ? menus
                                                    .filter((menu) => {
                                                        return menu.category == category && menu.sub_category == subCategory && menu.region == region
                                                    })
                                                    .map((menu) => {
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
                                                    }) :
                                                    ''
                                            }
                                            </ul>
                                        </div>
                                    )
                                })
                            })
                        })
                    }
                </div>
            </>
        )
    }
}

export default RestaurantPage
