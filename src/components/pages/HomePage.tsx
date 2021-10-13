/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
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
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [restaurantInfos, setRestaurantInfos] = React.useState<RestaurantInfo[]>()
    const [error, setError] = React.useState<Error>()
    const apiUrl = 'https://api.sakaba.link'
    const imageBasePath = 'https://tokyo-takeout.com'

    React.useEffect(() => {
        fetch(`${apiUrl}/photos`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setPhotos(JSON.parse(data.body))
            },
            (error: Error) => {
                setError(error)
            }
        )

        fetch('https://api.sakaba.link/restaurant-counts', {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurantInfos(JSON.parse(data.body))
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
                    <ul className="town-list">
                    { restaurantInfos ? restaurantInfos.map((info: RestaurantInfo) => (
                        <li className="town-item">
                            <span className="town-button">
                                <Link className="list-item" to={`/${info.area}/`}>{`${AreaDictionary[info.area]} (${info.count})`}</Link>
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
