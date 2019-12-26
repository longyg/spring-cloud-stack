import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/common/AppHeader'
import AppContent from './components/common/AppContent'
import AppFooter from './components/common/AppFooter'

export default class App extends Component {
  state = {
    sidebarVisible: true
  }

  handleSidebar = () => {
    this.setState((prevState) => ({
      sidebarVisible: !prevState.sidebarVisible
    }))
  }

  render() {
    return (
      <div>
        <AppHeader handleSidebar={this.handleSidebar} />
        <AppContent visible={this.state.sidebarVisible} />
        <AppFooter />
      </div>
    );
  }
}
