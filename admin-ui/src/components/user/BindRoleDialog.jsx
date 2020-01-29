import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { Modal, Button, Checkbox } from 'semantic-ui-react'
import Http from '../../utils/Request'
import * as ld from 'lodash'

class BindRoleDiaog extends Component {
    state = {
        allRoles: [],
        selectedRoles: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { rowData } = nextProps
        const { allRoles, data } = prevState
        if (!ld.isEqual(rowData, data)) {
            let selectedRoles = []
            if (rowData) {
                selectedRoles = ld.intersectionBy(rowData.data.roles, allRoles, 'name')
            }
            return {
                ...prevState,
                data: rowData,
                selectedRoles: selectedRoles
            }
        }
        return null
    }

    componentDidMount() {
        Http.get('/userservice/role').then(res => {
            this.setState({
                allRoles: res.data,
            })
        }).catch(err => {
            console.error('Unable to get all roles from server: ', err)
        })
    }

    isSelected = (role, selectedRoles) => {
        let isSelected = false
        selectedRoles.forEach(r => {
            if (r.name === role.name) {
                isSelected = true
            }
        })
        return isSelected
    }

    toggleCheck = (e, data, role) => {
        const { selectedRoles } = this.state
        let newSelectedRoles = [...selectedRoles]
        if (data.checked) {
            if (!this.isSelected(role, newSelectedRoles)) {
                newSelectedRoles.push(role)
            }
        } else {
            if (this.isSelected(role, newSelectedRoles)) {
                ld.remove(newSelectedRoles, (r) => role.name === r.name)
            }
        }
        this.setState({
            selectedRoles: newSelectedRoles
        })
    }

    render() {
        const { isOpen, size, onClose, onSave, rowData } = this.props
        const { allRoles, selectedRoles, data } = this.state

        let content = 'No roles found'
        let roleDivs = []
        allRoles.forEach(role => {
            let checked = false
            if (rowData) {
                rowData.data.roles.forEach(hadRole => {
                    if (hadRole.name === role.name) {
                        checked = true
                    }
                })
            }
            roleDivs.push(
                <div key={role.id} style={{ margin: '6px 0 0 12px' }}>
                    <Checkbox label={role.name} defaultChecked={checked}
                        onChange={(e, data) => { this.toggleCheck(e, data, role) }} />
                </div>
            )
        })

        content = (
            <div>
                <div style={{ margin: '10px 0' }}>用户：{rowData ? rowData.data.username : 'Unknown'}</div>
                <div style={{ margin: '10px 0 6px 0' }}>绑定角色：</div>
                <div>{roleDivs}</div>
            </div>
        )

        return (
            <Modal
                size={size}
                open={isOpen}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                onClose={onClose}
                dimmer='inverted'
            >
                <Modal.Header>{this.props.intl.formatMessage({ id: 'BindRoles' })}</Modal.Header>
                <Modal.Content>
                    {content}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={onClose} color='red' content={this.props.intl.formatMessage({ id: 'Cancel' })} />

                    <Button onClick={(e, param) => onSave({
                        event: e,
                        param: param,
                        data: data,
                        selectedRoles: selectedRoles
                    })} color='green' icon='checkmark' labelPosition='right'
                        content={this.props.intl.formatMessage({ id: 'Save' })}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default injectIntl(BindRoleDiaog)