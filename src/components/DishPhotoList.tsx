/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { FixedSizeList } from 'react-window'
import Photo from '../interfaces/Photo'

interface Props {
    basePath: string
    restaurantId: string
    photos?: Photo[]
}

interface ColumnStyle {
    index: number
    style: React.CSSProperties
}

const Column: React.FC<ColumnStyle> = (props) => {
    const { index, style } = props

    return <div style={style}>Column {index}</div>
}

const DishPhotoList: React.FC<Props> = (props) => {
    const { basePath, restaurantId, photos } = props
    const restaurantImageDir = `${basePath}/images/restaurants/${restaurantId}`

    return (
        <>
        <div className="dish-image-container">
        {
            photos ? photos
                .filter((photo: Photo) => atob(photo.restaurant_id) == restaurantId)
                .map((photo: Photo, index: number) => (
                    <div className="dish-image-wrapper">
                        <a href={`${restaurantImageDir}/${photo.image}`} target="_blank" key={`${restaurantId}_${index}`}>
                            <picture>
                                <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                                <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="dish-image" alt={`店舗写真${index}`} />
                            </picture>
                        </a>
                    </div>
                )) : ''
        }
        </div>
        <FixedSizeList
            height={150}
            itemCount={photos ? photos.length : 0}
            itemSize={200}
            layout='horizontal'
            width={600}>
            {Column}
        </FixedSizeList>
        </>
    )
}

export default DishPhotoList
