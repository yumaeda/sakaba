/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import Restaurant from '../../interfaces/Restaurant'
import Footer from '../Footer'

const RestaurantPage: React.FC<{ match: any }> = (props) => {
    const { match } = props
    const [error, setError] = React.useState<Error>()
    const [restaurant, setRestaurant] = React.useState<Restaurant>()

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
                        setRestaurant(JSON.parse(data.body).filter((restaurant: Restaurant) => restaurant.id == match.params.restaurant))
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
                    <h1 className="header-label">{restaurant?.name}</h1>
                </header>
                <div className="contents">To be coming...</div> 
                <Footer />
            </>
        )
    }
}

export default RestaurantPage
