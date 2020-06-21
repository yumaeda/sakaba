/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Shop {
    url: string
    name: string
    genre: string
    tel: string
    address: string
    open_hours: string
}

const AreaPage: React.FC<{ match: any }> = (props) => {
    const areaDictionary : { [id: string]: string } = {
        'kyodo': '経堂',
        'meguro': '目黒'
    }
    const shops : { [id: string]: Shop[] } = {
        'kyodo': [
            {
                url: 'https://tabelog.com/tokyo/A1318/A131813/13202831/',
                name: 'はしぐち亭',
                genre: '洋食、バル・バール',
                tel: '050-5594-7267',
                open_hours: '11:30〜20:00',
                address: '東京都世田谷区経堂1-11-13 ウエダビル１F'
            }
        ],
        'meguro': [
            {
                url: 'https://order.takeme.com/app/shop/74f9ee6c-7cfa-46bd-80e6-25b5c4648a50',
                name: 'ONE THE DINER （ワンザダイナー）',
                genre: 'ダイニングバー、ステーキ、ハンバーガー',
                tel: '03-6455-7588',
                address: '東京都品川区上大崎1-1-14 ト-カン白金キャステ-ル 1F',
                open_hours: '［月〜金］11：30〜23:00、［土日］11：30〜21:00'
            }
        ]
    }

    const { match } = props
    const basePath = 'https://tokyo-takeout.com'
    const imageDir = `${basePath}/images/${match.params.area}`
    const areaName = areaDictionary[match.params.area]

    return (
        <>
            <header className="header">
                <h1 className="header-label">{`${areaName}テイクアウト`}</h1>
                <a href={`${basePath}/`}>Back</a>
            </header>
            <div className="contents">
                <p>
                    ※ テイクアウトの情報は、頻繁に変わる事が予想されます。<br />
                    以下の情報に誤りがある場合には<a href="mailto:support@tokyo-takeout.com">support@tokyo-takeout.com</a>までお知らせください。
                </p>
                <ul className="shop-list">
                {shops[match.params.area].map((shop: Shop) => (
                    <li className="shop-item">
                        <div className="shop-item-grid">
                            <a href={`${imageDir}/image-not-available.png`} target="_blank">
                                <picture>
                                    <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/image-not-available_thumbnail.webp`} />
                                    <img src={`${imageDir}/image-not-available_thumbnail.png`} className="shop-image" alt={shop.name} />
                                </picture>
                            </a>
                        </div>
                        <div className="shop-item-grid">
                            <h4>
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
                ))}
                </ul>
            </div> 
            <footer className="footer">&copy; 2020 東京テイクアウト</footer>
        </>
    )
}

export default AreaPage
