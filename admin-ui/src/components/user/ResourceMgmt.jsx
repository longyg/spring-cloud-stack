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

class ResourceMgmt extends Component {
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
        Http.get('/userservice/resource').then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
    }

    openAddModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    openEditModal = (e, rowData) => {
        let editFormConfig = this.setFormConfig(this.editFormConfig, rowData)
        this.setState({
            editFormConfig: editFormConfig,
            isEditModalOpen: true
        })
    }

    openBindRoleModal = (e, rowData) => {
        this.setState({
            bindData: rowData,
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
        Http.delete('/userservice/resource', {
            data: toDel
        }).then(res => {
            this.tipCtx().showDeletedTip()
            this.fetchData()
        }).catch(err => {
            this.tipCtx().showErrorTip(err)
        })
    }

    add = (e, data) => {
        const { url, name } = data

        const obj = {
            url: url ? url.value : '',
            name: name ? name.value : ''
        }

        this.setState({
            isModalOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.post('/userservice/resource', obj).then(res => {
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

    edit = (e, data, config) => {
        const { url, name } = data

        if (!config.rowData || !config.rowData.data) {
            return
        }

        const id = config.rowData.data.id
        let obj = {
            id: id,
            url: url ? url.value : '',
            name: name ? name.value : ''
        }

        this.setState({
            isEditModalOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.put('/userservice/resource', obj).then(res => {
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
        let data = params.data.data
        data.roles = params.selectedRoles

        this.setState({
            isBindRoleOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.put('/userservice/resource/role', data).then(res => {
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
            { name: 'URL', field: 'url' },
            { name: 'Name', field: 'name' },
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
                onClick: this.openEditModal
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
                onClick: this.openAddModal
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
            label: 'URL', field: 'url', placeholder: 'URL',
            required: true, requiredText: 'URL is mandatory'
        },
        {
            label: 'Name', field: 'name', placeholder: 'Name',
            required: true, requiredText: 'Name is mandatory'
        }
    ]

    addFormConfig = {
        headerText: 'AddResource',
        formColumns: 1,
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
                onClick: this.add,
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
        headerText: 'EditResource',
        formColumns: 1,
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
                onClick: this.edit,
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
                    <Header as='h3'>{this.props.intl.formatMessage({ id: 'ResourceManagement' })}</Header>
                </Segment>
                <Segment loading={loading}>
                    {/* 提示消息 */}
                    {/* {this.tipMessage()} */}
                    <TipMessage />

                    {/* 数据表格 */}
                    <DataTable config={this.tableConfig} data={data} />
                </Segment>

                {/* 添加弹出框 */}
                <FormDialog size='tiny' isOpen={this.state.isModalOpen} config={this.addFormConfig} />

                {/* 编辑弹出框 */}
                <FormDialog size='tiny' isOpen={this.state.isEditModalOpen} config={this.state.editFormConfig} />

                {/* 绑定角色弹出框 */}
                <BindRoleDialog size='small' rowData={this.state.bindData} isOpen={this.state.isBindRoleOpen}
                    onClose={this.closeBindRoleModel} onSave={this.bindRoles} />
            </Segment.Group>
        )
    }
}

export default injectIntl(withTipContext(ResourceMgmt))