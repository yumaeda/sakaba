/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Menu from '../../interfaces/Menu'
import Restaurant from '../../interfaces/Restaurant'
import MenuDictionary from '../../MenuDictionary'
import CategoryList from '../CategoryList'
import CategorySwitch from '../CategorySwitch'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurant, setRestaurant] = React.useState<Restaurant>()
    const [menus, setMenus] = React.useState<Menu[]>([])
    const [selectedMenus, setSelectedMenus] = React.useState<Menu[]>([])
    const defaultCategory = 1
    const apiUrl = 'https://api.sakaba.link'

    const handleCategoryClick = (event: React.MouseEvent<HTMLSpanElement>) => {
        const category = Number(event.currentTarget.id)
        setSelectedMenus(menus?.filter((menu: Menu) => menu.category == category))
    }

    React.useEffect(() => {
        fetch(`${apiUrl}/restaurants`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurant(JSON.parse(data.body).filter((restaurant: Restaurant) => window.atob(restaurant.id) == match.params.restaurant)[0])
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiUrl}/menus?restaurant_id=${match.params.restaurant}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                const parsedMenu = JSON.parse(data.body)
                setMenus(parsedMenu)
                setSelectedMenus(parsedMenu.filter((menu: Menu) => menu.category == defaultCategory))
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

        return (restaurant == null) ? <div>{}</div>
            : (
            <>
                <header className="menu-header"
                        style={{ backgroundImage: `url(${imageDir}/menu-headers/${window.atob(restaurant.id)}.png)`}}>
                    <h1 className="header-label">{restaurant.name}</h1>
                    <CategorySwitch onCategoryClick={ handleCategoryClick } />
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
                                        <CategoryList menus={ selectedMenus.filter((menu) => menu.category == category && menu.sub_category == subCategory && menu.region == region) } category={category} subCategory={subCategory} region={region} />
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
