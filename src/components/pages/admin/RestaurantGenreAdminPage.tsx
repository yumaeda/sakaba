/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Restaurant } from '@yumaeda/sakaba-interface'
import RestaurantDropDown from '../../RestaurantDropdown'
import camelcaseKeys = require('camelcase-keys')
import { getCookie } from '../../../utils/CookieUtility'
 
const RestaurantGenreAdminPage: React.FC = () => {
    const [token, setToken] = React.useState<string>('')
    const [genre, setGenre] = React.useState<number>(0)
    const [restaurants, setRestaurants] = React.useState<Restaurant[]>([])
    const [restaurantId, setRestaurantId] = React.useState<string>('')
 
    React.useEffect(() => {
        setToken(getCookie('jwt'))
        fetch('https://api.tokyo-dinner.com/restaurants/', { headers: {} })
            .then(res => res.json())
            .then(
                (data) => {
                    const tmpRestaurants = camelcaseKeys(JSON.parse(JSON.stringify(data.body)))
                    setRestaurantId(tmpRestaurants[0].id)
                    setRestaurants(tmpRestaurants)
                },
                (error: Error) => {
                    console.dir(error)
                }
            )
    }, [])

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRestaurantId(event.currentTarget.value)
    }
 
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()

        if (token == '') {
            alert('Token is expired or invalid!')
            return
        }

        if (restaurantId === '' || genre === 0) {
            alert('Please fillout the required fields!')
            return
        }

        const restaurant_genre = {
            restaurant_id: restaurantId,
            genre_id: genre.toString()
        }
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(restaurant_genre)
        }
        fetch('https://api.tokyo-dinner.com/auth/restaurant-genre/', postOptions)
            .then((res) => res.json())
            .then((data) => {
                alert(JSON.stringify(data))
            })
        }
 
        return (
            <>
                <header className="admin-header">
                    <h1 className="admin-header-title">{`管理者ページ`}</h1>
                    <Link to="/admin/index">Home</Link>
                </header>
                <div className="admin-contents">
                    <RestaurantDropDown onSelect={handleSelect} restaurantId={restaurantId} restaurants={restaurants} /><br />
                    <div>
                        <input className="admin-input" placeholder="Genre" type="number" onChange={ (event: React.FormEvent<HTMLInputElement>) => setGenre(Number(event.currentTarget.value)) } /><br />
                        <button className="admin-button" type="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </div> 
            </>
     )
 }
 
 export default RestaurantGenreAdminPage
 