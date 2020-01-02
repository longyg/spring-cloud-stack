import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'

export default class AppFooter extends Component {

  render() {
    return (
      <Segment
        size='tiny'
        textAlign='right'>
        Copyright © 2019 - Spring Cloud Stack - made by yglong
      </Segment>
    )
  }
}