import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Http from '../../utils/Request'
import DataTable from '../common/table/DataTable';
import { injectIntl } from 'react-intl'
import FormDialog from '../common/form/FormDialog';
import { withTipContext } from '../common/context'
import TipMessage from '../common/TipMessage'
import BindRoleDialog from './BindRoleDialog'
import * as ld from 'lodash'

class UserManagement extends Component {
    state = {
        data: [],
        loading: true,
        isModalOpen: false,
        isEditModalOpen: false
    }

    componentDidMount = () => {
        this.fetchData()
    }

    tipCtx = () => {
        return this.props.tipCtx
    }

    fetchData = () => {
        Http.get('/userservice/user').then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
    }

    openAddUserModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    openEditUserModal = (e, rowData) => {
        let editFormConfig = this.setFormConfig(this.editFormConfig, rowData)
        this.setState({
            editFormConfig: editFormConfig,
            isEditModalOpen: true
        })
    }

    openBindRoleModal = (e, rowData) => {
        this.setState({
            bindUser: rowData,
            isBindRoleOpen: true
        })
    }

    setFormConfig = (config, rowData) => {
        let forms = config.forms
        let newForms = []
        forms.forEach(form => {
            form.defaultValue = rowData.data[form.field]
            newForms.push(form)
        })
        config.forms = newForms
        config.rowData = rowData
        return config
    }

    delete = (data) => {
        let toDel = []
        data.forEach(item => {
            if (item.checked) {
                toDel.push(item.data)
            }
        })
        if (toDel.length < 1) {
            this.tipCtx().showNoRowSelectedTip()
            return
        }
        this.deleteData(toDel)
    }

    deleteRow = (e, rowData) => {
        let toDel = []
        toDel.push(rowData.data)
        this.deleteData(toDel)
    }

    deleteData = (toDel) => {
        this.tipCtx().showDeletingTip()
        Http.delete('/userservice/user', {
            data: toDel
        }).then(res => {
            this.tipCtx().showDeletedTip()
            this.fetchData()
        }).catch(err => {
            this.tipCtx().showErrorTip(err)
        })
    }

    addUser = (e, data) => {
        const { username, password, name, address } = data

        const user = {
            name: name ? name.value : '',
            address: address ? address.value : '',
            username: username ? username.value : '',
            password: password ? password.value : ''
        }

        this.setState({
            isModalOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.post('/userservice/user', user).then(res => {
            this.tipCtx().showSavedTip()
            this.fetchData()
        }).catch(err => {
            this.tipCtx().showErrorTip(err)
        })
    }

    closeAddModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    editUser = (e, data, config) => {
        const { username, password, name, address } = data

        if (!config.rowData || !config.rowData.data) {
            return
        }

        const id = config.rowData.data.id
        let user = {
            id: id,
            name: name ? name.value : '',
            address: address ? address.value : '',
            username: username ? username.value : '',
            password: password ? password.value : ''
        }

        this.setState({
            isEditModalOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.put('/userservice/user', user).then(res => {
            this.tipCtx().showSavedTip()
            this.fetchData()
        }).catch(err => {
            this.tipCtx().showErrorTip(err)
        })
    }

    closeEditModal = () => {
        this.setState({
            isEditModalOpen: false
        })
    }

    bindRoles = (params) => {
        let user = params.data.data
        user.roles = params.selectedRoles

        this.setState({
            isBindRoleOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.put('/userservice/user/role', user).then(res => {
            this.tipCtx().showSavedTip()
            this.fetchData()
        }).catch(err => {
            this.tipCtx().showErrorTip(err)
        })
    }

    closeBindRoleModel = () => {
        this.setState({
            isBindRoleOpen: false
        })
    }

    tableConfig = {
        // 是否显示checkbox列
        checkboxColumn: true,

        // 数据列定义
        columnDefs: [
            { name: 'Name', field: 'name' },
            { name: 'Address', field: 'address' },
            { name: 'Username', field: 'username' },
            {
                name: 'Role', field: 'roles', cellRenderer: (params) => {
                    let roles = []
                    params.forEach(role => {
                        roles.push(role.name)
                    })
                    let rolestr = ld.join(roles, ', ')
                    return (
                        <div>
                            {rolestr}
                        </div>
                    )
                }
            }
        ],

        // 操作列定义
        rowActions: [
            {
                icon: 'edit',
                iconColor: 'blue',
                text: 'Edit',
                onClick: this.openEditUserModal
            },
            {
                icon: 'delete',
                iconColor: 'red',
                text: 'Delete',
                onClick: this.deleteRow
            },
            {
                icon: 'user outline',
                iconColor: 'purple',
                text: 'BindRoles',
                onClick: this.openBindRoleModal
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

    formDefs = [
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
    ]

    addFormConfig = {
        headerText: 'AddUser',
        formColumns: 2,
        forms: this.formDefs,
        actions: [
            {
                text: 'Cancel',
                color: 'red',
                onClick: this.closeAddModal
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

    editFormConfig = {
        headerText: 'EditUser',
        formColumns: 2,
        forms: this.formDefs,
        actions: [
            {
                text: 'Cancel',
                color: 'red',
                onClick: this.closeEditModal,
                clearForm: true
            },
            {
                text: 'Save',
                color: 'green',
                onClick: this.editUser,
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
        const { data, loading } = this.state
        return (
            <Segment.Group raised>
                <Segment>
                    <Header as='h3'>{this.props.intl.formatMessage({ id: 'UserManagement' })}</Header>
                </Segment>
                <Segment loading={loading}>
                    {/* 提示消息 */}
                    {/* {this.tipMessage()} */}
                    <TipMessage />

                    {/* 数据表格 */}
                    <DataTable config={this.tableConfig} data={data} />
                </Segment>

                {/* 添加用户弹出框 */}
                <FormDialog size='tiny' isOpen={this.state.isModalOpen} config={this.addFormConfig} />

                {/* 编辑用户弹出框 */}
                <FormDialog size='tiny' isOpen={this.state.isEditModalOpen} config={this.state.editFormConfig} />

                {/* 绑定角色弹出框 */}
                <BindRoleDialog size='small' rowData={this.state.bindUser} isOpen={this.state.isBindRoleOpen}
                    onClose={this.closeBindRoleModel} onSave={this.bindRoles} />
            </Segment.Group>
        )
    }
}

export default injectIntl(withTipContext(UserManagement))