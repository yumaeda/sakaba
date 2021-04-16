/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import AreaDictionary from '../../AreaDictionary'
import Footer from '../Footer'

interface RestaurantInfo {
    area: string
    count: number
}
 
const HomePage: React.FC<{}> = () => {
    const [restaurantInfos, setRestaurantInfos] = React.useState<RestaurantInfo[]>()
    const [error, setError] = React.useState<Error>()

    React.useEffect(() => {
        fetch('/api-key.txt')
            .then((r) => r.text())
            .then(text  => {
                fetch('https://api.tokyo-takeout.com/restaurant-counts', {
                    headers: { 'X-Api-Key': text }
                })
                .then(res => res.json())
                .then(
                    (data) => {
                        setRestaurantInfos(JSON.parse(data.body))
                    },
                    (error: Error) => {
                        setError(error)
                    }
                )
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <>
                <header className="header">
                    <h1 className="header-label">東京テイクアウト</h1>
                </header>
                <div className="contents">
                    <img className="main-image" src="https://cdn.tokyo-hideaway.com/images/cover.jpg" alt="東京テイクアウト・カバー" />
                    <p className="main-paragraph">
                        依然として、東京では新型コロナウイルスの影響で減った売上を少しでも補填しようとテイクアウトを続けるお店も多いようです。<br/>
                        消費者としては、<a href="https://demae-can.com/" rel="nofollow noopener">出前館</a>や<a href="https://about.ubereats.com/ja/" rel="nofollow noopener">Uber Eats</a>のような出前の方が手軽ですが、手数料や初期費用がかかるため導入を躊躇するお店は多いと思います。<br/><br/>
                        このサイトでは、そのようなお悩みを抱えていると思われる東京のお店を私の方で勝手に紹介していきます。<br/>
                        また、テイクアウトのありなしに関わらず、私のお世話になっている飲食店も併せて紹介する予定です。
                    </p>
                    <ul className="town-list">
                    { restaurantInfos ? restaurantInfos.map((info: RestaurantInfo) => (
                        <li>
                            <span className="town-button">
                                <Link className="list-item" to={`/${info.area}/`}>{`${AreaDictionary[info.area]} (${info.count})`}</Link>
                            </span>
                        </li>)) :
                        <li>Loading...</li>
                    }
                    </ul>
                    <p className="main-paragraph">
                        また、個人的に美味しいと思った料理も紹介していきたいと思ってます。<br />
                        <Link className="list-item" to="/ranking">フードランキング</Link>
                    </p>
                </div>
                <Footer />
            </>
        )
    }
}

export default HomePage
