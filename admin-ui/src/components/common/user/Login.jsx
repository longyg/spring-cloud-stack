import React, { Component } from 'react'
import { FormDialog } from '../form/FormDialog'

export default class Login extends Component {

    render() {
        return (
            <div className='login-bg'>
                <FormDialog size='tiny' isOpen={this.state.isModalOpen} config={this.addFormConfig} />
            </div>
        )
    }
}