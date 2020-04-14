import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { IconButton } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class customIconButton extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <IconButton
                icon={() => (
                    <MaterialIcons
                        name={this.props.name}
                        style={{ ...this.props.style }}
                    />
                )}
                onPress={() => this.props.onPress()}>
            </IconButton>
        )
    }
}
export default customIconButton

const styleThis = StyleSheet.create({

})
