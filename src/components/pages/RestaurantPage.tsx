/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
// import Menu from '../../interfaces/Menu'
import Restaurant from '../../interfaces/Restaurant'
import MenuDictionary from '../../MenuDictionary'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    /*
    const alcoholTypes = [
        { label: 'GIN BASE', type: 0 },
        { label: 'VODKA BASE', type: 1 },
        { label: 'RUM BASE', type: 2 },
        { label: 'TEQUILA BASE', type: 3 },
        { label: 'BRANDY BASE', type: 4 },
        { label: 'WHISKY BASE', type: 5 },
        { label: 'WINE BASE', type: 6 },
        { label: 'LIQUEUR BASE', type: 7 },
        { label: 'Speyside-ｽﾍﾟｲｻｲﾄﾞ', type: 8  },
        { label: 'Highland-ﾊｲﾗﾝﾄﾞ', type: 9  },
        { label: 'Lowland-ﾛ−ﾗﾝﾄﾞ', type: 10  },
        { label: 'Islands-ｱｲﾗﾝｽﾞ', type: 11  },
        { label: 'Islay-ｱｲﾗ', type: 12  },
        { label: 'Campbeltown-ｷｬﾝﾍﾞﾙﾀｳﾝ', type: 13  },
        { label: 'Blended-ﾌﾞﾚﾝﾃﾞｯﾄﾞ', type: 14  },
        { label: 'JAPANESE', type: 15  },
        { label: 'BOURBON', type: 16  },
        { label: 'TENNESSEE, CORN, RYE', type: 17  },
        { label: 'CANADIAN, IRISH', type: 18  },
        { label: 'OLD BOTTLE', type: 19  }
    ]
    */

    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()
    // const [menus, setMenus] = React.useState<Menu[]>()

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

                /*
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
                */
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
                        Object.keys(MenuDictionary).map((category) => {
                            console.log(category)
                            return (
                                <div>
                                    <h4 className="cocktail-type">{category}</h4>
                                    <ul className="cocktail-list">
                                    </ul>
                                </div>
                            )
                        })
/*
                        alcoholTypes.map((alcoholType) => {
                            return (
                                <div>
                                    <h4 className="cocktail-type">{alcoholType.label}</h4>
                                    <ul className="cocktail-list">
                                    {
                                        (menus != null) ?
                                            menus.filter((menu) => menu.category == alcoholType.type).map((menu) => {
                                            return (
                                                <li className="cocktail-item">
                                                    <div className="cocktail-name-cell">
                                                        <span className="cocktail-name">{menu.name}</span>
                                                        <br />
                                                        <span className="cocktail-name-ja">{menu.name_jpn}</span>
                                                    </div>
                                                    <div className="cocktail-price-cell">{`${menu.price.toLocaleString()} yen`}</div>
                                                </li>
                                            )
                                        }) :
                                        ''
                                    }
                                    </ul>
                                </div>
                            )
                        })
*/
                    }
                </div>
            </>
        )
    }
}

export default RestaurantPage
