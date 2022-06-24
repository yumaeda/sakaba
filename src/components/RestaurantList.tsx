/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'
import ImageViewer from 'react-simple-image-viewer'
import Photo from '../interfaces/Photo'
import Video from '../interfaces/Video'
import Address from './Address'
import Distance from './Distance'
import PhoneNumber from './PhoneNumber'
import RestaurantPageLink from './RestaurantPageLink'
import DishPhotoList from './DishPhotoList'
import RestaurantVideoList from './RestaurantVideoList'
import OpenHours from './OpenHours'

interface Props {
    restaurants: Restaurant[]
}

const RestaurantList: React.FC<Props> = (props) => {
    const { restaurants } = props
    const [latitude, setLatitude] = React.useState<number>(0)
    const [longitude, setLongitude] = React.useState<number>(0)
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [videos, setVideos] = React.useState<Video[]>()
    const newApiUrl = 'https://api.tokyo-dinner.com'
    const [ imageUrls, setImageUrls ] = React.useState<string[]>([])
    const [ imageIndex, setImageIndex ] = React.useState<number>(0)
    const [ isViewerOpen, setIsViewerOpen ] = React.useState<boolean>(false)
    const imageBasePath = 'https://tokyo-takeout.com'
    const imageDir = `${imageBasePath}/images`

    const closeImageViewer = () => {
        setImageUrls([])
        setImageIndex(0)
        setIsViewerOpen(false)
    }

    const getCurrentPosition = (position: GeolocationPosition) => {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
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
        {restaurants ? restaurants.map((restaurant: Restaurant) => {
            const restaurantId = restaurant.id
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
