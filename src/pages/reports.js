import React, { Component } from 'react'
import {
    View, StyleSheet, TouchableOpacity,
    LayoutAnimation, Platform, UIManager, ScrollView, Dimensions, SafeAreaView
} from 'react-native'
import { Common, Color } from 'src/styles/main'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetchReport } from 'src/actions/employee'
import ChartTest from 'src/components/chartTest'
import ProgressBar from 'src/components/progressBar'
import CustomIconButton from 'src/components/customIconButton'
import { Divider, Text, Caption, Title, Subheading } from 'react-native-paper'

const htRation = 0.3
const _fontMultiplr = 0.11
const boxColors = [{ color: Color.indigo300 }]
let headerHeightOffset = 30
if (Platform.OS === 'android') { headerHeightOffset = 30 } else { headerHeightOffset = 20 }

class reports extends Component {
    constructor(props) {
        super(props)
        props = {
            masterData: [],
            isFetching: false,
            error: false,
            mode: '',
            actionType: '',
            postType: '',
        }
        this.state = {
            flexDir: 'column',
            boxHeight: 100,
            dataRow: [],
            dataColumn: [],
            mode: '',
            lstData: [],
            itemId: 0,
            //isFromHome: false,
            selectedIndex: 0
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }
    render() {
        return (
            <SafeAreaView style={[styleThis.main]}>
                {
                    this.state.boxHeight == 100 &&
                    <View style={{ ...styleThis.header, height: this.state.boxHeight == 100 ? 60 : 0 }}>
                        <Subheading>Reports</Subheading>
                    </View>

                }
                <View style={[styleThis.menuContainer]}>
                    <ItemBox
                        boxHeight={this.state.boxHeight}
                        index={1}
                        selectedIndex={this.state.selectedIndex}
                        icon='chart-line-variant'
                        onPress={() => this.toggleLayoutStyle('salary', '', [])}
                        text='EMPLOYEE EXPENDITURE'
                    />
                    <ItemBox
                        boxHeight={this.state.boxHeight}
                        index={2}
                        selectedIndex={this.state.selectedIndex}
                        icon='chart-pie'
                        onPress={() => this.toggleLayoutStyle('empCount', '1', [])}
                        text='EMPLOYEE STRENGTH'
                    />
                    <ItemBox
                        boxHeight={this.state.boxHeight}
                        index={3}
                        selectedIndex={this.state.selectedIndex}
                        icon='chart-bar'
                        onPress={() => this.toggleLayoutStyle('technologyCount', '2', [])}
                        text='TECHNOLOGY STRENGTH'
                    />
                    <ItemBox
                        boxHeight={this.state.boxHeight}
                        index={4}
                        selectedIndex={this.state.selectedIndex}
                        icon='chart-bell-curve'
                        onPress={() => this.toggleLayoutStyle('hrCount', '3', [])}
                        text='HR STRENGTH'
                    />
                    <ItemBox
                        boxHeight={this.state.boxHeight}
                        index={5}
                        selectedIndex={this.state.selectedIndex}
                        icon='chart-bar-stacked'
                        onPress={() => this.toggleLayoutStyle('adminCount', '4', [])}
                        text='NETWORK STRENGTH'
                    />
                    <ItemBox
                        boxHeight={this.state.boxHeight}
                        index={6}
                        selectedIndex={this.state.selectedIndex}
                        icon='chart-arc'
                        onPress={() => this.toggleLayoutStyle('networkCount', '5', [])}
                        text='ADMIN STRENGTH'
                    />
                </View>
                <View style={[styleThis.reportContainer, {}]}>
                    <View style={{ height: this.state.boxHeight != 100 ? 20 : 0, borderWidth: 0 }}>
                        <TouchableOpacity style={[styleThis.circle,
                        {
                            height: this.state.boxHeight != 100 ? 50 : 0,
                            borderWidth: this.state.boxHeight != 100 ? 0.5 : 0
                        }]}
                            onPress={() => this.toggleLayoutStyle('', 'close', [])}>
                            <MaterialCommunityIcons name="close" color={Color.gray800} size={this.state.boxHeight != 100 ? 40 : 0} />
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.mode == 'salary'
                        &&
                        <ChartTest mode={this.state.mode} dataRow={this.state.dataRow} dataColumn={this.state.dataColumn} />
                    }
                    {
                        this.state.mode == 'empCount'
                        &&
                        <ChartTest mode={this.state.mode} dataRow={this.state.dataRow} dataColumn={this.state.dataColumn} />
                    }
                    {
                        this.state.mode == 'technologyCount'
                        &&
                        <ChartTest mode={this.state.mode} dataRow={this.state.dataRow} dataColumn={this.state.dataColumn} />
                    }
                    {
                        this.state.mode == 'hrCount'
                        &&
                        <ChartTest mode={this.state.mode} dataRow={this.state.dataRow} dataColumn={this.state.dataColumn} />
                    }
                    {
                        this.state.mode == 'adminCount'
                        &&
                        <ChartTest mode={this.state.mode} dataRow={this.state.dataRow} dataColumn={this.state.dataColumn} />
                    }
                    {
                        this.state.mode == 'networkCount'
                        &&
                        <ChartTest mode={this.state.mode} dataRow={this.state.dataRow} dataColumn={this.state.dataColumn} />
                    }
                </View>
            </SafeAreaView >
        )
    }
    componentDidMount() {
        this.props.getReprtsData()
        let reportId = !!this.props.route.params ? this.props.route.params.item : null
        if (reportId != null && reportId > 0) { this.setState({ itemId: reportId }) } else { this.setState({ itemId: 0 }) }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.masterData != null && nextProps.masterData.length > 0) {
            this.setState({
                lstData: nextProps.masterData
            })
            //when coming from home menu reports
            if (this.state.itemId > 0) {
                if (this.state.itemId == 1)
                    this.toggleLayoutStyle('salary', '', nextProps.masterData)//salay
                else
                    this.toggleLayoutStyle('empCount', '1', nextProps.masterData)//strength
            }
        }
    }
    toggleLayoutStyle(_mode, src, fetchedData) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)//easeInEaseOut
        let lstYearSalary = []
        let lstEmpCount = []
        let lstRow = []
        let lstColumn = []
        let selectedIndex = 0
        let data = []
        //when coming from home menu reports, fetchedData directly coming after componentWillReceiveProps
        if (fetchedData.length > 0) {
            data = fetchedData
        } else {
            data = this.state.lstData
        }
        if (data.length > 0 && src != 'close') {
            if (_mode == 'salary') {
                let lstYearSalary = data[0]['yearSalary']
                lstRow = lstYearSalary.map(a => a.SALARY)
                lstColumn = lstYearSalary.map(a => a.year)
                selectedIndex = 1
            }
            else {
                let total = 0
                let lstEmployeeCount = data[src][_mode]
                lstRow = lstEmployeeCount.map(a => {
                    total = total + a.TOTAL
                    return total
                })
                lstColumn = lstEmployeeCount.map(a => a.JOINNGDATE).map(Number)
                selectedIndex = parseInt(src) + 1
            }
        }
        this.setState({
            selectedIndex: selectedIndex,
            mode: _mode,
            dataRow: lstRow,
            dataColumn: lstColumn,
            boxHeight: (this.state.boxHeight == 100 || src != 'close') ? 60 : 100,
        })
    }
}
function mapStateToProps(state) {
    return {
        masterData: state.employee.reports,
        isFetching: state.employee.isFetching,
        error: state.employee.error,
        mode: state.employee.mode,
        actionType: state.employee.actionType,
        postType: state.employee.postType,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getReprtsData: () => dispatch(fetchReport('', 0, 'fetchreport'))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reports)
const styleThis = StyleSheet.create({
    main: {
        ...Common.flexColumn,
        width: '100%',
        height: '100%',
    },
    header: {
        ...Common.flexColumn,
        width: '100%',
        ...Common.alignCenter,
    },
    menuContainer: {
        ...Common.flexRow,
        ...Common.alignCenter,
        width: '100%',
        flexWrap: 'wrap',
        paddingTop: 5

    },
    reportContainer: {
        ...Common.flexColum,
        ...Common.alignStart,
        width: '100%',
        height: '100%',
        position: 'relative',
        top: 5,
        backgroundColor: Color.gray200,
    },
    squareBox: {
        ...Common.flexColumn,
        margin: 5,
    },
    TopBox: {
        ...Common.alignCenter,
        width: '100%',
    },
    BottomBox: {
        ...Common.alignCenter,
        borderTopWidth: .5,
        paddingTop: '2%',
        marginTop: '2%',
        borderColor: Color.gray200,
        //borderWidth: 2
    },
    roundMenu: {
        display: 'flex',
        flexDirection: 'column',
        ...Common.alignCenter,
        backgroundColor: Color.indigo300,
        borderRadius: 50,
        //paddingBottom:5
        padding: 4
    },
    circleText: {
        color: Color.white,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
    },
    boxText: {
        color: Color.gray500,
        textAlign: 'center',
        fontWeight: '700',
    },
    boxTextBold: {
        color: Color.gray700,
        textAlign: 'center',
        fontWeight: '400',
    },
    circle: {
        height: 50,
        width: 50,
        backgroundColor: Color.white,
        borderRadius: 50,
        top: -25,
        position: 'relative',
        ...Common.alignCenter,
        //borderWidth: 0.5,
        borderColor: Color.gray800
    },
    charBox: {
        borderWidth: 2,
        width: '100%',
        padding: 10
    },
    loaderConatiner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const ItemBox = (props) => {
    return (
        <View style={{ ...styleThis.squareBox, width: props.boxHeight + 40, height: props.boxHeight + 40 }}>
            <View style={styleThis.TopBox}>
                <TouchableOpacity style={[styleThis.roundMenu, {
                    backgroundColor: props.index == props.selectedIndex ? Color.indigo600 : boxColors[0].color,
                    width: props.boxHeight, height: props.boxHeight
                }]}
                    onPress={() => props.onPress()}>
                    <MaterialCommunityIcons name={props.icon} style={{}} color={Color.white} size={33} />
                </TouchableOpacity>
            </View>
            <View style={styleThis.BottomBox}>
                <Caption style={{ fontSize: _fontMultiplr * props.boxHeight }}>{props.text}</Caption>
            </View>
        </View >
    )
}
