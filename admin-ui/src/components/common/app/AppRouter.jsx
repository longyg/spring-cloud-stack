import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../../home/Homepage'
import UserManagement from '../../user/UserManagement'
import RoleManagement from '../../user/RoleManagement'
import ResourceMgmt from '../../user/ResourceMgmt';

export default class AppRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/a/home" component={Homepage} />
                <Route exact path="/a/user" component={UserManagement} />
                <Route exact path="/a/role" component={RoleManagement} />
                <Route exact path="/a/resource" component={ResourceMgmt} />
            </Switch>
        )
    }
}