/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import AreaPage from './pages/AreaPage'
import DishRestaurantPage from './pages/DishRestaurantPage'
import GenreRestaurantPage from './pages/GenreRestaurantPage'
import HomePage from './pages/HomePage'
import RankingPage from './pages/RankingPage'
import RestaurantGenrePage from './pages/admin/RestaurantGenrePage'
import RestaurantPage from './pages/RestaurantPage'
import SignInPage from './pages/SignInPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signin" component={SignInPage} />
                <Route path="/admin/restaurant-genre" component={RestaurantGenrePage} />
                <Route exact path="/" component={HomePage} />
                <Route path="/dishes/:id" component={DishRestaurantPage} />
                <Route path="/genres/:id" component={GenreRestaurantPage} />
                <Route path="/ranking" component={RankingPage} />
                <Route path="/:area/:restaurant" component={RestaurantPage} />
                <Route path="/:area" component={AreaPage} />
            </Switch>
        </Router>
    )
}

export default Root
