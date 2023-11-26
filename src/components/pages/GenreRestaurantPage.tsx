/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { getPosition, handleGeolocationError } from '../../utils/GeoLocationUtility'
import Genre from '../../interfaces/Genre'
import RestaurantList from '../RestaurantList'
import Footer from '../Footer'

const GenreRestaurantPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [genre, setGenre] = React.useState<Genre>({name: '', id: 0})
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const apiUrl = 'https://api.sakabas.com'
    const basePath = 'https://sakabas.com'
    const imageBasePath = 'https://d1ds2m6k69pml3.cloudfront.net'
    const imageDir = `${imageBasePath}/images`

    React.useEffect(() => {
        getPosition({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
            .then((position: GeolocationPosition) => {
                fetch(`${apiUrl}/restaurants/genres/${params.id}/${position.coords.latitude}/${position.coords.longitude}`, {
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

        fetch(`${apiUrl}/genres/${params.id}`, { headers: {} })
            .then(res => res.json())
            .then((data) => {
                setGenre(JSON.parse(JSON.stringify(data.body)))
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
                        <picture className="back-image-container">
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <p className="header-label">{genre.name}</p>
                </header>
                <div className="contents">
                    <RestaurantList restaurants={restaurants} />
                </div> 
                <Footer />
            </>
        )
    }
}

export default GenreRestaurantPage
