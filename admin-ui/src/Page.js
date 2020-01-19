import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import App from './App';
import NotFound from './components/common/app/NotFound'
import Login from './components/common/user/Login'
import { LOGIN_USER } from './utils/Auth'

export default class Page extends Component {
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/a/home' />} />
                    <PrivateRoute path='/a' component={App} />

                    <Route exact path='/login' component={Login} />
                    <Route exact path='/error' component={NotFound} />

                    <Redirect to="/error" />
                </Switch>
            </Router>
        )
    }
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return localStorage.getItem(LOGIN_USER) ? 
        <Route {...rest} render={props => <Component {...rest} {...props}/>} />
        :
        <Redirect to='/login' />
}