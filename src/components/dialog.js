
import React, { Component } from 'react'
import { View } from 'react-native'
import { Dialog, Portal, Paragraph, Button } from 'react-native-paper'

class dialog extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Portal>
                <Dialog
                    visible={this.props.visible}
                    onDismiss={this.props.hideDialog}
                    style={{ bottom: 0 }}>
                    <Dialog.Title>Alert</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>This is simple dialog</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={this.props.hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }
}
export default dialog
{/* <Dialog
    visible={this.state.isDialogOpen}
    showDialog={() => { this.setState({ isDialogOpen: true }) }}
    hideDialog={() => { this.setState({ isDialogOpen: false }) }}
/> */}


