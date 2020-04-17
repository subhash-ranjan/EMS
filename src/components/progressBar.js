import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { ProgressBar, Caption } from 'react-native-paper'
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
                durationMs={200}
                interpolation="linear" />
            <Transition.Out
                type="slide-top"
                durationMs={200}
                interpolation="linear" />
        </Transition.Together>
    )
    render() {
        return (
            <Transitioning.View
                ref={this.ref}
                transition={this.transition}
                style={{
                    ...styleThis.transitionContainer,
                    height: this.props.height
                }}
            >
                {
                    this.props.isLoading &&
                    <View style={styleThis.container}>
                        <ProgressBar indeterminate animating color={Color.indigo800} style={styleThis.progressbar} />
                        {
                            this.props.isLoading && this.props.isLoaderText &&
                            <View style={{ ...styleThis.textContainer }}>
                                <Caption style={{ paddingVertical: 5 }}> Saving data..</Caption>
                            </View>
                        }
                    </View >
                }
            </Transitioning.View>
        )
    }
    componentDidMount = () => {
    }
    componentDidUpdate = () => {
        this.ref.current.animateNextTransition()
    }
}
export default progressBar

const styleThis = StyleSheet.create({
    transitionContainer: {
        backgroundColor: Color.ingigo100
    },
    container: {
        ...Common.flexColumn,
        ...Common.alignStart,
        width: DEVICE_WIDTH,
    },
    progressbar: {
        width: DEVICE_WIDTH,
    },
    textContainer: {
        ...Common.flexColumn,
        ...Common.alignCenter,
        width: DEVICE_WIDTH,
    }
})
