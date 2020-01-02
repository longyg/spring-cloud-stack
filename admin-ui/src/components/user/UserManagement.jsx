import React, { Component } from 'react';
import { Segment, Header, Modal, Button, Form } from 'semantic-ui-react';
import Http from '../../utils/Request'
import DataTable from '../common/DataTable';
import { injectIntl } from 'react-intl'

const users = [
  {
    id: "1",
    name: 'Yglong',
    address: 'Sichuan Chengdu',
    username: 'yglong',
    password: 'password'
  },
  {
    id: '2',
    name: 'Test User',
    address: 'Chongqing',
    username: 'testUser',
    password: 'password'
  },
  {
    id: '3',
    name: 'Test User 2',
    address: 'Chongqing',
    username: 'testUser2',
    password: 'password'
  }
]

class UserManagement extends Component {
  state = {
    users: [],
    loading: true,
    isModalOpen: false
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
        users: users,
        loading: false
      })
    }, 2000)
  }

  add = () => {
    this.setState({
      ...this.state,
      isModalOpen: true
    })
  }

  edit = (e, rowData) => {
    console.log(rowData)
  }

  delete = (data) => {
    console.log(data)
  }

  deleteRow = (e, rowData) => {
    console.log(rowData)
  }

  onRowCheck = () => {

  }

  onAllRowCheck = () => {

  }

  closeModal = () => {
    this.setState({ 
      ...this.state,
      isModalOpen: false 
    })
  }

  tableConfig = {
    // 是否显示checkbox列
    checkboxColumn: true,

    // 数据列定义
    columnDefs: [
      {name: 'Name', field: 'name'},
      {name: 'Address', field: 'address'},
      {name: 'Username', field: 'username'}
    ],

    // 操作列定义
    rowActions: [
      {
        icon: 'edit',
        iconColor: 'blue',
        text: 'Edit',
        onClick: this.edit
      },
      {
        icon: 'delete',
        iconColor: 'red',
        text: 'Delete',
        onClick: this.deleteRow
      }
    ],

    // 表头操作定义
    headerActions: [
      {
        icon: 'add',
        iconColor: 'green',
        text: 'Add',
        onClick: this.add
      },
      {
        icon: 'delete',
        iconColor: 'red',
        text: 'Delete',
        onClick: this.delete
      }
    ]
  }

  addUser = () => {
    const user = {
      id: this.state.users.length + 1,
      name: this.nameElement.value,
      address: this.addressElement.value,
      username: this.usernameElement.value,
      password: this.passwordElement.value
    }
    let { users } = this.state
    users.push(user)
    this.setState({
      ...this.state,
      users: users,
      isModalOpen: false
    })
  }

  usernameRef = (element) =>  {
    this.usernameElement = element
  }
  passwordRef = (element) =>  {
    this.passwordElement = element
  }
  nameRef = (element) =>  {
    this.nameElement = element
  }
  addressRef = (element) =>  {
    this.addressElement = element
  }

  renderAddUserModal = () => {
    return (
      <Modal
        size='mini'
        open={this.state.isModalOpen}
        closeOnEscape={true}
        closeOnDimmerClick={false}
        onClose={this.closeModal}
      >
        <Modal.Header>{this.props.intl.formatMessage({id: "AddUser"})}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>{this.props.intl.formatMessage({id: "Username"})}</label>
              <input ref={this.usernameRef} placeholder='User Name' />
            </Form.Field>
            <Form.Field required >
              <label>{this.props.intl.formatMessage({id: "Password"})}</label>
              <input ref={this.passwordRef} placeholder='Password' type='password'/>
            </Form.Field>
            <Form.Field>
              <label>{this.props.intl.formatMessage({id: "Name"})}</label>
              <input ref={this.nameRef} placeholder='Name' />
            </Form.Field>
            <Form.Field>
              <label>{this.props.intl.formatMessage({id: "Address"})}</label>
              <input ref={this.addressRef} placeholder='Address' />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.closeModal} negative>
            {this.props.intl.formatMessage({id: "Cancel"})}
          </Button>
          <Button
            onClick={this.addUser}
            positive
            labelPosition='right'
            icon='checkmark'
            content={this.props.intl.formatMessage({id: "Save"})}
          />
        </Modal.Actions>
      </Modal>
    )
  }

  render() {
    console.log('render user', this.state)
    const { users, loading } = this.state
    return (
      <Segment.Group raised>
        <Segment>
          <Header as='h3'>User Management</Header>
        </Segment>
        <Segment loading={loading}>
          <DataTable config={this.tableConfig} data={users} />
        </Segment>

        {/* 添加用户弹出框 */}
        {this.renderAddUserModal()}
        <Loading visible={this.state.isLoadingVisible}></Loading>
      </Segment.Group>
    )
  }
}

export default injectIntl(UserManagement)