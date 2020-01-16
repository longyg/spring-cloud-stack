import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import UserManagement from '../../user/UserManagement'
import Homepage from '../../home/Homepage'

export default class AppRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/a/home" component={Homepage} />
                <Route exact path="/a/user" component={UserManagement} />
            </Switch>
        )
    }
}