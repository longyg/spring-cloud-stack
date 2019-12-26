import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'

const SidebarMenu = () => {

  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        inverted
        vertical
        visible
        width='thin'
      >
        <Menu.Item as='a'>
          <Icon name='home' />
          Home
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

export default SidebarMenu
