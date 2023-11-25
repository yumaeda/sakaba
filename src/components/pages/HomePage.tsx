/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Dish from '../../interfaces/Dish'
import Drink from '../../interfaces/Drink'
import Genre from '../../interfaces/Genre'
import Photo from '../../interfaces/Photo'
import RestaurantInfo from '../../interfaces/RestaurantInfo'
import { getPosition, handleGeolocationError } from '../../utils/GeoLocationUtility'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import LatestPhotoList from '../LatestPhotoList'

const HomePage: React.FC<{}> = () => {
    const [dishes, setDishes] = React.useState<Dish[]>([])
    const [drinks, setDrinks] = React.useState<Drink[]>([])
    const [genres, setGenres] = React.useState<Genre[]>([])
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [restaurantInfos, setRestaurantInfos] = React.useState<RestaurantInfo[]>()
    const [error, setError] = React.useState<Error>()
    const [ showAllRestaurants, setShowAllRestaurants ] = React.useState<boolean>(false)
    const apiBasePath = 'https://api.tokyo-dinner.com'
    const newApiBasePath = 'https://api.sakabas.com'
    const imageBasePath = 'https://d1ds2m6k69pml3.cloudfront.net'

    React.useEffect(() => {
        getPosition({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
            .then((position: GeolocationPosition) => {
                fetch(`${apiBasePath}/restaurant-counts/${position.coords.latitude}/${position.coords.longitude}`, {
                    headers: {}
                })
                .then(res => res.json())
                .then(
                    (data) => {
                        setRestaurantInfos(JSON.parse(JSON.stringify(data.body)))
                    },
                    (error: Error) => {
                        setError(error)
                    }
                )
            })
            .catch((error: GeolocationPositionError) => {
                handleGeolocationError(error)
            })

        fetch(`${newApiBasePath}/dishes/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDishes(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${newApiBasePath}/drinks/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDrinks(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${newApiBasePath}/genres/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setGenres(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${newApiBasePath}/latest-photos/`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setPhotos(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )


        setShowAllRestaurants(localStorage.getItem('hideClosedRestaurants') != "1" ?? false)
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <>
                <header className="header">
                    <p className="header-label">酒場リンク</p>
                </header>
                <div className="contents">
                    <LatestPhotoList basePath={imageBasePath} photos={photos} />
                    <h4 className="navigation-label">Area</h4>
                    <ul className="navigation-list">
                    { restaurantInfos ? restaurantInfos
                        .filter((restaurantInfo: RestaurantInfo) => (showAllRestaurants || restaurantInfo.count > 0))
                        .map((info: RestaurantInfo) => (
                        <li className="navigation-item">
                            <span>
                                <Link className="list-item" to={`/${info.area}/`}>{`${info.name}`}</Link>
                            </span>
                        </li>)) :
                        <li>Loading...</li>
                    }
                    </ul>
                    <h4 className="navigation-label">Drink</h4>
                    <ul className="navigation-list">
                    { drinks ? drinks.map((drink: Drink) => (
                        <li className="navigation-item">
                            <span>
                                <Link className="list-item" to={`/drinks/${drink.id}/`}>{drink.name}</Link>
                            </span>
                        </li>)) :
                        <li>Loading...</li>
                    }
                    </ul>
                    <h4 className="navigation-label">Genre</h4>
                    <ul className="navigation-list">
                    { genres ? genres.map((genre: Genre) => (
                        <li className="navigation-item">
                            <span>
                                <Link className="list-item" to={`/genres/${genre.id}/`}>{genre.name}</Link>
                            </span>
                        </li>)) :
                        <li>Loading...</li>
                    }
                    </ul>
                    <h4 className="navigation-label">Dish</h4>
                    <ul className="navigation-list">
                    { dishes ? dishes.map((dish: Dish) => (
                        <li className="navigation-item">
                            <span>
                                <Link className="list-item" to={`/dishes/${dish.id}/`}>{dish.name}</Link>
                            </span>
                        </li>)) :
                        <li>Loading...</li>
                    }
                    </ul>
                    <p className="second-paragraph">
                        <Link className="list-item" to="/ranking">フードランキング</Link>
                    </p>
                </div>
                <Footer />
            </>
        )
    }
}

export default HomePage
