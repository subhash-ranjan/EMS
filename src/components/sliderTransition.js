import React from 'react'
import { Color } from 'src/styles/main'
import { View, Text, Dimensions, StyleSheet, ImageBackground } from 'react-native'
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
                durationMs={2000}
                interpolation='easeInOut'
            />
            <Transition.Out
                type="slide-left"
                durationMs={2000}
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
                    {
                        this.state.index == 0 &&
                        <ImageBackground source={this.props.images[0]} style={{ ...styleThis.scrollImg }} />
                    }
                    {
                        this.state.index == 1 &&
                        <ImageBackground source={this.props.images[1]} style={{ ...styleThis.scrollImg }} />
                    }
                    {
                        this.state.index == 2 &&
                        <ImageBackground source={this.props.images[2]} style={{ ...styleThis.scrollImg }} />
                    }
                    <View style={[styleThis.paginationDiv, { bottom: 10 }]}>
                        {
                            [0, 1, 2].map((i) => {
                                return (
                                    <View
                                        key={i}
                                        style={[styleThis.whiteCircle,
                                        { opacity: i === this.state.index ? 1 : .5 }]}
                                    >
                                    </View>)
                            })
                        }
                    </View>
                </View>
            </Transitioning.View>
        )
    }

    componentDidMount = () => {
        this.ref.current.animateNextTransition()
        this.intervalId = setInterval(() => {
            this.ref.current.animateNextTransition()
            this.setState({ index: this.state.index == 2 ? 0 : this.state.index + 1 })
        }, 4000)
    }
    componentDidUpdate = () => {
        this.ref.current.animateNextTransition()
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
        height: 8,
        width: 8,
        borderRadius: 3,
        margin: 5,
        backgroundColor: Color.gray800
    }
})