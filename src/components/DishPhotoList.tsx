/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import ImageViewer from 'react-simple-image-viewer'
import { FixedSizeList } from 'react-window'
import Photo from '../interfaces/Photo'

interface Props {
    basePath: string
    restaurantId: string
}

interface ColumnProps {
    openImageViewer: (restaurantId: string, index: number) => void
    basePath: string
    restaurantId: string
    photos: Photo[] | null
}

interface ColumnStyle {
    index: number
    style: React.CSSProperties
    data: ColumnProps
}

const DishPhoto: React.FC<ColumnStyle> = (props) => {
    const { data, index, style } = props
    const restaurantImageDir = `${data.basePath}/images/restaurants/${data.restaurantId}`
    const photo = (data.photos && data.photos.length > index) ? data.photos[index] : null

    return photo ? (
        <div style={style} key={index}>
            <div className="dish-image-wrapper" onClick={ () => { data.openImageViewer(data.restaurantId, index) }}>
                <picture>
                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                    <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="tile-image dish-image" alt={`店舗写真${index}`} />
                </picture>
            </div>
        </div>
    ) : <div></div> 
}

const DishPhotoList: React.FC<Props> = (props) => {
    const apiUrl = 'https://api.sakabas.com'
    const { basePath, restaurantId } = props
    const [photos, setPhotos] = React.useState<Photo[]>([])
    const [ imageUrls, setImageUrls ] = React.useState<string[]>([])
    const [ imageIndex, setImageIndex ] = React.useState<number>(0)
    const [ isViewerOpen, setIsViewerOpen ] = React.useState<boolean>(false)
    const imageDir = `${basePath}/images`

    const openImageViewer = (restaurantId: string, index: number) => {
        const restaurantImageDir = `${imageDir}/restaurants/${restaurantId}`
        const tmpImageUrls = photos
            .filter((photo: Photo) => photo.restaurant_id == restaurantId)
            .map((photo: Photo) => `${restaurantImageDir}/${photo.image}`)
        setImageUrls(tmpImageUrls)
        setImageIndex(index)
        setIsViewerOpen(true)
    }

    const closeImageViewer = () => {
        setImageUrls([])
        setImageIndex(0)
        setIsViewerOpen(false)
    }

    React.useEffect(() => {
        fetch(`${apiUrl}/photos/${restaurantId}`, {
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
    }, [])

    return (
        <>
            <FixedSizeList
                height={85}
                itemCount={photos ? photos.length : 0}
                itemSize={100}
                layout="horizontal"
                width={window.innerWidth}
                itemData={{ openImageViewer, photos, restaurantId, basePath }}>
                {DishPhoto}
            </FixedSizeList>
            { isViewerOpen &&
                <ImageViewer
                    src={ imageUrls }
                    currentIndex={ imageIndex }
                    disableScroll={ false }
                    closeOnClickOutside={ true }
                    onClose={ closeImageViewer } />
            }
        </>
    )
}

export default DishPhotoList
