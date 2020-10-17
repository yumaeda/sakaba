/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'

interface Ranking {
    dish: string
    rank: number
    restaurant: string
    restaurant_id: string
    photo: string
    restaurant_url: string
}

const RankingPage: React.FC = () => {
    const [error, setError] = React.useState<Error>()
    const [rankings, setRankings] = React.useState<Ranking[]>()

    React.useEffect(() => {
        fetch('/api-key.txt')
            .then((r) => r.text())
            .then(text  => {
                fetch('https://api.tokyo-takeout.com/rankings', {
                    headers: { 'X-Api-Key': text }
                })
                .then(res => res.json())
                .then(
                    (data) => {
                        setRankings(JSON.parse(data.body))
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

        return (
            <>
                <header className="header">
                    <h1 className="header-label">{`フードランキング`}</h1>
                    <a href={`${basePath}/`}>Back</a>
                </header>
                <div className="contents">
                    <ul className="ranking-list">
                    {rankings ? rankings.map((ranking: Ranking) => {
                        const restaurantId = atob(ranking.restaurant_id)
                        const restaurantImageDir = `${basePath}/images/restaurants/${restaurantId}`
                        return (
                        <li className="ranking-item" key={`${ranking.dish}#${ranking.rank}`}>
                            <div>
                                <span>{`${ranking.dish} #${ranking.rank}`}</span>
                                <span>【</span>
                                <a href={ranking.restaurant_url} rel="nofollow noopener" target="_blank">{ranking.restaurant}</a><br />
                                <span>】</span><br />
                                <img src={`${restaurantImageDir}/${ranking.photo}_thumbnail.jpg`} className="dish-image" alt={`${ranking.dish}#${ranking.rank}`} />
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

export default RankingPage
