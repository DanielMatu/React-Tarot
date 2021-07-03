import React from 'react'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';

import { createBrowserHistory } from 'history'

import DashboardPage from '../components/DashboardPage'
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage'
import BackgroundVideo from '../components/BackgroundVideo'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <div>

            <BackgroundVideo url='videos/bg-sea.mp4'/>
            <Switch>
                
                <PublicRoute path="/" component={LoginPage} exact={true}/>

                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <PrivateRoute path="/journal" component={DashboardPage}/>
                <PrivateRoute path="/fortunes" component={DashboardPage}/>

                <Route component= {NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;