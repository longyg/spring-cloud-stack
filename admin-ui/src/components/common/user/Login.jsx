import React, { Component } from 'react'
import { Menu, Dropdown, Button, Form, Icon } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import { withIntlContext } from '../context'
import './login.css'
import * as Auth from '../../../utils/Auth'
import { withRouter } from 'react-router-dom'
import TipMessage from '../TipMessage'
import { withTipContext } from '../context'

class Login extends Component {

    state = {
        formLoading: false,
        username: '',
        password: '',
        usernameError: false,
        passwordError: false
    }

    errMsgs = {
        username: 'User Name is mandatory',
        password: 'Password is mandatory'
    }

    handleChange = (e, { name, value }) => {
        let errAttr = name + 'Error'
        if (!value || value === '') {
            this.setState({
                [errAttr]: this.errMsgs[name],
                [name]: value
            })
        } else {
            this.setState({
                [errAttr]: false,
                [name]: value
            })
        }

    }

    handleSubmit = () => {
        const { username, password } = this.state
        let userErr = false
        let passErr = false
        if (!username || username === '') {
            userErr = this.errMsgs.username
        }
        if (!password || password === '') {
            passErr = this.errMsgs.password
        }
        if (userErr || passErr) {
            this.setState({
                usernameError: userErr,
                passwordError: passErr
            })
            return
        }
        this.login(username, password)
    }

    login = (username, password) => {
        Auth.login(username, password).then(res => {
            this.tipCtx().showTip('Login successfully, will redirect to homepage automatically', 'green', 'check circle', false, true)
            setTimeout(() => {
                this.props.history.push('/a/home')
            }, 2000)
        }).catch(err => {
            this.tipCtx().showTip('Login failed: ' + JSON.stringify(err), 'red', 'x', false, true)
        })
    }

    intlCtx = () => {
        return this.props.intlCtx
    }

    tipCtx = () => {
        return this.props.tipCtx
    }

    changeLang = (lang) => {
        this.intlCtx().changeLang(lang)
    }

    render() {
        const { username, password, usernameError, passwordError, formLoading } = this.state
        return (
            <div>
                <div className='login-menu'>
                    <Menu secondary>
                        <Menu.Menu position='right'>
                            <Dropdown item trigger={
                                <span>
                                    <Icon name='world' />{this.props.intl.formatMessage({ id: 'lang' })}
                                </span>
                            }>
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
                    <div className='login-tip'>
                        <TipMessage />
                    </div>
                </div>

                <div className='login-bg'>
                    <div className='login-form'>
                        <div className='login-form-header'>
                            {this.props.intl.formatMessage({ id: 'LoginSystem' })}
                        </div>
                        <div className='login-form-content'>
                            <Form loading={formLoading}>
                                <Form.Group>
                                    <Form.Input error={usernameError} required={true}
                                        label={this.props.intl.formatMessage({ id: 'login.username' })}
                                        placeholder='User Name'
                                        className='custom-form-input-full'
                                        name='username'
                                        value={username}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input error={passwordError} required={true}
                                        label={this.props.intl.formatMessage({ id: 'login.password' })}
                                        placeholder='Password'
                                        type='password'
                                        className='custom-form-input-full'
                                        name='password'
                                        value={password}
                                        onChange={this.handleChange}
                                        autoComplete="on"
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='login-form-action'>
                            <Button onClick={this.handleSubmit} color='blue'
                                icon='sign-in' labelPosition='right'
                                content={this.props.intl.formatMessage({ id: 'Login' })}>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(withTipContext(withIntlContext(injectIntl(Login))))