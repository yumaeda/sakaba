/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Shop {
    url: string
    image_name: string
    name: string
    genre: string
    tel: string
    open_hours: string
    address: string
    comment: string
}

const AreaPage: React.FC<{ match: any }> = (props) => {
    const areaDictionary : { [id: string]: string } = {
        'kagurazaka': '神楽坂',
        'kanda': '神田',
        'kyodo': '経堂',
        'meguro': '目黒',
        'shibuya': '渋谷'
    }
    const shops : { [id: string]: Shop[] } = {
        'kagurazaka': [
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13135158/',
                image_name: 'ザ・ロイヤルスコッツマン',
                name: 'The Royal Scotsman（ザ・ロイヤルスコッツマン）',
                genre: 'パブ、バル・バール、ダイニングバー',
                tel: '03-6280-8852',
                open_hours: '12:00〜19:00',
                address: '東京都新宿区神楽坂3-6-28 土屋ビル',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13025251/',
                image_name: '',
                name: 'ラ・マティエール',
                genre: 'フレンチ',
                tel: '03-3260-4778',
                open_hours: '',
                address: '東京都新宿区神楽坂6-29',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13164616/',
                image_name: '',
                name: '焼肉家 KAZU 神楽坂',
                genre: '焼肉、ホルモン、ダイニングバー',
                tel: '03-3268-5229',
                open_hours: '11:45〜15:00, 17:00〜20:00',
                address: '東京都新宿区神楽坂2-11-7 AYビル 1-N',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13023967/',
                image_name: '',
                name: 'インド料理 想いの木',
                genre: 'インド料理、インドカレー',
                tel: '03-3235-4277',
                open_hours: '',
                address: '東京都新宿区神楽坂5-22 KS神楽坂　 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13014763/',
                image_name: '',
                name: '和食や 神楽坂店',
                genre: '居酒屋、日本酒バー',
                tel: '050-5890-2944',
                open_hours: '月～土　11：00～20：00（19：00L.O）',
                address: '東京都新宿区神楽坂3-2-16 東新神楽坂エミナンス　２・３Ｆ',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13020373/',
                image_name: '',
                name: '広島お好み焼 くるみ',
                genre: 'お好み焼き、和食（その他）、居酒屋',
                tel: '03-3269-4456',
                open_hours: '',
                address: '東京都新宿区神楽坂5-30 イセヤビル　１Ｆ',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13118156/',
                image_name: '',
                name: 'アズーリ 神楽坂',
                genre: 'イタリアン、パスタ、ハンバーグ',
                tel: '050-3627-7684',
                open_hours: '11:30〜20:00',
                address: '東京都新宿区神楽坂3-4 AYビル 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1309/A130905/13242890/',
                image_name: '',
                name: '洋食ビストロ夕凪',
                genre: '洋食、ビストロ、居酒屋',
                tel: '050-5456-6013',
                open_hours: '[火～土]11:30~14:00(L.O13:45), 17:00~20:30(L.O20:00)<br>[日/祝]11:00~14:30(L.O14:00)',
                address: '東京都新宿区矢来町43',
                comment: ''
            }
        ],
        'kanda': [
            {
                url: 'https://tabelog.com/tokyo/A1310/A131002/13193128/',
                name: '土鍋ごはんと和酒の店 おてだま',
                image_name: '',
                genre: '居酒屋',
                tel: '03-3252-1277',
                open_hours: '17:00〜20:00',
                address: '東京都千代田区鍛冶町2-9-17 神田駅北口寿ビル 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1310/A131002/13183812/',
                name: 'エクリプス ファースト（Eclipse first）',
                image_name: '',
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
                image_name: '',
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
                image_name: '',
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
                image_name: '',
                genre: 'ワインバー、イタリアン、居酒屋',
                tel: '03-6416-5973',
                open_hours: '17:00〜??',
                address: '東京都渋谷区桜丘町30-9 桜丘芳和ビル B1',
                comment: '前菜盛り合わせ　¥1000〜\n温菜　¥500〜\n パスタ　¥1000\n メイン料理　¥1500〜\n\n になります。ご希望の方がいらっしゃれば私にメールかLINE、もしくはお店までお電話よろしくお願い申し上げます。ご近所の方でしたらデリバリーもいたします！'
            },
            {
                url: 'https://tabelog.com/tokyo/A1303/A130301/13157208/',
                name: 'とり茶太郎',
                image_name: '',
                genre: '焼鳥',
                tel: '03-6416-0364',
                open_hours: '17:00〜20:00',
                address: '東京都渋谷区鶯谷町7-12 TAKビル 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1303/A130301/13025563/',
                name: 'Wine Bar Cabotte（カボット）',
                image_name: '',
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
    const defaultImage = 'image-not-available'
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
                            <a href={shop.image_name != '' ? `${imageDir}/${shop.image_name}.png` : `${imageDir}/${defaultImage}.png`} target="_blank">
                                <picture>
                                    <source type="image/webp" media="(min-width: 150px)" srcSet={shop.image_name != '' ? `${imageDir}/${shop.image_name}_thumbnail.webp` : `${imageDir}/${defaultImage}_thumbnail.webp`} />
                                    <img src={shop.image_name != '' ? `${imageDir}/${shop.image_name}_thumbnail.png` : `${imageDir}/${defaultImage}_thumbnail.png`} className="shop-image" alt={shop.name} />
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
