import React, { Component } from 'react'
import { Menu, Dropdown, Segment, Button, Form } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import { withIntlContext } from '../context'
import './login.css'

class Login extends Component {

    login = (e, data) => {
        const { username, password } = data
        console.log(username, password)
    }

    intlCtx = () => {
        return this.props.intlCtx
    }

    changeLang = (lang) => {
        this.intlCtx().changeLang(lang)
    }

    formDefs = [
        {
            label: 'login.username', field: 'username', placeholder: 'User Name',
            required: true, requiredText: 'User Name is mandatory'
        },
        {
            label: 'login.password', field: 'password', placeholder: 'Password',
            type: 'password',
            required: true, requiredText: 'Password is mandatory'
        }
    ]

    loginFormConfig = {
        headerText: 'LoginSystem',
        formColumns: 1,
        forms: this.formDefs,
        actions: [
            {
                text: 'Login',
                color: 'blue',
                onClick: this.login,
                checkRequired: true,
                clearForm: true,
                icon: {
                    name: 'sign-in',
                    position: 'right'
                }
            }
        ]
    }



    render() {
        console.log('login')
        return (
            <div>
                <div className='login-menu'>
                    <Menu secondary>
                        <Menu.Menu position='right'>
                            <Dropdown item text={this.props.intl.formatMessage({ id: 'lang' })}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.changeLang('zh')}
                                        active={this.intlCtx().lang === 'zh'}>
                                        {this.props.intl.formatMessage({ id: 'zh' })}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.changeLang('en')}
                                        active={this.intlCtx().lang === 'en'}>
                                        {this.props.intl.formatMessage({ id: 'en' })}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Menu>
                </div>
                <div className='login-bg'>
                    <div className='login-form'>
                        <div className='login-form-header'>
                            {this.props.intl.formatMessage({ id: 'LoginSystem' })}
                        </div>
                        <div className='login-form-content'>
                            <Form onSubmit={this.login}>
                                <Form.Group>
                                    <Form.Input required={true}
                                        label={this.props.intl.formatMessage({ id: 'login.username' })}
                                        placeholder='User Name'
                                        className='custom-form-input-full'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input required={true}
                                        label={this.props.intl.formatMessage({ id: 'login.password' })}
                                        placeholder='Password'
                                        type='password'
                                        className='custom-form-input-full'
                                    />
                                </Form.Group>
                                <Button type='submit'>
                                    {this.props.intl.formatMessage({ id: 'Login' })}
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withIntlContext(injectIntl(Login))