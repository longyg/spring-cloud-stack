import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';

export default class Page extends Component {
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={App}/>
                </Switch>
            </Router>
        )
    }
}