/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Photo from '../../interfaces/Photo'
import Video from '../../interfaces/Video'
import Restaurant from '../../interfaces/Restaurant'
import Address from '../Address'
import RestaurantPageLink from '../RestaurantPageLink'
import DishPhotoList from '../DishPhotoList'
import RestaurantVideoList from '../RestaurantVideoList'
import OpenHours from '../OpenHours'
import AreaDictionary from '../../AreaDictionary'
import Footer from '../Footer'

const AreaPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()
    const [photos, setPhotos] = React.useState<Photo[]>()
    const [videos, setVideos] = React.useState<Video[]>()
    const areaName = AreaDictionary[match.params.area]
    const apiUrl = 'https://api.sakaba.link'

    React.useEffect(() => {
        document.title = `${areaName}｜酒場リンク`
    }, [])

    React.useEffect(() => {
        fetch(`${apiUrl}/restaurants`, {
            headers: {}
        })
        .then(res => res.json())
        .then(
            (data) => {
                setRestaurants(JSON.parse(data.body).filter((restaurant: Restaurant) => restaurant.area == match.params.area))
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
        const defaultImage = 'image-not-available'
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
                        const restaurantImageDir = `${imageDir}/restaurants/${restaurantId}`
                        return (
                        <li className="shop-item" key={restaurantId} id={restaurantId}>
                            <div className="shop-item-photo">
                                <a href={restaurant.image_name != '' ? `${restaurantImageDir}/${restaurant.image_name}.png` : `${imageDir}/${defaultImage}.png`} target="_blank">
                                    <picture>
                                        <source type="image/webp" media="(min-width: 150px)" srcSet={restaurant.image_name != '' ? `${restaurantImageDir}/${restaurant.image_name}_thumbnail.webp` : `${imageDir}/${defaultImage}_thumbnail.webp`} />
                                        <img src={restaurant.image_name != '' ? `${restaurantImageDir}/${restaurant.image_name}_thumbnail.png` : `${imageDir}/${defaultImage}_thumbnail.png`} className="shop-image" alt={restaurant.name} />
                                    </picture>
                                </a><br />
                                <span className="shop-takeout">{restaurant.takeout_available ? 'テイクアウトあり' : 'イートインのみ'}</span>
                            </div>
                            <div className="shop-item-grid">
                                <h4>
                                    <RestaurantPageLink id={restaurantId} area={restaurant.area} url={restaurant.url} name={restaurant.name} /><br />
                                    <div className="shop-genre">{restaurant.genre}</div>
                                </h4>
                                <OpenHours businessDayJson={restaurant.business_day_info} />
                                <Address text={restaurant.address} latitude={restaurant.latitude} longitude={restaurant.longitude} />
                                <p className="shop-phone">
                                    <a className="phone-link" href={`tel:${restaurant.tel}`}>{restaurant.tel}</a>
                                </p>
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
