import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'

export default class SidebarMenu extends Component {
  render() {
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='push'
          icon='labeled'
          inverted
          vertical
          visible={this.props.visible}
          direction='left'
          width='thin'
        >
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
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
              <div style={{height: 'calc(100vh - 78px)'}}>
                  <Header as='h3'>Application Content</Header>
                  <div>
                      This is content
                  </div>
              </div>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
