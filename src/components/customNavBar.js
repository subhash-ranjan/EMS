import React from 'react'
import { Text, TouchableOpacity, View, Dimensions, StyleSheet, Platform } from 'react-native'
import { Color } from 'src/styles/main'
import Entypo from 'react-native-vector-icons/Entypo'

class CustomNavBar extends React.Component {
    render() {
        const { activeType, types } = this.props
        return (
            <View style={[styleThis.toggleWrapper]}>
                {types.map((navbarType, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => this.props.onToggle(navbarType)}
                            style={[
                                styleThis.toggleComponent,
                                types.length !== index + 1 && { borderRightWidth: 1 },
                                navbarType === activeType && { backgroundColor: Color.primary },
                                //needed to incorporate 2 tabs
                                types.length == 2 && { flex: 1 / 2 },
                            ]}
                        >
                            <Entypo name={navbarType} style={[styleThis.icons, navbarType === activeType && { color: Color.white }]} />
                            {/* <Text style={[styleThis.toggleText, navbarType === activeType && { color: Color.white }]}>
                                {navbarType}
                            </Text> */}
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default CustomNavBar

const styleThis = StyleSheet.create({
    toggleWrapper: {
        height: 35,
        borderRadius: 15,//Platform.OS === 'ios' ? 15 : 0, // Android has choppy radius issue - https://github.com/facebook/react-native/issues/17267
        borderWidth: 1,
        borderColor: Color.primary,
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: 12.5,
        width: 220
    },
    toggleComponent: {
        flex: 1 / 3,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.primary,
    },
    toggleText: {
        color: Color.primary,
    },
    icons: {
        fontSize: 25,
        color: Color.primary
    }
})
