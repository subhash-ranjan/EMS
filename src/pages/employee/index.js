import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Common, Color } from 'src/styles/main'
import Icon from 'react-native-vector-icons/Ionicons'
import { ImgBgSqr6 } from 'src/components/images'
import CustomIconButton from 'src/components/customIconButton'

const boxColors = [{ color: Color.amber300 }]
const bannerHeight = 170

export default class empHome extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <SafeAreaView style={styleThis.main}>
                <View style={styleThis.header}>
                    <Image source={ImgBgSqr6} style={{ width: '100%', height: bannerHeight, resizeMode: 'cover' }} ></Image>
                </View>
                <ScrollView style={styleThis.body}>
                    <View style={styleThis.conatiner}>
                        <ItemBox
                            toRedirect='EmployeeList'
                            navigation={this.props.navigation}
                            icon='account-multiple'
                            type='material_com'
                            text='EMPLOYEE LIST'
                        />
                        <ItemBox
                            toRedirect='EmployeeAdd'
                            navigation={this.props.navigation}
                            icon='account-plus'
                            type='material_com'
                            text='ADD EMPLOYEE'
                        />
                    </View>
                    <View style={styleThis.conatiner}>
                        <ItemBox
                            toRedirect='DepartmentList'
                            navigation={this.props.navigation}
                            icon='account-group'
                            type='material_com'
                            text='DEPARTMENT LIST'
                        />
                        <ItemBox
                            toRedirect='DepartmentAdd'
                            navigation={this.props.navigation}
                            icon='account-multiple-plus'
                            type='material_com'
                            text='ADD DEPARTMENT'
                        />
                    </View>
                    <View style={styleThis.conatiner}>
                        <ItemBox
                            toRedirect='DesignationList'
                            navigation={this.props.navigation}
                            icon='ios-man'
                            type='ionicons'
                            text='DESIGNATION LIST'
                        />
                        <ItemBox
                            toRedirect='DesignationAdd'
                            navigation={this.props.navigation}
                            icon='ios-add-circle-outline'
                            type='ionicons'
                            text='ADD DESIGNATION'
                        />
                    </View>
                </ScrollView >
            </SafeAreaView>
        )
    }
}

const styleThis = StyleSheet.create({
    main: {
        flexDirection: 'column',
        height: '100%',
        flex: 1
    },
    header: {
        flexGrow: 5
    },
    body: {
        flexGrow: 7,
    },
    conatiner: {
        ...Common.flexRow,
        ...Common.alignCenter,
        height: 160
    },
    squareBox: {
        ...Common.flexColumn,
        height: 140,
        flexGrow: 1,
        width: '30%',
        borderRadius: 5,
        margin: 15,
    },

    TopBox: {
        flexGrow: 2,
        ...Common.alignCenter,
        width: '100%',
    },
    BottomBox: {
        flexGrow: 2,
        borderTopWidth: .5,
        borderColor: Color.gray200,
        marginTop: 10
    },

    roundMenu: {
        display: 'flex',
        flexDirection: 'row',
        ...Common.alignCenter,
        backgroundColor: Color.orange300,
        borderRadius: 50,
        height: 80,
        width: 80
    },

    boxText: {
        color: Color.gray500,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 12,
        padding: 5
    },

    loaderImage: {
        height: 60,
        width: 60,
        padding: 0,
        margin: 0
    },

    rowActionsBox: {
        ...Common.flexRow,
        width: 70,
        height: 70,
        borderRadius: 50,
        ...Common.alignCenter,
        backgroundColor: Color.amber300,
        marginBottom: '5%'
    }

})
const ItemBox = (props) => {
    return (
        <View style={{ ...styleThis.squareBox }}>
            <View style={styleThis.TopBox}>
                <TouchableOpacity style={{ ...styleThis.roundMenu, backgroundColor: Color.gray300 }}
                >
                    <CustomIconButton
                        name={props.icon}
                        type={props.type}
                        style={{ fontSize: 35, color: Color.indigo300 }}
                        onPress={
                            () => props.navigation.navigate(props.toRedirect, props.params)
                        }
                    />
                </TouchableOpacity>
            </View>
            <View style={styleThis.BottomBox}>
                <Text style={styleThis.boxText}>{props.text}</Text>
            </View>
        </View >
    )
}