import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl'

class ActionCellRenderer extends Component {
    
    invokeEdit = () => {
        this.props.context.parentComp.openEditUserModal(this.props)
    }

    invokeDelete = () => {
        this.props.context.parentComp.deleteRow(this.props.data)
    }

    invokeBindRole = () => {
        this.props.context.parentComp.bindRoles(this.props.data)
    }

    render() {
        return (
            <div>
                <Button basic size='tiny' onClick={this.invokeEdit}>
                    <Icon color='blue' name='edit' />
                    {this.props.intl.formatMessage({ id: 'Edit' })}
                </Button>
                <Button basic size='tiny' onClick={this.invokeDelete}>
                    <Icon color='red' name='delete' />
                    {this.props.intl.formatMessage({ id: 'Delete' })}
                </Button>
                <Button basic size='tiny' onClick={this.invokeBindRole}>
                    <Icon color='blue' name='user outline' />
                    {this.props.intl.formatMessage({ id: 'BindRoles' })}
                </Button>
            </div>
        )
    }
}

export default injectIntl(ActionCellRenderer)