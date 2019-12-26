import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar, Container } from 'semantic-ui-react'
import SidebarMenu from './SidebarMenu'

export default class AppContent extends Component {
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
          <SidebarMenu />
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
              <div style={{height: 'calc(100vh - 121px)'}}>
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
