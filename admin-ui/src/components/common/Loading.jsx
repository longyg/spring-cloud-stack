import React, { Component } from 'react'
import { Segment, Header, Modal, Button, Form } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'

class Loading extends Component {

    

    render() {
        return (
            <Modal
                size='mini'
                open={this.state.isModalOpen}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                onClose={this.closeModal}
            >
                <Modal.Content>
                    Loading
                </Modal.Content>
            </Modal>
        )
    }
}

export default injectIntl(Loading)