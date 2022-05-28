/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import Drink from '../../interfaces/Drink'
import RestaurantList from '../RestaurantList'
import Footer from '../Footer'

const DrinkRestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [drink, setDrink] = React.useState<Drink>({name: '', id: 0})
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const drinkId = match.params.id
    const newApiUrl = 'https://api.tokyo-dinner.com'
    const basePath = 'https://sakaba.link'
    const imageBasePath = 'https://tokyo-takeout.com'
    const imageDir = `${imageBasePath}/images`

    React.useEffect(() => {
        fetch(`${newApiUrl}/restaurants/drinks/${drinkId}`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurants(camelcaseKeys(JSON.parse(JSON.stringify(data.body))))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${newApiUrl}/drinks/${drinkId}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDrink(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        return (
            <>
                <header className="header">
                    <a href={`${basePath}/`}>
                        <picture>
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <h1 className="header-label">{`${drink.id}:${drink.name}`}</h1>
                </header>
                <div className="contents">
                    <RestaurantList restaurants={restaurants} />
                </div> 
                <Footer />
            </>
        )
    }
}

export default DrinkRestaurantPage
