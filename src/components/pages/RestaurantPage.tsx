/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Menu from '../../interfaces/Menu'
import Restaurant from '../../interfaces/Restaurant'
import MenuDictionary from '../../MenuDictionary'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()
    const [menus, setMenus] = React.useState<Menu[]>()

    React.useEffect(() => {
        fetch('/api-key.txt')
            .then((r) => r.text())
            .then(text  => {
                fetch('https://api.tokyo-takeout.com/restaurants', {
                    headers: { 'X-Api-Key': text }
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

                fetch('https://api.tokyo-takeout.com/menus', {
                    headers: { 'X-Api-Key': text }
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
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const basePath = 'https://tokyo-takeout.com'
        const imageDir = `${basePath}/images`
        const area = match.params.area

        const restaurant = restaurants ? restaurants[0] : null
        return (restaurant == null) ? <div>{}</div>
            : (
            <>
                <header className="menu-header"
                        style={{ backgroundImage: `url(${imageDir}/menu-headers/${atob(restaurant.id)}.png)`}}>
                    <a href={`${basePath}/${area}`}>
                        <picture>
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <h1 className="header-label">{restaurant.name}</h1>
                </header>
                <div className="contents">
                    {
                        Object.keys(MenuDictionary).map((key: string) => {
                            let category = parseInt(key) 
                            return Object.keys(MenuDictionary[category]).filter((subKey: string) => subKey != 'text').map((subKey: string) => {
                                let subCategory = parseInt(subKey)
                                return (
                                    <div>
                                        <h2 className="menu-category">{MenuDictionary[category].text}</h2>
                                        <h4 className="menu-sub-category">{MenuDictionary[category][subCategory].text}</h4>
                                        <ul className="menu-list">
                                        {
                                            (menus != null) ? menus
                                                .filter((menu) => {
                                                    return menu.category == category && menu.sub_category == subCategory
                                                })
                                                .map((menu) => {
                                                    return (
                                                        <li className="menu-item">
                                                            <div className="menu-name-cell">
                                                                <span className="menu-name">{menu.name}</span>
                                                                <br />
                                                                <span className="menu-name-ja">{menu.name_jpn}</span>
                                                            </div>
                                                            <div className="menu-price-cell">{`${menu.price.toLocaleString()} yen`}</div>
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
                    }
                </div>
            </>
        )
    }
}

export default RestaurantPage
