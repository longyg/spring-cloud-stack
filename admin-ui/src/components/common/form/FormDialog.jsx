import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import { Modal, Button, Form } from 'semantic-ui-react'

class FormDialog extends Component {
    state = {
        isOpen: false,
        size: 'tiny',
        config: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { isOpen, size, config } = prevState
        if (nextProps.isOpen !== isOpen || nextProps.size !== size || nextProps.config !== config) {
            let formState = {}
            if (nextProps.config) {
                nextProps.config.forms.forEach(formConfig => {
                    const { field } = formConfig
                    formState[field] = {
                        errorState: false,
                        value: formConfig.defaultValue ? formConfig.defaultValue : null
                    }
                })
            }
            return {
                ...prevState,
                isOpen: nextProps.isOpen,
                size: nextProps.size,
                config: nextProps.config,
                formState: formState
            }
        }
        return null
    }

    close = () => {
        this.setState({
            isOpen: false
        })
    }

    textInputChange = (e, data, formConfig) => {
        const { field, required, requiredText } = formConfig
        let errorState
        let formState = { ...this.state.formState }
        if (required) {
            if (!data.value || data.value === '') {
                if (requiredText && requiredText !== '') {
                    errorState = { content: requiredText }
                } else {
                    errorState = true
                }

            }
        }
        formState[field] = {
            error: errorState,
            value: data.value
        }
        this.setState({
            formState: formState
        })
    }

    formInput = (formConfig, config, index) => {
        const { field, required, label, placeholder, type, defaultValue } = formConfig
        let fieldState = this.state.formState ? this.state.formState[`${field}`] : undefined
        const error = fieldState ? fieldState.error : undefined
        const value = fieldState ? fieldState.value : defaultValue
        return (
            <Form.Input key={`form-input-${index}`} error={error} required={required}
                label={this.props.intl.formatMessage({ id: label })}
                placeholder={placeholder}
                // className={this.formClass(config)}
                defaultValue={value}
                onChange={(e, data) => this.textInputChange(e, data, formConfig)}
                type={type}
            />
        )
    }

    forms = (config) => {
        let fLength = config.forms.length
        let cLength = config.formColumns
        let n = Math.ceil(fLength / cLength)
        let formGroups = []
        for (var i = 0; i < n; i++) {
            let last = Math.min((i + 1) * cLength, fLength)
            let formInputs = []
            for (var j = i * cLength; j < last; j++) {
                let formConfig = config.forms[j]
                formInputs.push(
                    this.formInput(formConfig, config, j)
                )
            }
            formGroups.push(
                <Form.Group key={`form-group-${i}`} widths='equal'>
                    {formInputs}
                </Form.Group>
            )
        }
        return (
            <Form>
                {formGroups}
            </Form>
        )
    }

    actions = (config) => {
        const { actions } = config
        let actionBtns = []
        actions.forEach(action => {
            const { text, color, icon } = action
            actionBtns.push(
                <Button
                    key={`action-btn-${text}`}
                    onClick={(e) => this.onActionClick(e, action, config, this.state.formState)}
                    color={color}
                    content={this.props.intl.formatMessage({ id: text })}
                    icon={icon && icon.name ? icon.name : undefined}
                    labelPosition={icon && icon.position ? icon.position : undefined}
                >
                </Button>
            )
        })

        return actionBtns
    }

    getFieldValue = (field, formState) => {
        let fieldState = formState ? this.state.formState[`${field}`] : undefined
        return fieldState ? fieldState.value : undefined
    }

    checkRequired = (config, formState) => {
        const { forms } = config

        let state = { ...formState }
        let passed = true

        forms.forEach(formConfig => {

            const { field, required, requiredText } = formConfig
            const value = this.getFieldValue(field, formState)

            if (required) {
                if (!value || value === '') {
                    passed = false
                    let errorState
                    if (requiredText && requiredText !== '') {
                        errorState = { content: requiredText }
                    } else {
                        errorState = true
                    }
                    state[field] = {
                        error: errorState,
                        value: value
                    }
                }
            }
        })
        if (!passed) {
            this.setState({
                formState: state
            })
        }

        return passed
    }

    onActionClick = (e, action, config, formState) => {
        const { onClick, checkRequired, clearForm } = action
        if (checkRequired) {
            const passed = this.checkRequired(config, formState)
            if (!passed) {
                return
            }
        }
        // call onclick action
        onClick(e, formState, config)

        if (clearForm) {
            this.setState({
                formState: undefined
            })
        }
    }

    render() {
        const { isOpen, size, config } = this.state
        return (
            config ?
            <Modal
                size={size}
                open={isOpen}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                onClose={this.close}
                dimmer='inverted'
            >
                <Modal.Header>{this.props.intl.formatMessage({ id: config.headerText })}</Modal.Header>
                <Modal.Content>
                    {this.forms(config)}
                </Modal.Content>
                <Modal.Actions>
                    {this.actions(config)}
                </Modal.Actions>
            </Modal>
            : null
        )
    }
}

export default injectIntl(FormDialog)

