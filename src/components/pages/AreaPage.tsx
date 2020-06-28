/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Shop {
    url: string
    name: string
    genre: string
    tel: string
    open_hours: string
    address: string
    comment: string
}

const AreaPage: React.FC<{ match: any }> = (props) => {
    const areaDictionary : { [id: string]: string } = {
        'kanda': '神田',
        'kyodo': '経堂',
        'meguro': '目黒',
        'shibuya': '渋谷'
    }
    const shops : { [id: string]: Shop[] } = {
        'kanda': [
            {
                url: 'https://tabelog.com/tokyo/A1310/A131002/13193128/',
                name: '土鍋ごはんと和酒の店 おてだま',
                genre: '居酒屋',
                tel: '03-3252-1277',
                open_hours: '17:00〜20:00',
                address: '東京都千代田区鍛冶町2-9-17 神田駅北口寿ビル 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1310/A131002/13183812/',
                name: 'エクリプス ファースト（Eclipse first）',
                genre: 'バー・お酒（その他）、バー',
                tel: '050-5589-2907',
                open_hours: '12:00〜20:00',
                address: '東京都千代田区鍛冶町2-7-10 廣瀬ビル 1F',
                comment: ''
            }

        ],
        'kyodo': [
            {
                url: 'https://tabelog.com/tokyo/A1318/A131813/13202831/',
                name: 'はしぐち亭',
                genre: '洋食、バル・バール',
                tel: '050-5594-7267',
                open_hours: '11:30〜20:00',
                address: '東京都世田谷区経堂1-11-13 ウエダビル１F',
                comment: ''
            }
        ],
        'meguro': [
            {
                url: 'https://order.takeme.com/app/shop/74f9ee6c-7cfa-46bd-80e6-25b5c4648a50',
                name: 'ONE THE DINER （ワンザダイナー）',
                genre: 'ダイニングバー、ステーキ、ハンバーガー',
                tel: '03-6455-7588',
                open_hours: '［月〜金］11：30〜23:00、［土日］11：30〜21:00',
                address: '東京都品川区上大崎1-1-14 ト-カン白金キャステ-ル 1F',
                comment: ''
            }
        ],
        'shibuya': [
            {
                url: 'https://tabelog.com/tokyo/A1303/A130301/13230194/',
                name: 'On The Wine（オン ザ ワイン）',
                genre: 'ワインバー、イタリアン、居酒屋',
                tel: '03-6416-5973',
                open_hours: '17:00〜??',
                address: '東京都渋谷区桜丘町30-9 桜丘芳和ビル B1',
                comment: '前菜盛り合わせ　¥1000〜\n温菜　¥500〜\n パスタ　¥1000\n メイン料理　¥1500〜\n\n になります。ご希望の方がいらっしゃれば私にメールかLINE、もしくはお店までお電話よろしくお願い申し上げます。ご近所の方でしたらデリバリーもいたします！'
            },
            {
                url: 'https://tabelog.com/tokyo/A1303/A130301/13157208/',
                name: 'とり茶太郎',
                genre: '焼鳥',
                tel: '03-6416-0364',
                open_hours: '17:00〜20:00',
                address: '東京都渋谷区鶯谷町7-12 TAKビル 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1303/A130301/13025563/',
                name: 'Wine Bar Cabotte（カボット）',
                genre: 'ワインバー、ビストロ',
                tel: '03-3462-7790',
                open_hours: '',
                address: '東京都渋谷区桜丘町12-5 Ｂ１Ｆ',
                comment: ''
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
