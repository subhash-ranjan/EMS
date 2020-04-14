import React from 'react'
import { Color } from 'src/styles/main'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { Transition, Transitioning } from "react-native-reanimated"
const DEVICE_WIDTH = Dimensions.get("window").width
export default class carousal extends React.Component {
    constructor(props) {
        super(props)
        this.state = { index: 0 }
        this.ref = React.createRef()
    }
    transition = (
        <Transition.Together>
            <Transition.In
                type="slide-right"
                durationMs={200}
                interpolation='easeInOut'
            />
            <Transition.Change
                type="slide-right"
                durationMs={300}
                interpolation="easeInOut" />
        </Transition.Together>
    )
    render() {
        return (
            <Transitioning.View
                ref={this.ref}
                transition={this.transition}
                style={styleThis.transitionContainer}
            >
                <View style={{ height: 200 }}>
                    <Image
                        source={this.props.images[this.state.index]}
                        style={{ ...styleThis.scrollImg }}>
                    </Image>
                </View>
            </Transitioning.View>
        )
    }

    componentDidMount = () => {
        this.intervalId = setInterval(() => {
            this.setState({ index: this.state.index == 3 ? 0 : this.state.index++ })
        }, 3000)
    }
    componentWillUnmount = () => {
        clearInterval(this.intervalId)
    }
}

const styleThis = StyleSheet.create({
    scrollImg: {
        height: 200,
        width: '100%',
        //position: 'absolute'
    },
    paginationDiv: {
        position: 'absolute',
        height: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteCircle: {
        height: 7,
        width: 7,
        borderRadius: 3,
        margin: 5,
        backgroundColor: 'gray'
    }
})