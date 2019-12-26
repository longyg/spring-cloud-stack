import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from './components/common/AppBar'
import SidebarMenu from './components/common/SidebarMenu'

const App = ({children}) => {
  return (
    <div>
      <AppBar></AppBar>
      <SidebarMenu></SidebarMenu>
      {children}
    </div>
  );
}

export default App;
