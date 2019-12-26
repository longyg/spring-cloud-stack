import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/common/AppBar'
import SidebarMenu from './components/common/SidebarMenu'

export default class App extends Component {
  state = {
    sidebarVisible: true
  }

  handleSidebar = (e, name) => {
    this.setState((prevState) => ({
      sidebarVisible: !prevState.sidebarVisible
    }))
  }

  render() {
    return (
      <div>
        <AppBar handleSidebar={this.handleSidebar}></AppBar>
        <SidebarMenu visible={this.state.sidebarVisible}></SidebarMenu>
      </div>
    );
  }
}
