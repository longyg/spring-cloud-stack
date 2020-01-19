import React, { Component } from 'react'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { withIntlContext } from '../context'
import { LOGIN_USER, logout } from '../../../utils/Auth'

class AppHeader extends Component {
  state = {
    activeItem: 'home',
    color: 'blue'
  }

  intlCtx = () => {
    return this.props.intlCtx
  }

  changeLang = (lang) => {
    this.intlCtx().changeLang(lang)
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push('/')
  }

  clickSidebarToggle = () => {
    this.props.handleSidebar();
  }

  logout = () => {
    logout().then(() => {
      this.props.history.push('/')
    })
  }

  render() {
    const { activeItem, color } = this.state
    return (
      <Menu color={color} inverted size='large'>
        <Menu.Item onClick={this.clickSidebarToggle}>
          <Icon name='content' />
        </Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}>
          <Icon name='home' />{this.props.intl.formatMessage({ id: 'app-name' })}
        </Menu.Item>

        <Menu.Menu color={color} position='right'>
          <Dropdown item trigger={
            <span>
              <Icon name='world' />{this.props.intl.formatMessage({ id: 'lang' })}
            </span>
          }>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.changeLang('zh')}
                active={this.intlCtx().lang === 'zh'}>
                {this.props.intl.formatMessage({ id: 'zh' })}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.changeLang('en')}
                active={this.intlCtx().lang === 'en'}>
                {this.props.intl.formatMessage({ id: 'en' })}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item trigger={
            <span>
              <Icon name='user' />{localStorage.getItem(LOGIN_USER)}
            </span>
          }>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.logout}>
                {this.props.intl.formatMessage({ id: 'Logout' })}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(withIntlContext(injectIntl(AppHeader)))