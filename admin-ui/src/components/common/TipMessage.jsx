import React, { Component } from 'react'
import { TipContext } from './context/Context'
import { Message, Icon } from 'semantic-ui-react'

class TipMessage extends Component {

    render() {
        return (
            <TipContext.Consumer>
                {
                    context => <Message color={context.tipColor} hidden={!context.isTipVisiable} >
                                    <Icon name={context.tipIcon} loading={context.isTipLoading} />
                                    {context.tipMessage}
                                </Message>
                }
                
            </TipContext.Consumer>
        )
    }
}

export default TipMessage