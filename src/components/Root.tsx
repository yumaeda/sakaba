/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomeAdminPage from './pages/admin/HomeAdminPage'
import RestaurantAdminPage from './pages/admin/RestaurantAdminPage'
import RestaurantDrinkAdminPage from './pages/admin/RestaurantDrinkAdminPage'
import RestaurantGenreAdminPage from './pages/admin/RestaurantGenreAdminPage'
import AreaPage from './pages/AreaPage'
import DishRestaurantPage from './pages/DishRestaurantPage'
import DrinkRestaurantPage from './pages/DrinkRestaurantPage'
import GenreRestaurantPage from './pages/GenreRestaurantPage'
import HomePage from './pages/HomePage'
import RankingPage from './pages/RankingPage'
import RestaurantPage from './pages/RestaurantPage'
import SignInPage from './pages/SignInPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PhotoAdminPage from './pages/admin/PhotoAdminPage'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="signin" element={<SignInPage />} />
                <Route path="admin/index" element={<HomeAdminPage />} />
                <Route path="admin/photo" element={<PhotoAdminPage />} />
                <Route path="admin/restaurant" element={<RestaurantAdminPage />} />
                <Route path="admin/restaurant-drink" element={<RestaurantDrinkAdminPage />} />
                <Route path="admin/restaurant-genre" element={<RestaurantGenreAdminPage />} />
                <Route path="dishes/:id" element={<DishRestaurantPage />} />
                <Route path="drinks/:id" element={<DrinkRestaurantPage />} />
                <Route path="genres/:id" element={<GenreRestaurantPage />} />
                <Route path="ranking" element={<RankingPage />} />
                <Route path=":area/:restaurant" element={<RestaurantPage />} />
                <Route path=":area" element={<AreaPage />} />
            </Routes>
        </Router>
    )
}

export default Root
