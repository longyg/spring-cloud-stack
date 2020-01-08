import React, { Component } from 'react';
import { Segment, Header, Message, Icon } from 'semantic-ui-react';
import Http from '../../utils/Request'
import DataTable from '../common/table/DataTable';
import { injectIntl } from 'react-intl'
import FormDialog from '../common/form/FormDialog';
import { differenceBy } from 'lodash';

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

  openAddUserModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  edit = (e, rowData) => {
    console.log(rowData)
  }

  delete = (data) => {
    let toDel = []
    data.forEach(item => {
      if (item.checked) {
        toDel.push(item.data)
      }
    })
    if (toDel.length < 1) {
      this.showTip('Please select at least one data to delete!', 'orange', 'warning sign', false, true)
      return
    }
    const { users } = this.state

    this.showTip('Deleting...', 'blue', 'spinner', true)

    let newUsers = differenceBy(users, toDel, 'id')
    // let newUsers = []
    // users.forEach(user => {
    //   let isDel = false
    //   toDel.forEach(item => {
    //     if (item.id === user.id) {
    //       isDel = true
    //     }
    //   })
    //   if (!isDel) {
    //     newUsers.push(user)
    //   }
    // })

    setTimeout(() => {
      this.setState({
        ...this.state,
        users: newUsers
      }, () => {
        this.showTip('Deleted successfully', 'green', 'check circle', false, true)
      })
    }, 2000)
  }

  deleteRow = (e, rowData) => {
    console.log(rowData)
  }

  onRowCheck = () => {

  }

  onAllRowCheck = () => {

  }



  tableConfig = {
    // 是否显示checkbox列
    checkboxColumn: true,

    // 数据列定义
    columnDefs: [
      { name: 'Name', field: 'name' },
      { name: 'Address', field: 'address' },
      { name: 'Username', field: 'username' }
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
        onClick: this.openAddUserModal
      },
      {
        icon: 'delete',
        iconColor: 'red',
        text: 'Delete',
        onClick: this.delete
      }
    ]
  }

  showTip = (content, color, icon, loading, autoclose) => {
    this.setState({
      isTipVisiable: true,
      tipMessage: content,
      tipColor: color,
      tipIcon: icon,
      isTipLoading: loading
    }, () => {
      if (autoclose) {
        setTimeout(this.closeTip, 3000)
      }
    })
  }

  closeTip = () => {
    this.setState({
      isTipVisiable: false
    })
  }

  tipMessage = () => {
    return (
      <Message color={this.state.tipColor} hidden={!this.state.isTipVisiable} >
        <Icon name={this.state.tipIcon} loading={this.state.isTipLoading} />
        {this.state.tipMessage}
      </Message>
    )
  }

  addUser = (e, data) => {
    const { username, password, name, address } = data

    const user = {
      // for test
      id: this.state.users.length + 1 + '',
      name: name ? name.value : '',
      address: address ? address.value : '',
      username: username ? username.value : '',
      password: password ? password.value : ''
    }

    let { users } = this.state

    this.setState({
      isModalOpen: false
    }, () => {
      this.showTip('Saving...', 'blue', 'spinner', true)
    })

    setTimeout(() => {
      users.push(user)
      this.setState({
        ...this.state,
        users: users
      }, () => {
        this.showTip('Saved successfully', 'green', 'check circle', false, true)
      })
    }, 2000)
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: false
    })
  }

  addFormConfig = {
    headerText: 'AddUser',
    formColumns: 2,
    forms: [
      {
        label: 'Username', field: 'username', placeholder: 'User Name',
        required: true, requiredText: 'User Name is mandatory'
      },
      {
        label: 'Password', field: 'password', placeholder: 'Password',
        type: 'password',
        required: true, requiredText: 'Password is mandatory'
      },
      {
        label: 'Name', field: 'name', placeholder: 'Name'
      },
      {
        label: 'Address', field: 'address', placeholder: 'Address'
      }
    ],
    actions: [
      {
        text: 'Cancel',
        color: 'red',
        onClick: this.closeModal
      },
      {
        text: 'Save',
        color: 'green',
        onClick: this.addUser,
        checkRequired: true,
        clearForm: true,
        icon: {
          name: 'checkmark',
          position: 'right'
        }
      }
    ]
  }

  render() {
    const { users, loading } = this.state
    return (
      <Segment.Group raised>
        <Segment>
          <Header as='h3'>{this.props.intl.formatMessage({ id: 'UserManagement' })}</Header>
        </Segment>
        <Segment loading={loading}>
          {/* 提示消息 */}
          {this.tipMessage()}

          {/* 数据表格 */}
          <DataTable config={this.tableConfig} data={users} />
        </Segment>

        {/* 添加用户弹出框 */}
        <FormDialog size='tiny' isOpen={this.state.isModalOpen} config={this.addFormConfig}></FormDialog>
      </Segment.Group>
    )
  }
}

export default injectIntl(UserManagement)