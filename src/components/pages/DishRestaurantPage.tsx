/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { getPosition, handleGeolocationError } from '../../utils/GeoLocationUtility'
import { API_URL, IMG_URL, WEB_URL } from '../../constants/Global'
import Dish from '../../interfaces/Dish'
import RestaurantList from '../RestaurantList'
import Footer from '../Footer'

const DishRestaurantPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [dish, setDish] = React.useState<Dish>({name: '', id: 0})
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const imageDir = `${IMG_URL}/images`

    React.useEffect(() => {
        getPosition({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
            .then((position: GeolocationPosition) => {
                console.dir(position)
                fetch(`${API_URL}/restaurants/dishes/${params.id}`, {
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
            })
            .catch((error: GeolocationPositionError) => {
                handleGeolocationError(error)
            })

        fetch(`${API_URL}/dishes/${params.id}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDish(JSON.parse(JSON.stringify(data.body)))
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
                    <a href={`${WEB_URL}/`}>
                        <picture className="back-image-container">
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <p className="header-label">{`${dish.id}:${dish.name}`}</p>
                </header>
                <div className="contents">
                    <RestaurantList restaurants={restaurants} />
                </div> 
                <Footer />
            </>
        )
    }
}

export default DishRestaurantPage
