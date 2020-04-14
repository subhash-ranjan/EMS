import React from 'react'
import { Common, Color } from 'src/styles/main'
import { View, Text, Image, ImageBackground, Dimensions, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native'
const DEVICE_WIDTH = Dimensions.get("window").width
let count = 0
export default class carousal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            imgPos1: 0,
            imgPos2: DEVICE_WIDTH,
            imgPos3: DEVICE_WIDTH,
            imgOpacity1: 1,
            imgOpacity2: 0,
            imgOpacity3: 0,
        }
    }
    render() {
        return (
            <View style={{ height: 200 }}>
                <Image
                    source={this.props.images[0]}
                    style={[styleThis.scrollImg,
                    {
                        resizeMode: this.props.isContainMode ? 'contain' : 'stretch',
                        left: this.state.imgPos1, opacity: this.state.imgOpacity1
                    }]}>
                </Image>
                <Image
                    source={this.props.images[1]}
                    style={[styleThis.scrollImg,
                    {
                        resizeMode: this.props.isContainMode ? 'contain' : 'stretch',
                        left: this.state.imgPos2, opacity: this.state.imgOpacity2
                    }]}>

                </Image>

                <Image
                    source={this.props.images[2]}
                    style={[styleThis.scrollImg,
                    {
                        resizeMode: this.props.isContainMode ? 'contain' : 'stretch',
                        left: this.state.imgPos3, opacity: this.state.imgOpacity3
                    }]}>

                </Image>
                <View style={[styleThis.paginationDiv, { bottom: 10 }]}>
                    {
                        [1, 2, 3].map((i) => {
                            return (
                                <View
                                    key={i}
                                    style={[styleThis.whiteCircle,
                                    { opacity: i === this.state.selectedIndex + 1 ? 1.5 : .5 }]}
                                >
                                </View>)
                        })
                    }
                </View>

            </View >
        )
    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.toggleLayoutHeight()
        }, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.intervalId)
    }
    toggleLayoutHeight = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)//easeInEaseOut
        if (count > 2) {
            count = 0
        }
        switch (count) {
            case 0:
                this.setState({
                    selectedIndex: 0,
                    imgPos1: 0,
                    imgOpacity1: 1,

                    imgPos2: DEVICE_WIDTH,
                    imgPos3: DEVICE_WIDTH,

                    imgOpacity2: 0,
                    imgOpacity3: 0,

                })
                break

            case 1:

                this.setState({
                    selectedIndex: 1,

                    imgPos2: 0,
                    imgOpacity2: 1,

                    imgPos1: DEVICE_WIDTH,
                    imgPos3: DEVICE_WIDTH,

                    imgOpacity1: 0,
                    imgOpacity3: 0,
                })

                break

            case 2:

                this.setState({
                    selectedIndex: 2,

                    imgPos3: 0,
                    imgOpacity3: 1,

                    imgPos1: DEVICE_WIDTH,
                    imgPos2: DEVICE_WIDTH,

                    imgOpacity1: 0,
                    imgOpacity2: 0,
                })

                break
        }

        count++

    }
}

const styleThis = StyleSheet.create({

    scrollImg: {
        height: 200,
        width: '100%',
        position: 'absolute'
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