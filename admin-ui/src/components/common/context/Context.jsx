import React, { Component, createContext } from 'react'

const TipContext = createContext({})

class TipContextProvider extends Component {

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

const withTipContext = Component => {
    return props => {
        return (
            <TipContext.Consumer>
                {context => <Component {...props} tipContext={context} />}
            </TipContext.Consumer>
        )
    }
}

export { TipContext, TipContextProvider, withTipContext }