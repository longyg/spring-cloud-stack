import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserManagement from '../../user/UserManagement'
import Homepage from '../../home/Homepage'

export default class AppRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/user" component={UserManagement} />
            </Switch>
        )
    }
}