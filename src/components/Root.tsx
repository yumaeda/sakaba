/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomePage from './pages/HomePage'
import AreaPage from './pages/AreaPage'
import RankingPage from './pages/RankingPage'
import RestaurantPage from './pages/RestaurantPage'
import DishRestaurantPage from './pages/DishRestaurantPage'
import GenreRestaurantPage from './pages/GenreRestaurantPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/dish/:id" component={DishRestaurantPage} />
                <Route path="/genres/:id" component={GenreRestaurantPage} />
                <Route path="/ranking" component={RankingPage} />
                <Route path="/:area/:restaurant" component={RestaurantPage} />
                <Route path="/:area" component={AreaPage} />
            </Switch>
        </Router>
    )
}

export default Root
