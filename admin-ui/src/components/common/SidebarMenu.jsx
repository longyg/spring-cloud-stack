import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'

export default class SidebarMenu extends Component {
  render() {
    return (
      <Menu.Menu>
        <Menu.Item as='a'>
          <Icon name='user' />
          User
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Menu.Menu>
    )
  }
}
