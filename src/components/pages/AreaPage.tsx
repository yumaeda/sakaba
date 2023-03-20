/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import { getPosition, handleGeolocationError } from '../../utils/GeoLocationUtility'
import RestaurantList from '../RestaurantList'
import Footer from '../Footer'

const AreaPage: React.FC = () => {
    const params = useParams()
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const area = params.area || ''
    const newApiUrl = 'https://api.tokyo-dinner.com'
    const basePath = 'https://sakaba.link'
    const imageBasePath = 'https://tokyo-takeout.com'
    const imageDir = `${imageBasePath}/images`

    React.useEffect(() => {
        document.title = `${area}｜酒場リンク`

        getPosition({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        })
            .then((position: GeolocationPosition) => {
                fetch(`${newApiUrl}/restaurants/areas/${area}/${position.coords.latitude}/${position.coords.longitude}`, {
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
                    <p className="header-label">{area}</p>
                </header>
                <div className="contents">
                    <RestaurantList restaurants={restaurants} />
                </div> 
                <Footer />
            </>
        )
    }
}

export default AreaPage
