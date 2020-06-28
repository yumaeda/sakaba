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
        'ikebukuro': '池袋',
        'kagurazaka': '神楽坂',
        'kanda': '神田',
        'kyodo': '経堂',
        'meguro': '目黒',
        'shibuya': '渋谷'
    }
    const shops : { [id: string]: Shop[] } = {
        'ikebukuro': [
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13132635/',
                image_name: 'WineboxBarco',
                name: 'Winebox Barco（ワインボックス　バルコ）',
                genre: 'バル・バール、イタリアン、ワインバー',
                tel: '03-6907-0308',
                open_hours: '11:30〜19:30（売り切り次第終了）',
                address: '東京都豊島区東池袋１-３３-４ ニュー池袋ハイツ１F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13122386/',
                image_name: '%E6%BA%90MOTO',
                name: '源MOTO',
                genre: '串揚げ・串かつ、居酒屋、ワインバー',
                tel: '050-5570-4730',
                open_hours: '11:00〜20:00',
                address: '東京都豊島区南池袋2-11-5 三栖ビル1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13036573/',
                image_name: 'Sushi-kazu-Ikebukuro',
                name: '寿し和 池袋店 （すしかず）',
                genre: '寿司、日本酒バー、居酒屋',
                tel: '050-5570-5864',
                open_hours: '11:30~20:00(LO19:30)',
                address: '東京都豊島区池袋2-10-8',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13206662/',
                image_name: '秀屋',
                name: '秀屋 （ひでや）',
                genre: '居酒屋、焼鳥',
                tel: '???',
                open_hours: '',
                address: '東京都豊島区池袋4-21-13',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13055100/',
                image_name: 'ひまわり亭',
                name: 'ひまわり亭',
                genre: 'ステーキ、ハンバーグ、コロッケ・フライ',
                tel: '03-3980-5387',
                open_hours: '',
                address: '東京都豊島区東池袋4‐3‐4 MHC第5ビル　1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13127050/',
                image_name: 'アガリコオリエンタルビストロ',
                name: 'アガリコオリエンタルビストロ',
                genre: 'タイ料理、ビストロ、居酒屋',
                tel: '03-3590-3170',
                open_hours: '11:00〜20:00',
                address: '東京都豊島区池袋2-10-6 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13241860/',
                image_name: 'Lab89_1st',
                name: 'Lab89 1st',
                genre: 'イタリアン、イノベーティブ・フュージョン、バー・お酒（その他）',
                tel: '03-5924-6448',
                open_hours: '12:00~20:00',
                address: '東京都豊島区西池袋3-25-11 CIC池袋ビル B1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13166174/',
                image_name: '',
                name: 'BEER&BURGER DARCY\'S',
                genre: 'ハンバーガー、ビアバー、パブ',
                tel: '03-5927-8791',
                open_hours: '',
                address: '東京都豊島区南池袋2-24-1 八大ビル　 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1322/A132201/13079312/',
                image_name: '',
                name: '魚じん',
                genre: '魚介料理・海鮮料理、割烹・小料理',
                tel: '03-3910-8215',
                open_hours: '11:30〜14:00, 18:00〜21:00',
                address: '東京都豊島区上池袋1-11-8',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1322/A132201/13105916/',
                image_name: '',
                name: '中華楼',
                genre: '中華料理',
                tel: '03-3916-9363',
                open_hours: '11:30～15:00, 18:00～?',
                address: '東京都豊島区上池袋3-1-28',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13206481/',
                image_name: '',
                name: '鮨 てつ也',
                genre: '寿司、魚介料理・海鮮料理',
                tel: '03-5985-4201',
                open_hours: '13:00〜19:00',
                address: '東京都豊島区池袋2-63-6 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13126338/',
                image_name: '',
                name: 'Ale House（エールハウス）',
                genre: 'ビアバー、バー、ダイニングバー',
                tel: '050-5456-7958',
                open_hours: '14:00〜20:00',
                address: '東京都豊島区西池袋1-16-8 山口ビル B1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13179511/',
                image_name: '',
                name: 'Bar CONCERTO（バー コンチェルト）',
                genre: 'バー、洋食、パスタ',
                tel: '03-6869-2900',
                open_hours: '12:00〜?',
                address: '東京都豊島区池袋2-39-10 池袋倉田ビル 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13064570/',
                image_name: '',
                name: '鳥定',
                genre: '焼鳥、居酒屋',
                tel: '03-3987-7806',
                open_hours: '',
                address: '東京都豊島区南池袋1-21-4',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13243685/',
                image_name: '',
                name: 'トラットリア クアルト 池袋',
                genre: 'イタリアン、ステーキ、パスタ',
                tel: '050-5456-8424',
                open_hours: '11:30～21:00',
                address: '東京都豊島区南池袋2-26-10 アクティオーレ南池袋 4F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13186758/',
                image_name: '',
                name: 'ひなたや',
                genre: '居酒屋、魚介料理・海鮮料理、焼鳥',
                tel: '03-5927-8049',
                open_hours: '12:00〜14:00(L.O　13：45)　17:00～22:00(L.O料理21:00　飲物21:30)',
                address: '東京都豊島区池袋2-30-13 サブコート B1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13029943/',
                image_name: '',
                name: 'ウナボルタ （Una Volta）',
                genre: 'イタリアン',
                tel: '03-3987-6520',
                open_hours: '',
                address: '東京都豊島区南池袋2-19-4 池袋大木ビル 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13021181/',
                image_name: '',
                name: 'バッカス',
                genre: '居酒屋',
                tel: '03-3985-5624',
                open_hours: '',
                address: '東京都豊島区南池袋1-27-8 サンパレスビル B1',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13146933/',
                image_name: '',
                name: 'お好み焼き 山小屋',
                genre: 'お好み焼き、もんじゃ焼き、居酒屋',
                tel: '050-5869-1873',
                open_hours: '11:30-15:00(L.O), 17:00-22:30(L.O)',
                address: '東京都豊島区西池袋1-2-3 Ark Ikebukuro 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13234345/',
                image_name: '',
                name: '鍋料理・サムギョプサル専門店 なっさむ',
                genre: '韓国料理、鍋（その他）、居酒屋',
                tel: '050-5597-3713',
                open_hours: '12:00～20:00',
                address: '東京都豊島区東池袋1-27-5 関口ビル 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13173276/',
                image_name: '',
                name: '正しい晩ごはん 白-はく-',
                genre: '割烹・小料理、居酒屋、和食（その他）',
                tel: '050-5570-6079',
                open_hours: '電話受付　10:30-19:00, 受け渡し　11:30-20:00',
                address: '東京都豊島区南池袋1-17-13 ゴールデンプラザ　9Ｆ',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13245037/',
                image_name: '',
                name: '仏蘭西料理 やおら料理店 ',
                genre: 'フレンチ、ビストロ',
                tel: '03-5927-9601',
                open_hours: '',
                address: '東京都豊島区池袋2-63-6 パレスガーデンミラノ 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13242595/',
                image_name: '',
                name: 'Rapport（ラポール）',
                genre: 'ビストロ、イタリアン、ワインバー',
                tel: '050-5456-5083',
                open_hours: '',
                address: '東京都豊島区西池袋5-1-10 第一矢島ビル 1F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13008944/',
                image_name: '',
                name: 'ブーミン（BOOMIN）',
                genre: '豚料理、創作料理、ワインバー',
                tel: '050-5594-8449',
                open_hours: '14:00〜20:00（定休日　火）',
                address: '東京都豊島区池袋2-49-12 ナカイチビル　１Ｆ',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1322/A132201/13228142/',
                image_name: '',
                name: '酒処 TRio（トリオ）',
                genre: '居酒屋、鳥料理、創作料理',
                tel: '050-5596-6836',
                open_hours: '［月〜土］17:00〜23:30(L.O), ［日曜日］定休日',
                address: '東京都豊島区池袋4-26-11 中本ビル 101',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13137623/',
                image_name: '',
                name: 'the life table 池袋店',
                genre: 'ダイニングバー、イタリアン、居酒屋',
                tel: '050-5868-1654',
                open_hours: '11:30～14:30',
                address: '東京都豊島区南池袋1-22-2 FLCビル 8F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13214273/',
                image_name: '',
                name: '池袋 鉄板焼 焔 （エン）',
                genre: '鉄板焼き、ステーキ、魚介料理・海鮮料理',
                tel: '050-5594-5796',
                open_hours: '',
                address: '東京都豊島区池袋2-4-3 江戸半第3パレス 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13162206/',
                image_name: '',
                name: 'タンテ グラッツィェ （Tante Gｒazie）',
                genre: 'イタリアン、パスタ、ワインバー',
                tel: '050-5570-4782',
                open_hours: '[火～日]　ランチ　11:30～14:30(L.O), [火～日]　ディナー17:30～20:00(L.O)',
                address: '東京都豊島区西池袋5-3-2 フラットウェル西池袋 1F～4F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13172063/',
                image_name: '',
                name: '残心',
                genre: '居酒屋、鍋（その他）、魚介料理・海鮮料理',
                tel: '03-6907-0310',
                open_hours: '',
                address: '東京都豊島区南池袋2-26-10 アクティオーレ南池袋 　3F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13179269/',
                image_name: '',
                name: '肉バル Bar&Grill motto 池袋 （肉バル バー&グリル motto）',
                genre: 'ダイニングバー、バル・バール、イタリアン',
                tel: '050-5589-7296',
                open_hours: '[月～土]11:30～14:00, 17:00～22:00(L.O)',
                address: '東京都豊島区東池袋1-39-20 慶太ビル 2F',
                comment: ''
            },
            {
                url: 'https://tabelog.com/tokyo/A1305/A130501/13170124/',
                image_name: '',
                name: 'カレーうどん ひかり TOKYO',
                genre: '居酒屋、創作料理、カレーうどん',
                tel: '03-5954-5608',
                open_hours: '',
                address: '東京都豊島区西池袋3-22-8 パークサイドフキビル B1F 岸野宅',
                comment: ''
            }
        ],
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
