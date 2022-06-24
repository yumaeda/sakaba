/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'
import ImageViewer from 'react-simple-image-viewer'
import Geolocation from '../interfaces/Geolocation'
import Photo from '../interfaces/Photo'
import Video from '../interfaces/Video'
import { getDistance } from '../utils/GeoLocationUtility'
import Address from './Address'
import DishPhotoList from './DishPhotoList'
import OpenHours from './OpenHours'
import PhoneNumber from './PhoneNumber'
import RestaurantPageLink from './RestaurantPageLink'
import RestaurantVideoList from './RestaurantVideoList'

interface GeolocationRestaurant extends Restaurant {
    distance: number
}

interface Props {
    restaurants: Restaurant[]
    sortByDistance: boolean
}

const RestaurantList: React.FC<Props> = (props) => {
    const { restaurants, sortByDistance } = props
    const [geolocationRestaurants, setGeolocationRestaurants] = React.useState<GeolocationRestaurant[]>([])
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [videos, setVideos] = React.useState<Video[]>()
    const newApiUrl = 'https://api.tokyo-dinner.com'
    const [imageUrls, setImageUrls] = React.useState<string[]>([])
    const [imageIndex, setImageIndex] = React.useState<number>(0)
    const [isViewerOpen, setIsViewerOpen] = React.useState<boolean>(false)
    const imageBasePath = 'https://tokyo-takeout.com'
    const imageDir = `${imageBasePath}/images`

    const closeImageViewer = () => {
        setImageUrls([])
        setImageIndex(0)
        setIsViewerOpen(false)
    }

    const getCurrentPosition = (position: GeolocationPosition) => {
        const from: Geolocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        const tmpRestaurants: GeolocationRestaurant[] = restaurants.map((restaurant: Restaurant) => {
            return {
                ...restaurant,
                distance: getDistance(from, {
                    latitude: Number(restaurant.latitude),
                    longitude: Number(restaurant.longitude)
                })
            }
        })

        if (sortByDistance) {
            tmpRestaurants.sort((lhs, rhs) => (lhs.distance > rhs.distance) ? 1 : ((rhs.distance > lhs.distance) ? -1 : 0))
        }
        setGeolocationRestaurants(tmpRestaurants)
    }

    const openImageViewer = (restaurantId: string, index: number) => {
        const restaurantImageDir = `${imageDir}/restaurants/${restaurantId}`
        const tmpImageUrls = photos
            .filter((photo: Photo) => photo.restaurant_id == restaurantId)
            .map((photo: Photo) => `${restaurantImageDir}/${photo.image}`)
        setImageUrls(tmpImageUrls)
        setImageIndex(index)
        setIsViewerOpen(true)
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

        fetch(`${newApiUrl}/photos/`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setPhotos(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                console.error(error)
            }
        )

        fetch(`${newApiUrl}/videos/`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setVideos(JSON.parse(JSON.stringify(data.body)))
            },
            (error: Error) => {
                console.error(error)
            }
        )
    }, [])

    return (
        <ul className="shop-list">
        {geolocationRestaurants ? geolocationRestaurants.map((restaurant: GeolocationRestaurant) => {
            const restaurantId = restaurant.id
            return (
            <li className="shop-item" key={restaurantId} id={restaurantId}>
                <div className="shop-item-photo">
                    <Address text={restaurant.address} latitude={restaurant.latitude} longitude={restaurant.longitude} />
                    <PhoneNumber tel={restaurant.tel} />
                    <p className="distance">{ `${restaurant.distance.toFixed(2)} km` }</p>
                </div>
                <div className="shop-item-grid">
                    <h4>
                        <RestaurantPageLink id={restaurantId} area={restaurant.area} url={restaurant.url} name={restaurant.name} /><br />
                        <div className="shop-genre">{restaurant.genre}</div>
                    </h4>
                    <OpenHours businessDayJson={restaurant.businessDayInfo} />
                </div>
                <DishPhotoList
                    openImageViewer={openImageViewer}
                    basePath={imageBasePath}
                    restaurantId={restaurantId}
                    photos={ photos ? photos.filter((photo: Photo) => photo.restaurant_id == restaurantId) : null }
                />
                <RestaurantVideoList
                    videos={ videos ? videos.filter((video: Video) => video.restaurant_id == restaurantId) : null }
                />
            </li>
            )}) : <div>Loading...</div>}
            { isViewerOpen &&
                <ImageViewer
                    src={ imageUrls }
                    currentIndex={ imageIndex }
                    disableScroll={ false }
                    closeOnClickOutside={ true }
                    onClose={ closeImageViewer } />
            }
        </ul>
    )
}

export default RestaurantList
