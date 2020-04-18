import React, { Component } from 'react'
import { View, Modal, TouchableOpacity, ScrollView, Dimensions, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import CustomFlatList from 'src/components/customFlatList'
import CustomCalendar from 'src/components/calendar'
import { Color, Common } from 'src/styles/main'

const { height, width } = Dimensions.get("window")
const modalHeight = 450
const headerHeight = 60

class bottomDrawer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 0,
            selectedDate: ''
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }
    render() {
        return (
            <Modal
                transparent={true}
                animationType={'slide'}
                visible={this.props.visible}
                onRequestClose={() => {
                }}
            >
                <View style={styleThis.mainContainer}>
                    <View style={{ ...styleThis.modalView, height: this.state.height }}>
                        <View style={{ ...styleThis.modalheader }}>
                            <IconButton
                                icon='close-circle'
                                size={50}
                                color={Color.gray800}
                                style={{ padding: 0, margin: 0, color: Color.gray300 }}
                                onPress={() => this.props.hideModal()}>
                            </IconButton>
                        </View>
                        <View style={{ ...styleThis.modalList }}>
                            {
                                this.props.mode === 'list' &&
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
                            }
                            {
                                this.props.mode === 'calendar' &&
                                <CustomCalendar
                                    onSelectFinal={(item) => this.props.onSelectFinal(item)}
                                />
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
    componentDidMount = () => {
        LayoutAnimation.configureNext(LayoutAnimation.create(
            200,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.opacity
        ))
        this.setState({ height: modalHeight })
    }
    handleTapDateSelect = (day) => {
        const selectedDate = day.dateString
        this.setState({ selectedDate })
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
        //height: modalHeight,
        top: height - modalHeight,
        shadowColor: 'black',
        shadowOffset: {
            width: width,
            height: 2
        },
        shadowOpacity: 0.55,
        shadowRadius: 5.84,
        elevation: 20
    },
    modalheader: {
        height: headerHeight,
        width: width,
        ...Common.flexRow,
        alignItems: 'center',
        justifyContent: 'flex-end',
        //backgroundColor: Color.gray100
    },
    modalList: {
        height: modalHeight - headerHeight,
        paddingBottom: 30,
        width: width,
    },
})