/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'
import camelcaseKeys = require('camelcase-keys')
import Photo from '../../interfaces/Photo'
import Video from '../../interfaces/Video'
import Address from '../Address'
import Distance from '../Distance'
import PhoneNumber from '../PhoneNumber'
import RestaurantPageLink from '../RestaurantPageLink'
import DishPhotoList from '../DishPhotoList'
import RestaurantVideoList from '../RestaurantVideoList'
import OpenHours from '../OpenHours'
import AreaDictionary from '../../AreaDictionary'
import Footer from '../Footer'

const AreaPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [ latitude, setLatitude] = React.useState<number>(0)
    const [longitude, setLongitude] = React.useState<number>(0)
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()
    const [photos, setPhotos] = React.useState<Photo[]>()
    const [videos, setVideos] = React.useState<Video[]>()
    const areaName = AreaDictionary[match.params.area]
    const apiUrl = 'https://api.sakaba.link'

    const getCurrentPosition = (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }

    const handleGeolocationError = (error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert(`PERMISSION_DENIED: ${error.message}`)
                break
            case error.POSITION_UNAVAILABLE:
                alert(`POSITION_UNAVAILABLE: ${error.message}`)
                break
            case error.TIMEOUT:
                alert(`TIMEOUT: ${error.message}`)
                break
            default:
                alert('Unknown Error')
        }
    }

    React.useEffect(() => {
        document.title = `${areaName}｜酒場リンク`

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                getCurrentPosition,
                handleGeolocationError,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            )
        }

        fetch(`${apiUrl}/restaurants`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurants(
                    camelcaseKeys(JSON.parse(data.body)
                        .filter((restaurant: Restaurant) => restaurant.area == match.params.area)
                    )
                )
            },
            (error: Error) => {
                setError(error)
            }
        )

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

        fetch(`${apiUrl}/videos`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setVideos(JSON.parse(data.body))
            },
            (error: Error) => {
                setError(error)
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const basePath = 'https://sakaba.link'
        const imageBasePath = 'https://tokyo-takeout.com'
        const imageDir = `${imageBasePath}/images`

        return (
            <>
                <header className="header">
                    <a href={`${basePath}/`}>
                        <picture>
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <h1 className="header-label">{areaName}</h1>
                </header>
                <div className="contents">
                    <ul className="shop-list">
                    {restaurants ? restaurants.map((restaurant: Restaurant) => {
                        const restaurantId = atob(restaurant.id)
                        return (
                        <li className="shop-item" key={restaurantId} id={restaurantId}>
                            <div className="shop-item-photo">
                                <Address text={restaurant.address} latitude={restaurant.latitude} longitude={restaurant.longitude} />
                                <PhoneNumber tel={restaurant.tel} />
                                <Distance from={{ latitude, longitude }} to={{ latitude: Number(restaurant.latitude), longitude: Number(restaurant.longitude) }} />
                            </div>
                            <div className="shop-item-grid">
                                <h4>
                                    <RestaurantPageLink id={restaurantId} area={restaurant.area} url={restaurant.url} name={restaurant.name} /><br />
                                    <div className="shop-genre">{restaurant.genre}</div>
                                </h4>
                                <OpenHours businessDayJson={restaurant.businessDayInfo} />
                            </div>
                            <DishPhotoList
                                basePath={imageBasePath}
                                restaurantId={restaurantId}
                                photos={ photos ? photos.filter((photo: Photo) => atob(photo.restaurant_id) == restaurantId) : null }
                            />
                            <RestaurantVideoList
                                videos={ videos ? videos.filter((video: Video) => atob(video.restaurant_id) == restaurantId) : null }
                            />
                        </li>
                        )}) : <div>Loading...</div>}
                    </ul>
                </div> 
                <Footer />
            </>
        )
    }
}

export default AreaPage
