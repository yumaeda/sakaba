/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Shop {
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

const AreaPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>();
    const [shops, setShops] = React.useState<Shop[]>([])

    const areaDictionary : { [id: string]: string } = {
        'ikebukuro': '池袋',
        'kagurazaka': '神楽坂',
        'kanda': '神田',
        'kyodo': '経堂',
        'meguro': '目黒',
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
                        setShops(JSON.parse(data.body).filter((shop: Shop) => shop.area == match.params.area))
                    },
                    (error: Error) => { setError(error); }
                )
            })
    }, [])
  
    if (error) {
        return <div>Error: {error.message}</div>;
    } else {
        const basePath = 'https://tokyo-takeout.com'
        const defaultImage = 'image-not-available'
        const imageDir = `${basePath}/images/${match.params.area}`
        const areaName = areaDictionary[match.params.area]

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
                    {shops ? shops.map((shop: Shop, index: number) => (
                        <li className="shop-item" key={index}>
                            <div className="shop-item-grid">
                                <a href={shop.image_name != '' ? `${imageDir}/${shop.image_name}.png` : `${imageDir}/${defaultImage}.png`} target="_blank">
                                    <picture>
                                        <source type="image/webp" media="(min-width: 150px)" srcSet={shop.image_name != '' ? `${imageDir}/${shop.image_name}_thumbnail.webp` : `${imageDir}/${defaultImage}_thumbnail.webp`} />
                                        <img src={shop.image_name != '' ? `${imageDir}/${shop.image_name}_thumbnail.png` : `${imageDir}/${defaultImage}_thumbnail.png`} className="shop-image" alt={shop.name} />
                                    </picture>
                                </a>
                            </div>
                            <div className="shop-item-grid">
                                <h4>
                                    <span className="shop-takeout">{shop.takeout_available ? 'テイクアウトあり' : 'イートインのみ'}</span>
                                    <a href={shop.url} rel="nofollow noopener" target="_blank">{shop.name}</a><br />
                                    <span className="shop-genre">{shop.genre}</span>
                                </h4>
                                <p>
                                    <span>{shop.address}</span><br />
                                    <span>{shop.open_hours}</span><br />
                                    <a href={`tel:${shop.tel}`}>{shop.tel}</a>
                                </p>
                            </div>
                        </li>
                    )) : <div>Loading...</div>}
                    </ul>
                </div> 
                <footer className="footer">&copy; 2020 東京テイクアウト</footer>
            </>
        )
    }
}

export default AreaPage
