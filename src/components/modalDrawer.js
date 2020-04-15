import React, { Component } from 'react'
import { View, Modal, TouchableOpacity, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import CustomFlatList from 'src/components/customFlatList'
import { Color, Common } from 'src/styles/main'
import Icon from 'react-native-vector-icons/Ionicons'
import { Transition, Transitioning } from "react-native-reanimated"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { height, width } = Dimensions.get("window")
const modalHeight = 350

class bottomDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            top: height
        }
        this.ref = React.createRef()
    }
    transition = (
        <Transition.Together>
            <Transition.In
                type='slide-bottom'
                durationMs={200}
                interpolation='easeIn' />
            <Transition.Out
                type="fade"
                durationMs={0}
                interpolation='easeInOut' />
        </Transition.Together>
    )
    render() {
        return (
            <Transitioning.View
                ref={this.ref}
                transition={this.transition}
                style={styleThis.transitionContainer}
            >
                <Modal
                    transparent={true}
                    visible={this.props.visible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styleThis.mainContainer}>
                        <View style={{ ...styleThis.modalView }}>
                            <View style={{ ...styleThis.modalheader }}>
                                <IconButton
                                    icon='close-circle'
                                    size={50}
                                    style={{ top: -38, padding: 0, margin: 0 }}
                                    onPress={() => this.props.hideModal()}>
                                </IconButton>
                            </View>
                            <View style={{ ...styleThis.modalList }}>
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
                        </View>
                    </View>
                </Modal>

            </Transitioning.View>
        )
    }
    componentDidUpdate = () => {
        //this.ref.current.animateNextTransition()
    }
}
export default bottomDrawer
const styleThis = StyleSheet.create({
    transitionContainer: {
        width: width,
        height: height,
    },
    mainContainer: {
        width: width,
        height: height,
    },
    modalView: {
        ...Common.flexColumn,
        ...Common.alignStart,
        backgroundColor: Color.white,
        height: modalHeight,
        top: height - modalHeight,
        shadowColor: 'red',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    modalheader: {
        height: 50,
        width: width,
        ...Common.flexColumn,
        ...Common.alignStart,
        //backgroundColor: Color.indigo100
    },
    modalList: {
        height: modalHeight - 50,
        paddingBottom: 30,
        width: width,
    },
})