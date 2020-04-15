import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { IconButton } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

class customIconButton extends Component {
    constructor() {
        super()
    }
    render() {
        const _icon = this.getIcon()
        return (
            <IconButton
                icon={() => _icon}
                style={{ padding: 0, margin: 0 }}
                onPress={() => this.props.onPress()}>
            </IconButton>
        )
    }
    getIcon = () => {
        switch (this.props.type) {
            case 'material':
                return <MaterialIcons name={this.props.name} style={{ ...this.props.style }} />
                break
            case 'material_com':
                return <MaterialCommunityIcons name={this.props.name} style={{ ...this.props.style }} />
                break
            case 'ionicons':
                return <Ionicons name={this.props.name} style={{ ...this.props.style }} />
                break
            default:
                <MaterialIcons name={this.props.name} style={{ ...this.props.style }} />
                break
        }
    }
}
export default customIconButton
const styleThis = StyleSheet.create({
})
