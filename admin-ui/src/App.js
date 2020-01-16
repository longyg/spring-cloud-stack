import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/common/app/AppHeader'
import AppContent from './components/common/app/AppContent'
import AppFooter from './components/common/app/AppFooter'

export default class App extends Component {
  state = {
    sidebarVisible: true,
    contentClassName: 'custom-pusher'
  }

  handleSidebar = () => {
    this.setState((prevState) => ({
      sidebarVisible: !prevState.sidebarVisible,
      contentClassName: !prevState.sidebarVisible ? 'custom-pusher' : 'custom-pusher-full'
    }))
  }

  render() {
    return (
      <div>
        <AppHeader handleSidebar={this.handleSidebar} />
        <AppContent visible={this.state.sidebarVisible} contentClassName={this.state.contentClassName} />
        <AppFooter />
      </div>
    );
  }
}
