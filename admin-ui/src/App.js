import React, { Component } from 'react';
import './App.css';
import { IntlProvider } from 'react-intl';
import zh_CN from './utils/locale/zh_CN';
import en_US from './utils/locale/en_US';
import AppHeader from './components/common/AppHeader'
import AppContent from './components/common/AppContent'
import AppFooter from './components/common/AppFooter'

export default class App extends Component {
  state = {
    sidebarVisible: true,
    contentClassName: 'custom-pusher',
    lang: 'zh' // zh, en
  }

  messages = {
    'zh': zh_CN,
    'en': en_US
  }

  changeLanguage = (lang) => {
    this.setState({
      ...this.state,
      lang: lang
    })
  }

  handleSidebar = () => {
    this.setState((prevState) => ({
      sidebarVisible: !prevState.sidebarVisible,
      contentClassName: !prevState.sidebarVisible ? 'custom-pusher' : 'custom-pusher-full'
    }))
  }

  render() {
    return (
      <IntlProvider locale={this.state.lang} messages={this.messages[this.state.lang]}>
        <div>
          <AppHeader handleSidebar={this.handleSidebar} changeLanguage={this.changeLanguage} />
          <AppContent visible={this.state.sidebarVisible} contentClassName={this.state.contentClassName} />
          <AppFooter />
        </div>
      </IntlProvider>
    );
  }
}
