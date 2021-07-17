/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Restaurant from '../../interfaces/Restaurant'
import Footer from '../Footer'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const cocktailTypes = [
        { label: 'WINE BASE', type: 0 },
        { label: 'LIQUEUR BASE', type: 1 },
        { label: 'TEQUILA BASE', type: 2 },
        { label: 'BRANDY BASE', type: 3 },
        { label: 'WHISKY BASE', type: 4 },
        { label: 'GIN BASE', type: 5 },
        { label: 'VODKA BASE', type: 6 },
        { label: 'RUM BASE', type: 7 }
    ]

    const cocktails = [
        { name: 'Kir', nameJa: 'キール', price: 700, type: 0 },
        { name: 'Spritzer', nameJa: 'スプリッツアー', price: 700, type: 0 },
        { name: 'Kitty', nameJa: 'キティ', price: 700, type: 0 },
        { name: 'Kir Royal', nameJa: 'キール・ロワイヤル', price: 1200, type: 0 },
        { name: 'Kir Imperial', nameJa: 'キール・アンペリアル', price: 1200, type: 0 },
        { name: 'Champagne Blues', nameJa: 'シャンパン・ブルース', price: 1200, type: 0 },
        { name: 'Mimosa', nameJa: 'ミモザ', price: 1200, type: 0 },
        { name: 'China Blue', nameJa: 'チャイナ・ブルー', price: 850, type: 1 },
        { name: 'Darjeeling Cooler', nameJa: 'ダージリン・クーラー', price: 850, type: 1 },
        { name: 'Emerald Cooler', nameJa: 'エメラルド・クーラー', price: 850, type: 1 },
        { name: 'Peach Fizz', nameJa: 'ピーチ・フィズ', price: 850, type: 1 },
        { name: 'Cacao Fizz', nameJa: 'カカオ・フィズ', price: 850, type: 1 },
        { name: 'Apricot Fizz', nameJa: 'アプリコット・フィズ', price: 850, type: 1 },
        { name: 'Violoet Fizz', nameJa: 'バイオレット・フィズ', price: 850, type: 1 },
        { name: 'Grasshopper', nameJa: 'グラス・ホッパー', price: 900, type: 1 },
        { name: 'Brave Bull', nameJa: 'ブレイブ・ブル', price: 800, type: 2 },
        { name: 'Paloma', nameJa: 'パロマ', price: 800, type: 2 },
        { name: 'El Diablo', nameJa: 'エル・ディアブロ', price: 850, type: 2 },
        { name: 'Mockin\' Bird', nameJa: 'モッキン・バード', price: 900, type: 2 },
        { name: 'Margarita', nameJa: 'マルガリータ', price: 900, type: 2 },
        { name: 'French Connection', nameJa: 'フレンチ・コネクション', price: 800, type: 3 },
        { name: 'Sidecar', nameJa: 'サイドカー', price: 900, type: 3 },
        { name: 'Alexander', nameJa: 'アレキサンダー', price: 900, type: 3 },
        { name: 'Cherry Blossom', nameJa: 'チェリー・ブロッサム', price: 900, type: 3 },
        { name: 'Jackrose', nameJa: 'ジャックローズ', price: 900, type: 3 },
        { name: 'Godfather', nameJa: 'ゴッドファーザー', price: 800, type: 4 },
        { name: 'Rusty Nail', nameJa: 'ラスティ・ネイル', price: 800, type: 4 },
        { name: 'John Collins', nameJa: 'ジョン・コリンズ', price: 850, type: 4 },
        { name: 'New York', nameJa: 'ニューヨーク', price: 900, type: 4 },
        { name: 'Hunter', nameJa: 'ハンター', price: 900, type: 4 },
        { name: 'Manhattan', nameJa: 'マンハッタン', price: 900, type: 4 },
        { name: 'Rob Roy', nameJa: 'ロブ・ロイ', price: 900, type: 4 },
        { name: 'Gin & Tonic', nameJa: 'ジン・トニック', price: 650, type: 5 },
        { name: 'Negroni', nameJa: 'ネグローニ', price: 800, type: 5 },
        { name: 'White Lady', nameJa: 'ホワイトレディ', price: 900, type: 5 },
        { name: 'Blue Moon', nameJa: 'ブルームーン', price: 900, type: 5 },
        { name: 'Gimlet', nameJa: 'ギムレット', price: 900, type: 5 },
        { name: 'Gimlet Highball', nameJa: 'ギムレット・ハイボール', price: 950, type: 5 },
        { name: 'Martini', nameJa: 'マティーニ', price: 900, type: 5 },
        { name: 'Gin Fizz', nameJa: 'ジン・フィズ', price: 900, type: 5 },
        { name: 'French 75', nameJa: 'フレンチ７５', price: 1200, type: 5 },
        { name: 'Godmother', nameJa: 'ゴッド・マザー', price: 800, type: 6 },
        { name: 'Salty Dog', nameJa: 'ソルティ・ドッグ', price: 850, type: 6 },
        { name: 'Kami-Kaze', nameJa: 'カミカゼ', price: 850, type: 6 },
        { name: 'Bloody Ceasar', nameJa: 'ブラッディー・シーザー', price: 850, type: 6 },
        { name: 'Moscow Mule', nameJa: '5種のハーブとスパイスのモスコミュール', price: 900, type: 6 },
        { name: 'Yuki-Guni', nameJa: '雪国', price: 900, type: 6 },
        { name: 'Cuba Libre', nameJa: 'キューバ・リブレ', price: 800, type: 7 },
        { name: 'Sol Cubano', nameJa: 'ソル・クバーノ', price: 850, type: 7 },
        { name: 'Mojito', nameJa: 'モヒート', price: 850, type: 7 },
        { name: 'Boston Cooler', nameJa: 'ボストン・クーラー', price: 850, type: 7 },
        { name: 'Sky Diving', nameJa: 'スカイ・ダイビング', price: 900, type: 7 },
        { name: 'X.Y.Z.', nameJa: 'エックス・ワイ・ズィー', price: 900, type: 7 },
        { name: 'Daiquiri', nameJa: 'ダイキリ', price: 900, type: 7 }
    ]

    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>()

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
                        setRestaurants(JSON.parse(data.body).filter((restaurant: Restaurant) => atob(restaurant.id) == match.params.restaurant))
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
        const imageDir = `${basePath}/images`
        const area = match.params.area

        return (
            <>
                <header className="header">
                    <a href={`${basePath}/${area}`}>
                        <picture>
                            <source type="image/webp" media="(min-width: 150px)" srcSet={`${imageDir}/back.webp`} />
                            <img src={`${imageDir}/back.png`} className="back-image" alt="Back" />
                        </picture>
                    </a>
                    <h1 className="header-label">{restaurants ? restaurants[0].name : 'N/A'}</h1>
                </header>
                <div className="contents">
                    {
                        cocktailTypes.map((cocktailType) => {
                            return (
                                <div>
                                    <h4>{cocktailType.label}</h4>
                                    <ul className="cocktail-list">
                                    {
                                        cocktails.filter((cocktail) => cocktail.type == cocktailType.type).map((cocktail) => {
                                            return (
                                                <li className="cocktail-item">
                                                    <div className="cocktail-name-cell">
                                                        <span className="cocktail-name">{cocktail.name}</span>
                                                        <br />
                                                        <span className="cocktail-name-ja">{cocktail.nameJa}</span>
                                                    </div>
                                                    <div className="cocktail-price-cell">{`${cocktail.price.toLocaleString()} yen`}</div>
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
                <Footer />
            </>
        )
    }
}

export default RestaurantPage
