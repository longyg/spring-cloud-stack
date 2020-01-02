import React, { Component } from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
import Http from '../../utils/Request'
import DataTable from '../common/DataTable';

const data = [
  {
    id: "1",
    name: 'ADMIN',
    desc: 'Super role'
  },
  {
    id: '2',
    name: 'USER',
    desc: 'Normal user role'
  }
]

export default class RoleManagement extends Component {
  state = {
    data: [],
    loading: true
  }

  componentDidMount = () => {
    // Http.get('/user')
    //   .then((res) => {
    //     this.setState({
    //       users: res.data,
    //       loading: false
    //     })
    //   }
    // )
    setTimeout(() => {
      this.setState({
        data: data,
        loading: false
      })
    }, 2000)
  }

  tableConfig = [
    {name: 'Name', field: 'name'},
    {name: 'Address', field: 'address'},
    {name: 'Username', field: 'username'}
  ]

  render() {
    const { data, loading } = this.state
    return (
      <Segment.Group raised>
        <Segment>
          <h4>User Management</h4>
        </Segment>
        <Segment>
          <Button basic size='small'>
            <Icon color='green' name='add' />添加
          </Button>
          <Button basic size='small'>
            <Icon color='red' name='delete' />删除
          </Button>
        </Segment>
        <Segment loading={loading}>
          <DataTable config={this.tableConfig} data={data}></DataTable>
        </Segment>
      </Segment.Group>
    )
  }
}