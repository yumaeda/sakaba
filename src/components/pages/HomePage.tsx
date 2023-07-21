/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Area from '../../interfaces/Area'
import Dish from '../../interfaces/Dish'
import Drink from '../../interfaces/Drink'
import Genre from '../../interfaces/Genre'
import Photo from '../../interfaces/Photo'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import LatestPhotoList from '../LatestPhotoList'

interface RestaurantInfo {
    area: string
    count: number
}
 
const HomePage: React.FC<{}> = () => {
    const [areaDict, setAreaDict] = React.useState<{ [area: string]: string }>({})
    const [dishes, setDishes] = React.useState<Dish[]>([])
    const [drinks, setDrinks] = React.useState<Drink[]>([])
    const [genres, setGenres] = React.useState<Genre[]>([])
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [restaurantInfos, setRestaurantInfos] = React.useState<RestaurantInfo[]>()
    const [error, setError] = React.useState<Error>()
    const apiBasePath = 'https://api.tokyo-dinner.com'
    const imageBasePath = 'https://d1ds2m6k69pml3.cloudfront.net'

    React.useEffect(() => {
        fetch(`${apiBasePath}/areas/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                const areas = JSON.parse(JSON.stringify(data.body))
                var tmpAreaDict: {[area: string]: string} = {}
                areas.forEach((area: Area) => {
                    tmpAreaDict[area.value] = area.name
                })
                setAreaDict(tmpAreaDict)
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiBasePath}/dishes/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDishes(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiBasePath}/drinks/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setDrinks(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiBasePath}/genres/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setGenres(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiBasePath}/latest-photos/`, {
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

        fetch(`${apiBasePath}/restaurant-counts/`, {
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
                    { restaurantInfos ? restaurantInfos.map((info: RestaurantInfo) => (
                        <li className="navigation-item">
                            <span>
                                <Link className="list-item" to={`/${info.area}/`}>{`${areaDict[info.area]}`}</Link>
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
