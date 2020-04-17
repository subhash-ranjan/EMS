import React, { Component } from 'react'
import { Transition, Transitioning } from "react-native-reanimated"
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native'
import { Text, Caption, Button } from 'react-native-paper'
import { Color, Common } from 'src/styles/main'
import dateMonths from 'src/config/date'
import CustomFlatList from 'src/components/customFlatList'

export class calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lstData: dateMonths[0].year,
            lstYear: dateMonths[0].year,
            lstMonth: dateMonths[0].month,
            lstDay: dateMonths[0].day,
            mode: 'year',
            selectedValue: '',
            year: '',
            month: '',
            day: '',
            noOfDays: 0,
        }
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
                style={styleThis.transitionContainer}
            >
                <View style={styleThis.selectionBox}>
                    <View style={{ width: '60%', paddingLeft: '5%' }}>
                        <Text>
                            Selected : {this.state.year} - {this.state.month} - {this.state.day}
                        </Text>
                    </View>
                    <View style={{ width: '40%', paddingLeft: '5%' }}>
                        {
                            this.state.year != '' && this.state.month != '' && this.state.day != '' &&
                            <Button
                                mode='text'
                                color={Color.indigo300}
                                onPress={() => {
                                    let finalValue = this.state.year + '-' + this.state.month + '-' + this.state.day
                                    this.props.onSelectFinal(finalValue)
                                }}>
                                Apply
                            </Button>
                        }
                    </View>
                </View>
                <View style={styleThis.contentMain}>
                    <View style={styleThis.contentMenu}>
                        <Button
                            style={{
                                ...styleThis.menuItem,
                                backgroundColor: this.state.mode == 'year' ? Color.indigo300 : Color.indigo50
                            }}
                            onPress={() => { this.updateSource('year', 0) }}>
                            <Caption style={{ fontSize: 10, color: this.state.mode == 'year' ? Color.white : Color.gray700 }}>Year</Caption>
                        </Button>
                        <Button
                            style={{
                                ...styleThis.menuItem,
                                backgroundColor: this.state.mode == 'month' ? Color.indigo300 : Color.indigo50
                            }}
                            onPress={() => { this.updateSource('month', 0) }}>
                            <Caption style={{ fontSize: 10, color: this.state.mode == 'month' ? Color.white : Color.gray700 }}>Month</Caption>
                        </Button>
                        <Button
                            style={{
                                ...styleThis.menuItem,
                                backgroundColor: this.state.mode == 'day' ? Color.indigo300 : Color.indigo50
                            }}
                            onPress={() => { this.updateSource('day', this.state.noOfDays) }}>
                            <Caption style={{ fontSize: 10, color: this.state.mode == 'day' ? Color.white : Color.gray700 }}>day</Caption>
                        </Button>
                    </View>
                    <View style={styleThis.contentList}>
                        <ScrollView style={styleThis.scrollMain}>
                            <CustomFlatList
                                data={this.state.lstData}
                                name={this.props.name}
                                isImage={false}
                                isPress={true}
                                isDetail={false}
                                isDetail={false}
                                isHeader={false}
                                isEdit={false}
                                onPress={(item) => this.setSelectedValue(item)}>
                            </CustomFlatList>
                        </ScrollView>
                    </View>
                </View>
            </Transitioning.View >
        )
    }
    setSelectedValue = (item) => {
        switch (this.state.mode) {
            case 'year':
                this.setState({ year: item.id, mode: 'month' })
                this.updateSource('month', 0)
                break
            case 'month':
                this.setState({
                    month: item.id,
                    mode: 'day',
                    noOfDays: item.days,
                    day: this.state.day > item.days ? '' : this.state.day
                })
                this.updateSource('day', item.days)
                break
            case 'day':
                this.setState({ day: item.id })
                break
            default: break
        }
    }
    updateSource = (src, noOfDays) => {
        let lstSrc = []
        switch (src) {
            case 'year':
                lstSrc = this.state.lstYear
                break
            case 'month':
                lstSrc = this.state.lstMonth
                break
            case 'day':
                let lstDays = JSON.parse(JSON.stringify(this.state.lstDay))
                lstSrc = lstDays.splice(0, noOfDays)
                break
            default: break
        }
        this.setState({ lstData: lstSrc, mode: src })
    }
}
export default calendar
const styleThis = StyleSheet.create({
    scrollMain: {
        height: 300,
        borderWidth: 10,
        borderColor: 'white',
        position: 'relative',
        top: 10
    },
    contentMain: {
        display: 'flex',
        flexDirection: 'row',
    },
    contentMenu: {
        ...Common.flexColumn,
        ...Common.alignCenter,
        width: '35%',
        borderRightWidth: 1,
        borderColor: Color.gray300,
    },
    contentList: {
        width: '65%',
    },
    menuItem: {
        ...Common.alignCenter,
        height: 70,
        width: 70,
        borderRadius: 50,
        marginVertical: 5
    },
    selectionBox: {
        height: '15%',
        borderWidth: 1,
        borderColor: Color.gray200,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row'
    },
    selectionText: {
        color: Color.gray800,
        fontSize: 16
    },
    selectButton: {
        backgroundColor: Color.amber300,
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
