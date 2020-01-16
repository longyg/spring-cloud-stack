import React, { Component, createContext } from 'react'

export const TipContext = createContext({})
export const IntlContext = createContext({})

export class TipContextProvider extends Component {

    closeTip = () => {
        this.setState({
            isTipVisiable: false
        })
    }

    showTip = (content, color, icon, loading, autoclose) => {
        this.setState({
            isTipVisiable: true,
            tipMessage: content,
            tipColor: color,
            tipIcon: icon,
            isTipLoading: loading
        }, () => {
            if (autoclose) {
                setTimeout(this.closeTip, 3000)
            }
        })
    }

    showSavingTip = () => {
        this.showTip('Saving...', 'blue', 'spinner', true)
    }

    showSavedTip = () => {
        this.showTip('Saved successfully', 'green', 'check circle', false, true)
    }

    showDeletingTip = () => {
        this.showTip('Deleting...', 'blue', 'spinner', true)
    }

    showDeletedTip = () => {
        this.showTip('Deleted successfully', 'green', 'check circle', false, true)
    }

    showErrorTip = (err) => {
        this.showTip('Error: [' + err.response.data.error + ': ' + err.response.data.message + ']', 'red', 'x', false, true)
    }

    showNoRowSelectedTip = () => {
        this.showTip('You have not selected any data', 'orange', 'warning sign', false, true)
    }

    state = {
        tipColor: 'blue',
        isTipVisiable: false,
        tipIcon: '',
        isTipLoading: false,
        tipMessage: '',
        showTip: this.showTip,
        closeTip: this.closeTip,
        showSavingTip: this.showSavingTip,
        showDeletingTip: this.showDeletingTip,
        showSavedTip: this.showSavedTip,
        showDeletedTip: this.showDeletedTip,
        showErrorTip: this.showErrorTip,
        showNoRowSelectedTip: this.showNoRowSelectedTip
    }

    render() {
        return (
            <TipContext.Provider value={this.state}>
                {this.props.children}
            </TipContext.Provider>
        )
    }
}

export class IntlContextProvider extends Component {
    changeLang = (lang) => {
        // 保存语言设置
        localStorage.setItem('lang', lang)
        this.setState({
            lang: lang
        })
    }

    getDefaultLang = () => {
        let locale = 'en'
        let browerLocale = navigator.language.split('-')[0]
        let storedLocale = localStorage.getItem('lang')
        if (storedLocale) {
            locale = storedLocale
        } else if (browerLocale === 'zh') {
            locale = browerLocale
        }
        return locale
    }

    state = {
        lang: this.getDefaultLang(),
        changeLang: this.changeLang
    }

    render() {
        return (
            <IntlContext.Provider value={this.state}>
                {this.props.children}
            </IntlContext.Provider>
        )
    }
}

export const withTipContext = Component => {
    return props => {
        return (
            <TipContext.Consumer>
                {context => <Component {...props} tipCtx={context} />}
            </TipContext.Consumer>
        )
    }
}

export const withIntlContext = Component => {
    return props => {
        return (
            <IntlContext.Consumer>
                {context => <Component {...props} intlCtx={context} />}
            </IntlContext.Consumer>
        )
    }
}