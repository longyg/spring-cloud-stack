import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Http from '../../utils/Request'
import DataTable from '../common/table/DataTable';
import { injectIntl } from 'react-intl'
import FormDialog from '../common/form/FormDialog';
import { withTipContext } from '../common/context'
import TipMessage from '../common/TipMessage'

class RoleManagement extends Component {
    state = {
        data: [],
        loading: true,
        isModalOpen: false
    }

    componentDidMount = () => {
        this.fetchData()
    }

    tipCtx = () => {
        return this.props.tipCtx
    }

    fetchData = () => {
        Http.get('/userservice/role').then(res => {
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
        Http.delete('/userservice/role', {
            data: toDel
        }).then(res => {
            this.tipCtx().showDeletedTip()
            this.fetchData()
        }).catch(err => {
            this.tipCtx().showErrorTip(err)
        })
    }

    add = (e, data) => {
        const { name } = data

        const obj = {
            name: name ? name.value : ''
        }

        this.setState({
            isModalOpen: false
        }, () => {
            this.tipCtx().showSavingTip()
        })

        Http.post('/userservice/role', obj).then(res => {
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

    tableConfig = {
        // 是否显示checkbox列
        checkboxColumn: true,

        // 数据列定义
        columnDefs: [
            { name: 'Name', field: 'name' }
        ],

        // 操作列定义
        rowActions: [
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
            label: 'Name', field: 'name', placeholder: 'Name', 
            required: true, requiredText: 'Role Name is mandatory'
        }
    ]

    addFormConfig = {
        headerText: 'AddRole',
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

    render() {
        const { data, loading } = this.state
        return (
            <Segment.Group raised>
                <Segment>
                    <Header as='h3'>{this.props.intl.formatMessage({ id: 'RoleManagement' })}</Header>
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
            </Segment.Group>
        )
    }
}

export default injectIntl(withTipContext(RoleManagement))