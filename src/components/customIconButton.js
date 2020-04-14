import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { IconButton } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

class customIconButton extends Component {
    constructor() {
        super()
    }
    render() {
        const icon = this.props.type === 'material' ?
            <MaterialIcons name={this.props.name} style={{ ...this.props.style }} />
            : <Ionicons name={this.props.name} style={{ ...this.props.style }} />

        return (
            <IconButton
                icon={() => icon}
                onPress={() => this.props.onPress()}>
            </IconButton>
        )
    }
}
export default customIconButton
const styleThis = StyleSheet.create({
})
