/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomePage from 'components/pages/HomePage'
import MeguroPage from 'components/pages/MeguroPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/meguro" component={MeguroPage} />
            </Switch>
        </Router>
    )
}

export default Root
