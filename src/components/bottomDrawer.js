import React, { Component } from 'react'
import { Text, View, Animated, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import CustomFlatList from 'src/components/customFlatList'
import { Color, Common } from 'src/styles/main'
import Icon from 'react-native-vector-icons/Ionicons'
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
let posY = 0
let isChange = false

class bottomDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animation: new Animated.Value(0),
        }
    }
    render() {
        const animatedStyle = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 500],
                        outputRange: [0, 500],
                    }),
                }
            ]
        }
        return (
            <Animated.View style={[styleThis.popup, animatedStyle]}>
                <View style={styleThis.topCurve}>
                    <View style={styleThis.popupClose}>
                        {/* <TouchableOpacity
                            title="Close Dialog"
                            style={[styleThis.buttonClose]}
                            onPress={this.props.handleOpen}>
                            <Icon name="ios-close" color={Color.gray800} size={45} style={styleThis.listRowItemMenu} />
                        </TouchableOpacity> */}
                        <View style={[styleThis.buttonClose]}>
                            <TouchableOpacity style={[styleThis.circle, {}]}
                                onPress={this.props.handleOpen}>
                                <Icon name="ios-close" color={Color.gray800} size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[styleThis.scrollMain, { height: '85%' }]}>
                    <CustomFlatList
                        data={this.props.data}
                        name={this.props.name}
                        isImage={false}
                        isPress={true}
                        isDetail={false}
                        isDelete={false}
                        isHeader={false}
                        isEdit={false}
                        onPress={(item, module) => this.props.onPress(item, module)}>
                    </CustomFlatList>
                </View>
            </Animated.View>
        )
    }
    componentDidUpdate = () => {
        if (isChange != this.props.isDrawerInvoked) {
            isChange = this.props.isDrawerInvoked
            posY == 0 ? (posY = -450) : (posY = 0)
            Animated.timing(this.state.animation, {
                toValue: posY,
                duration: 200,
                useNativeDriver: true,
            }).start()
        }
    }
}
export default bottomDrawer
const styleThis = StyleSheet.create({
    popup: {
        height: 400,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        zIndex: 100,
        bottom: -450
    },
    popupClose: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    scrollMain: {
        height: 300,
        borderWidth: 10,
        borderColor: 'white',
        position: 'relative',
        top: 10
    },
    topCurve: {
        // height: 70,
        // //borderRadius: 10,
        // backgroundColor: 'white',
        // borderWidth: 2,
        // borderBottomWidth: 0,
        // borderColor: Color.gray200,
        // position: 'relative',
        // top: 10
    },
    txtButtonDark: {
        color: 'darkgray',
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonClose: {
        width: '100%',
        height: '100%',
        ...Common.alignCenter,
        paddingLeft: '5%',
        backgroundColor: Color.amber100
    },
    circle: {
        width: 50,
        height: 50,
        backgroundColor: Color.gray100,
        borderRadius: 50,
        top: -25,
        position: 'relative',
        ...Common.alignCenter,
        borderColor: Color.gray800,
        borderWidth: 0.5
    },
})