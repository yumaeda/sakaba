/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Restaurant } from '@yumaeda/sakaba-interface'
import ImageViewer from 'react-simple-image-viewer'
import Photo from '../interfaces/Photo'
import Video from '../interfaces/Video'
import Address from './Address'
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
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [videos, setVideos] = React.useState<Video[]>()
    const newApiUrl = 'https://api.tokyo-dinner.com'
    const [ imageUrls, setImageUrls ] = React.useState<string[]>([])
    const [ imageIndex, setImageIndex ] = React.useState<number>(0)
    const [ isViewerOpen, setIsViewerOpen ] = React.useState<boolean>(false)
    const [ showAllRestaurants, setShowAllRestaurants ] = React.useState<boolean>(false)
    const imageBasePath = 'https://d1ds2m6k69pml3.cloudfront.net'
    const imageDir = `${imageBasePath}/images`

    const closeImageViewer = () => {
        setImageUrls([])
        setImageIndex(0)
        setIsViewerOpen(false)
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

    React.useEffect(() => {
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

        setShowAllRestaurants(localStorage.getItem('hideClosedRestaurants') != "1" ?? false)
    }, [])

    return (
        <ul className="shop-list">
        {restaurants ? restaurants
            .filter((restaurant: Restaurant) => (showAllRestaurants || (restaurant.isOpen == 1 && Number(restaurant.distance) < 5)))
            .map((openRestaurant: Restaurant) => {
            const restaurantId = openRestaurant.id
            return (
            <li className="shop-item" key={restaurantId} id={restaurantId}>
                <div className="shop-item-grid">
                    <span className="shop-genre">{openRestaurant.genre}</span>
                    <h4 className="shop-name-wrapper">
                        <RestaurantPageLink id={restaurantId} area={openRestaurant.area} url={openRestaurant.url} name={openRestaurant.name} />
                    </h4>
                </div>
                <DishPhotoList
                    openImageViewer={openImageViewer}
                    basePath={imageBasePath}
                    restaurantId={restaurantId}
                    photos={ photos ? photos.filter((photo: Photo) => photo.restaurant_id == restaurantId) : null }
                />
                <div className="shop-info">
                    <OpenHours businessDayJson={openRestaurant.businessDayInfo} />
                    <span className="distance">{ `${Number(openRestaurant.distance).toFixed(2)} km` }</span>
                    <Address text={openRestaurant.address} latitude={openRestaurant.latitude} longitude={openRestaurant.longitude} />
                    <PhoneNumber tel={openRestaurant.tel} />
                </div>
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
