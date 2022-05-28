/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomeAdminPage from './pages/admin/HomeAdminPage'
import RestaurantAdminPage from './pages/admin/RestaurantAdminPage'
import RestaurantGenreAdminPage from './pages/admin/RestaurantGenreAdminPage'
import AreaPage from './pages/AreaPage'
import DishRestaurantPage from './pages/DishRestaurantPage'
import GenreRestaurantPage from './pages/GenreRestaurantPage'
import HomePage from './pages/HomePage'
import RankingPage from './pages/RankingPage'
import RestaurantPage from './pages/RestaurantPage'
import SignInPage from './pages/SignInPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PhotoAdminPage from './pages/admin/PhotoAdminPage'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signin" component={SignInPage} />
                <Route path="/admin/index" component={HomeAdminPage} />
                <Route path="/admin/photo" component={PhotoAdminPage} />
                <Route path="/admin/restaurant" component={RestaurantAdminPage} />
                <Route path="/admin/restaurant-genre" component={RestaurantGenreAdminPage} />
                <Route exact path="/" component={HomePage} />
                <Route path="/dishes/:id" component={DishRestaurantPage} />
                <Route path="/drinks/:id" component={DrinkRestaurantPage} />
                <Route path="/genres/:id" component={GenreRestaurantPage} />
                <Route path="/ranking" component={RankingPage} />
                <Route path="/:area/:restaurant" component={RestaurantPage} />
                <Route path="/:area" component={AreaPage} />
            </Switch>
        </Router>
    )
}

export default Root
