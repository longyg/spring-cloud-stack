import React, { Component } from 'react'
import { Button, Dropdown, Menu, Icon} from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'

class AppHeader extends Component {
  state = { 
    activeItem: 'home',
    color: 'blue',
    activeLangIndex: 1
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.history.push('/')
  }

  clickSidebarToggle = () => {
    this.props.handleSidebar();
  }

  selectLanguage = (lang, index) => {
    this.setState({
      ...this.state,
      activeLangIndex: index
    })
    this.props.changeLanguage(lang)
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
              <Dropdown.Item onClick={() => this.selectLanguage('zh', 1)} 
                active={this.state.activeLangIndex === 1}>
                {this.props.intl.formatMessage({id: 'zh'})}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.selectLanguage('en', 2)} 
                active={this.state.activeLangIndex === 2}>
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

export default withRouter(injectIntl(AppHeader))