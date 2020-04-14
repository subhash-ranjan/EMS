import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { ProgressBar, Text } from 'react-native-paper'
import { Transition, Transitioning } from "react-native-reanimated"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const DEVICE_WIDTH = Dimensions.get("window").width

class progressBar extends Component {
    constructor() {
        super()
        this.state = {}
        this.ref = React.createRef()
    }
    transition = (
        <Transition.Together>
            <Transition.In
                type="slide-top"
                durationMs={500}
                interpolation="linear" />
            <Transition.Out
                type="slide-top"
                durationMs={500}
                interpolation="linear" />
        </Transition.Together>
    )
    render() {
        return (
            <Transitioning.View
                ref={this.ref}
                transition={this.transition}
                style={styleThis.transitionContainer}
            >
                {
                    this.props.isLoading &&
                    <View style={styleThis.container}>
                        <ProgressBar indeterminate animating color={Color.indigo800} style={styleThis.progressbar} />
                        <View>
                            <Text style={{ margin: 8, color: this.props.isSuccess ? Color.green600 : Color.gray800 }}>{this.props.loaderText}</Text>
                            {/* <View style={styleThis.successBox}>
                                    <MaterialIcons name="check-circle" style={styleThis.successText} />
                                    <Text style={styleThis.successText}>Saved</Text>
                                </View> */}
                        </View>
                    </View>
                }
            </Transitioning.View>
        )
    }
    componentDidMount = () => {
        //this.ref.current.animateNextTransition()
    }
    componentDidUpdate = () => {
        this.ref.current.animateNextTransition()
    }
}
export default progressBar

const styleThis = StyleSheet.create({
    transitionContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: DEVICE_WIDTH,
        backgroundColor: Color.gray300
    },
    progressbar: {
        width: DEVICE_WIDTH,
    },
    successBox: {
        ...Common.flexRow,
        width: 80,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    successText: {
        fontSize: 18,
        color: Color.green600
    }
})
