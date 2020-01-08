import React, { Component } from 'react'
import { Segment, Sidebar } from 'semantic-ui-react'
import AppSideMenu from './AppSideMenu'
import AppRouter from './AppRouter'

export default class AppContent extends Component {
  render() {
    const menus = [
      {
        name: 'User Management',
        items: [
          {
            name: 'User Management',
            icon: 'users',
            action: '/user'
          },
          {
            name: 'User Management',
            icon: 'users',
            action: '/user'
          }
        ]
      },
      {
        name: 'User Management',
        items: [
          {
            name: 'User Management',
            icon: 'users',
            action: '/user'
          },
          {
            name: 'User Management',
            icon: 'users',
            action: '/user'
          }
        ]
      }
    ]

    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          animation='push'
          direction='left'
          visible={this.props.visible}
        >
          <AppSideMenu menus={menus} />
        </Sidebar>

        <Sidebar.Pusher className={this.props.contentClassName}>
          <div style={{height: 'calc(100vh - 94px)', width: '100%',  background: 'rgba(211, 210, 210, 0.1)'}}>
              <AppRouter />
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}
