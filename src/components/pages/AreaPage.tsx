/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Restaurant {
    id: string
    area: string
    url: string
    image_name: string
    name: string
    genre: string
    tel: string
    open_hours: string
    address: string
    comment: string
    takeout_available: number
}

interface Photo {
    restaurant_id: string
    image: string
    image_webp: string
    thumbnail: string
    thumbnail_webp: string
}

const AreaPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()
    const [photos, setPhotos] = React.useState<Photo[]>()

    const areaDictionary : { [id: string]: string } = {
        'ikebukuro': '池袋',
        'itabashi': '板橋',
        'kagurazaka': '神楽坂',
        'kanda': '神田',
        'kyodo': '経堂',
        'meguro': '目黒',
        'nakaitabashi': '中板橋',
        'otsuka': '大塚',
        'oyama': '大山',
        'shibuya': '渋谷'
    }

    React.useEffect(() => {
        fetch('/api-key.txt')
            .then((r) => r.text())
            .then(text  => {
                fetch('https://api.tokyo-takeout.com/restaurants', {
                    headers: { 'X-Api-Key': text }
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

                fetch('https://api.tokyo-takeout.com/photos', {
                    headers: { 'X-Api-Key': text }
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
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const basePath = 'https://tokyo-takeout.com'
        const defaultImage = 'image-not-available'
        const areaName = areaDictionary[match.params.area]
        const imageDir = `${basePath}/images`

        return (
            <>
                <header className="header">
                    <h1 className="header-label">{`${areaName}のお店`}</h1>
                    <a href={`${basePath}/`}>Back</a>
                </header>
                <div className="contents">
                    <p>
                        ※ テイクアウトの情報は、頻繁に変わる事が予想されます。<br />
                        以下の情報に誤りがある場合には<a href="mailto:support@tokyo-takeout.com">support@tokyo-takeout.com</a>までお知らせください。
                    </p>
                    <ul className="shop-list">
                    {restaurants ? restaurants.map((restaurant: Restaurant, index: number) => {
                        const restaurantId = atob(restaurant.id)
                        const restaurantImageDir = `${basePath}/images/restaurants/${restaurantId}`
                        return (
                        <li className="shop-item" key={index}>
                            <div className="shop-item-grid">
                                <a href={restaurant.image_name != '' ? `${restaurantImageDir}/${restaurant.image_name}.png` : `${imageDir}/${defaultImage}.png`} target="_blank">
                                    <picture>
                                        <source type="image/webp" media="(min-width: 150px)" srcSet={restaurant.image_name != '' ? `${restaurantImageDir}/${restaurant.image_name}_thumbnail.webp` : `${imageDir}/${defaultImage}_thumbnail.webp`} />
                                        <img src={restaurant.image_name != '' ? `${restaurantImageDir}/${restaurant.image_name}_thumbnail.png` : `${imageDir}/${defaultImage}_thumbnail.png`} className="shop-image" alt={restaurant.name} />
                                    </picture>
                                </a>
                            </div>
                            <div className="shop-item-grid">
                                <h4>
                                    <span className="shop-takeout">{restaurant.takeout_available ? 'テイクアウトあり' : 'イートインのみ'}</span><br />
                                    <a href={restaurant.url} rel="nofollow noopener" target="_blank">{restaurant.name}</a><br />
                                    <span className="shop-genre">{restaurant.genre}</span>
                                </h4>
                                <p>
                                    <span>{restaurant.address}</span><br />
                                    <span>{restaurant.open_hours}</span><br />
                                    <a href={`tel:${restaurant.tel}`}>{restaurant.tel}</a>
                                </p>
                            </div>
                            <div className="dish-image-container">
                            { photos ? photos
                                .filter((photo: Photo) => photo.restaurant_id == restaurant.id)
                                .map((photo: Photo, index: number) => (
                                    <a href={`${restaurantImageDir}/${photo.image}`} target="_blank" key={`${restaurantId}_${index}`}>
                                        <picture>
                                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${restaurantImageDir}/${photo.thumbnail_webp}`} />
                                            <img src={`${restaurantImageDir}/${photo.thumbnail}`} className="dish-image" alt={`店舗写真${index}`} />
                                        </picture>
                                    </a>
                                )) : ''
                            }
                            </div>
                        </li>
                        )}) : <div>Loading...</div>}
                    </ul>
                </div> 
                <footer className="footer">&copy; 2020 東京テイクアウト</footer>
            </>
        )
    }
}

export default AreaPage
