/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Photo from '../interfaces/Photo'

interface Props {
    basePath: string
    photos: Photo[] | null
}

const LatestPhotoList: React.FC<Props> = (props) => {
    const { basePath, photos } = props
    const photoCount = 20;

    return (
        <div className="latest-image-container">
        {
            photos?.slice(0, photoCount).map((photo: Photo, index: number) => (
                <div className="latest-image-wrapper">
                    <picture>
                        <source type="image/webp" media="(min-width: 150px)" srcSet={`${basePath}/images/restaurants/${window.atob(photo.restaurant_id)}/${photo.thumbnail_webp}`} />
                        <img src={`${basePath}/images/restaurants/${window.atob(photo.restaurant_id)}/${photo.thumbnail}`} alt={`店舗写真${index}`} />
                    </picture>
                </div>
            ))
        }
        </div>
    )
}

export default LatestPhotoList
