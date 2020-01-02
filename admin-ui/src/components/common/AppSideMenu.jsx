import React, { Component } from 'react'
import { Accordion, Menu, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class AppSideMenu extends Component {
  state = { 
    activeIndex: -1
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  buildMean = () => {
    return (
      <Accordion as={Menu} vertical fluid>
        {this.buildMenuGroups()}
      </Accordion>
    )
  }

  buildMenuGroups = () => {
    let menuGroups = []
    let groupIndex = 0
    let itemStartIndex = 0
    this.props.menus.forEach(group => {
      menuGroups.push(this.buildMenuGroup(group, groupIndex, itemStartIndex))
      groupIndex++
      itemStartIndex += group.items.length
    })
    return menuGroups
  }

  buildMenuGroup = (group, groupIndex, itemStartIndex) => {
    const { activeIndex } = this.state
    return (
      <Menu.Item key={groupIndex}>
        <Accordion.Title
          active={activeIndex === groupIndex}
          index={groupIndex}
          onClick={this.handleClick}
          content={group.name}
        />
        <Accordion.Content
          active={activeIndex === groupIndex}
          >
            <Menu vertical style={{border: 'none', boxShadow: 'none'}}>
              {this.buildMenuItems(group.items, itemStartIndex)}
            </Menu>
        </Accordion.Content>
      </Menu.Item>
    )
  }

  buildMenuItems = (items, itemStartIndex) => {
    let menuItems = []
    let index = itemStartIndex
    items.forEach(item => {
      menuItems.push(this.buildMenuItem(item, index))
      index++
    })
    return menuItems
  }

  buildMenuItem = (item, index) => {
    return (
      <Menu.Item key={index} onClick={this.handleItemClick.bind(this, item)}>
        <Icon name={item.icon} style={{float: 'left', marginRight: '10px'}}/>
        {item.name}
      </Menu.Item>
    )
  }

  handleItemClick = (item) => {
    this.props.history.push(item.action)
  }

  render() {
    return this.buildMean()
  }
}

export default withRouter(AppSideMenu)
