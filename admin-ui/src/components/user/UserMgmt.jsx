import React, { Component } from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import Http from '../../utils/Request'
import { injectIntl } from 'react-intl'
import FormDialog from '../common/form/FormDialog';
import { withTipContext } from '../common/context'
import TipMessage from '../common/TipMessage'
import { AgGridReact } from 'ag-grid-react'
import ActionCellRenderer from './ActionCellRenderer'
import * as ld from 'lodash'

class UserMgmt extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            loading: true,
            isModalOpen: false,
            isEditModalOpen: false
        }

        this.columnDefs = [
            {
                headerName: props.intl.formatMessage({ id: 'Name' }),
                field: 'name', checkboxSelection: true, headerCheckboxSelection: true
            },
            { headerName: props.intl.formatMessage({ id: 'Address' }), field: 'address' },
            { headerName: props.intl.formatMessage({ id: 'Username' }), field: 'username' },
            { headerName: props.intl.formatMessage({ id: 'Role' }), field: 'roles', cellRenderer: 'roleRenderer' },
            {
                headerName: props.intl.formatMessage({ id: 'table-operation-title' }),
                cellRenderer: 'actionCellRenderer', width: 260
            }
        ]

        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowSelection: 'multiple',
            suppressCellSelection: true,
            paginationAutoPageSize: true,
            animateRows: true,
            pagination: true,
            context: {
                parentComp: this
            },
            frameworkComponents: {
                actionCellRenderer: ActionCellRenderer,
                roleRenderer: (props) => {
                    let roles = []
                    props.data.roles.forEach(role => {
                        roles.push(role.name)
                    })
                    let rolestr = ld.join(roles, ', ')
                    return (
                        <div>
                            {rolestr}
                        </div>
                    )
                }
            },
            defaultColDef: {
                sortable: true,
                filter: true
            }
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    tipCtx = () => {
        return this.props.tipCtx
    }

    gridReady = (params) => {
        this.gridApi = params.api
        this.gridColumnApi = params.columnApi
        this.gridApi.sizeColumnsToFit()
    }

    fetchData = () => {
        Http.get('/userservice/user').then(res => {
            this.setState({
                users: res.data,
                loading: false
            })
        })
    }

    openAddUserModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    openEditUserModal = (rowData) => {
        let editFormConfig = this.setFormConfig(this.editFormConfig, rowData)
        this.setState({
            editFormConfig: editFormConfig,
            isEditModalOpen: true
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

    delete = () => {
        let toDel = this.gridApi.getSelectedRows()
        if (toDel.length < 1) {
            this.tipCtx().showNoRowSelectedTip()
            return
        }
        this.deleteUsers(toDel)
    }

    deleteRow = (rowData) => {
        let toDel = []
        toDel.push(rowData)
        this.deleteUsers(toDel)
    }

    deleteUsers = (toDel) => {
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

    bindRoles = (data) => {
        console.log(data)
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
        const { users, loading } = this.state
        return (
            <Segment.Group raised>
                <Segment>
                    <Header as='h3'>{this.props.intl.formatMessage({ id: 'UserManagement' })}</Header>
                </Segment>
                <Segment loading={loading}>
                    {/* 提示消息 */}
                    {/* {this.tipMessage()} */}
                    <TipMessage />

                    <div className='header-actions'>
                        <Button basic size='tiny' onClick={this.openAddUserModal}>
                            <Icon color='green' name='add' />
                            {this.props.intl.formatMessage({ id: 'Add' })}
                        </Button>
                        <Button basic size='tiny' onClick={this.delete}>
                            <Icon color='red' name='delete' />
                            {this.props.intl.formatMessage({ id: 'Delete' })}
                        </Button>
                    </div>

                    {/* 数据表格 */}
                    <div style={{ height: 'calc(100vh - 370px)', minHeight: '353px' }} className='ag-theme-material'>
                        <AgGridReact
                            onGridReady={this.gridReady}
                            gridOptions={this.gridOptions}
                            rowData={users}
                        />
                    </div>
                </Segment>

                {/* 添加用户弹出框 */}
                <FormDialog size='tiny' isOpen={this.state.isModalOpen} config={this.addFormConfig} />

                {/* 编辑用户弹出框 */}
                <FormDialog size='tiny' isOpen={this.state.isEditModalOpen} config={this.state.editFormConfig} />
            </Segment.Group>
        )
    }
}

export default injectIntl(withTipContext(UserMgmt))