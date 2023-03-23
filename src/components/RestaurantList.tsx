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
    }, [])

    return (
        <ul className="shop-list">
        {restaurants ? restaurants.map((restaurant: Restaurant) => {
            const restaurantId = restaurant.id
            return (
            <li className="shop-item" key={restaurantId} id={restaurantId}>
                <div className="shop-item-grid">
                    <h4>
                        <RestaurantPageLink id={restaurantId} area={restaurant.area} url={restaurant.url} name={restaurant.name} /><br />
                        <div className="shop-genre">{restaurant.genre}</div>
                    </h4>
                    <OpenHours businessDayJson={restaurant.businessDayInfo} />
                    <span className="distance">{ `${Number(restaurant.distance).toFixed(2)} km` }</span>
                    <Address text={restaurant.address} latitude={restaurant.latitude} longitude={restaurant.longitude} />
                    <PhoneNumber tel={restaurant.tel} />
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
