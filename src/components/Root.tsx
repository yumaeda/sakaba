/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomePage from 'components/pages/HomePage'
import AreaPage from 'components/pages/AreaPage'
import RankingPage from 'components/pages/RankingPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/ranking" component={RankingPage} />
                <Route path="/:area?" component={AreaPage} />
            </Switch>
        </Router>
    )
}

export default Root
