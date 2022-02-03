/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Genre from '../../interfaces/Genre'
import Photo from '../../interfaces/Photo'
import { Link } from 'react-router-dom'
import AreaDictionary from '../../AreaDictionary'
import Footer from '../Footer'
import LatestPhotoList from '../LatestPhotoList'

interface RestaurantInfo {
    area: string
    count: number
}
 
const HomePage: React.FC<{}> = () => {
    const [genres, setGenres] = React.useState<Genre[]>([])
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [restaurantInfos, setRestaurantInfos] = React.useState<RestaurantInfo[]>()
    const [error, setError] = React.useState<Error>()
    const apiBasePath = 'https://api.tokyo-dinner.com'
    const imageBasePath = 'https://tokyo-takeout.com'

    React.useEffect(() => {
        fetch(`${apiBasePath}/genres/`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setGenres(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch(`${apiBasePath}/photos/`, {
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
                    <h1 className="header-label">酒場リンク</h1>
                </header>
                <div className="contents">
                    <LatestPhotoList basePath={imageBasePath} photos={photos} />
                    <h4 className="navigation-label">Area</h4>
                    <ul className="navigation-list">
                    { restaurantInfos ? restaurantInfos.map((info: RestaurantInfo) => (
                        <li className="navigation-item">
                            <span className="navigation-button">
                                <Link className="list-item" to={`/${info.area}/`}>{`${AreaDictionary[info.area]} (${info.count})`}</Link>
                            </span>
                        </li>)) :
                        <li>Loading...</li>
                    }
                    </ul>
                    <h4 className="navigation-label">Genre</h4>
                    <ul className="navigation-list">
                    { genres ? genres.map((genre: Genre) => (
                        <li className="navigation-item">
                            <span className="navigation-button">
                                <Link className="list-item" to={`/genres/${genre.id}/`}>{genre.name}</Link>
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
