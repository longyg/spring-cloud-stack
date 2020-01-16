import React, { Component } from 'react'
import { Button, Dropdown, Menu, Icon} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { withIntlContext } from '../context'

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
          <Icon name='home'/>{this.props.intl.formatMessage({id: 'app-name'})}
        </Menu.Item>

        <Menu.Menu color={color} position='right'>
          <Dropdown item text={this.props.intl.formatMessage({id: 'lang'})}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.changeLang('zh')} 
                active={this.intlCtx().lang === 'zh'}>
                {this.props.intl.formatMessage({id: 'zh'})}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.changeLang('en')} 
                active={this.intlCtx().lang === 'en'}>
                {this.props.intl.formatMessage({id: 'en'})}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Button color={color}>Sign Up</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(withIntlContext(injectIntl(AppHeader)))