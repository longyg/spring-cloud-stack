import React, { Component } from 'react'
import { Button, Dropdown, Menu, Icon} from 'semantic-ui-react'

export default class AppBar extends Component {
  state = { 
    activeItem: 'home',
    color: "blue"
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSidebar = (e, { name }) => {
    this.props.handleSidebar(e, name);
  }

  render() {
    const { activeItem, color } = this.state

    return (
      <Menu color={color} inverted size='large'>
        <Menu.Item onClick={this.handleSidebar}>
          <Icon name='list' />
        </Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}>
          <Icon name='home'/>Home
        </Menu.Item>

        <Menu.Menu color={color} position='right'>
          <Dropdown item text='Language'>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
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