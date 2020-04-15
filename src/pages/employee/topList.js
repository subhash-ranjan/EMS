import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Platform, SafeAreaView, Dimensions } from 'react-native'
import { Button, Text, Card, Caption, Divider } from 'react-native-paper'
import { Common, Color } from 'src/styles/main'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomIconButton from 'src/components/customIconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomFlatList from 'src/components/customFlatList'
import { fetchEmployees, fetchMaster } from 'src/actions/employee'
import dateMonths from 'src/config/date'
import ProgressBar from 'src/components/progressBar'
import ModalDrawer from 'src/components/modalDrawer'

const FIL_BOX_WIDTH = 60
const WindowHeight = Dimensions.get('window').height
let listHeight = '75%'
if (Platform.OS === 'android') { listHeight = '75%' } else { listHeight = '80%' }
const lstCount = [
    { id: 1, name: '10' },
    { id: 2, name: '20' },
    { id: 3, name: '30' },
]

class empTopList extends Component {
    constructor(props) {
        super(props)
        props = {
            isFetching: true,
            ratings: [],
            departments: [],
            empRatings: [],
            totalEmployees: [],
            filteredEmployees: [],
        }
        this.state = {
            drawerMode: '',
            drawerData: [],
            yearText: 'year',
            yearId: 0,
            ratingText: 'rating',
            ratingId: 0,
            departmentText: 'department',
            departmentId: 0,
            listcountText: '10',
            listcountId: 0,
            dataList: [],
            years: dateMonths[0]['year'],

            modalVisible: false,
        }
    }
    render() {
        return (
            <React.Fragment>
                <ProgressBar isLoading={this.props.isFetching} loaderText='' />
                <SafeAreaView style={styleThis.main}>
                    <View style={styleThis.actionBar}>
                        <View style={{ ...Common.flexRow, ...Common.alignSpaceEven }}>
                            <FilterButton
                                label='YEAR'
                                icon='clock-outline'
                                onPress={() => this.handleOpen('year')}
                                text={this.state.yearText}
                            />
                            <FilterButton
                                label='RATING'
                                icon='star-outline'
                                onPress={() => this.handleOpen('rating')}
                                text={this.state.ratingText}
                            />
                            <FilterButton
                                label='DEPARTMENT'
                                icon='account-group'
                                onPress={() => this.handleOpen('department')}
                                text={this.state.departmentText.toUpperCase()}
                            />
                            {/* <View style={styleThis.filterBox}>
                            <FilterButton
                                onPress={() => this.handleOpen('listcount')}
                                text={this.state.listcountText}
                            />
                            </View> */}
                        </View>
                        <View style={{ ...Common.flexRow, ...Common.alignCenter, padding: 5 }}>
                            <Button
                                mode='text'
                                onPress={() => this.applyFilters()}
                            >
                                <Text style={{ color: Color.indigo400 }} > APPLY FILTER</Text>
                            </Button>
                        </View>
                    </View>
                    <Divider />
                    <View style={{ height: listHeight }}>
                        {
                            this.props.isFetching == false &&
                            this.state.dataList.length == 0 &&
                            <View style={[Common.loaderConatiner, { paddingTop: '15%', flexDirection: 'column' }]}>
                                <Text>no data</Text>
                                <Icon name='ios-sad' color={Color.gray300} size={30} />
                            </View>
                        }
                        <View>
                            <CustomFlatList
                                data={this.state.dataList}
                                name={'Employee'}
                                isImage={true}
                                isDelete={false}
                                onDetailClickAction={(item, module) => this.onPressDetail(item, module)}>
                            </CustomFlatList>
                        </View>
                    </View>

                    {
                        this.state.modalVisible &&
                        <ModalDrawer
                            data={this.state.drawerData}
                            name={'empadd'}
                            visible={this.state.modalVisible}
                            hideModal={() => { this.closeDrawer() }}
                            onPress={(item, module) => this.onItemSelection(item, module)}
                        />
                    }

                </SafeAreaView>
            </React.Fragment>
        )
    }
    componentDidMount() {
        this.props.getMasterData()
    }
    componentWillReceiveProps(nextProps) {
        let yearCurrent = dateMonths[0]['year'][0]
        if (nextProps.totalEmployees.length > 0 && nextProps.isFetching == false) {
            let empRating = nextProps.empRatings.filter(
                e =>
                    e.rating == nextProps.ratings[4]['id']
                    &&
                    e.year == yearCurrent['id']
            )
            let result = nextProps.empRatings.map(a => a.employeeId).toString()
            let lstEmployee = nextProps.totalEmployees.filter(
                e =>
                    e.dept == nextProps.departments[0]['id']
                    &&
                    String(result).includes(e.id)
            )
            this.setState({
                dataList: lstEmployee,

                yearText: yearCurrent['name'],
                yearId: yearCurrent['id'],

                ratingText: nextProps.ratings[0]['name'],
                ratingId: nextProps.ratings[0]['id'],

                departmentText: nextProps.departments[0]['name'],
                departmentId: nextProps.departments[0]['id'],
            })
        }
    }
    applyFilters = () => {
        let empRating = this.props.empRatings.filter(e =>
            e.rating == this.state.ratingId
            &&
            e.year == this.state.yearId)

        let result = empRating.map(a => a.employeeId).toString()
        let lstEmployee = this.props.totalEmployees.filter(
            e =>
                e.dept == this.state.departmentId
                &&
                String(result).includes(e.id)
        )
        this.setState({
            dataList: lstEmployee
        })
    }
    handleOpen = (src) => {
        let lstSrc = []
        switch (src) {
            case 'year':
                lstSrc = this.state.years
                break
            case 'rating':
                lstSrc = this.props.ratings
                break
            case 'department':
                lstSrc = this.props.departments
                break
            case 'listcount':
                lstSrc = lstCount
                break
            default: break
        }
        this.setState({
            modalVisible: true,
            drawerMode: src,
            drawerData: lstSrc
        })
    }
    closeDrawer = async () => {
        this.setState({ modalVisible: false })
    }
    onItemSelection = async (item, module) => {
        await this.closeDrawer()
        switch (this.state.drawerMode) {
            case 'year':
                this.setState({ yearId: item.id, yearText: item.name })
                break
            case 'rating':
                this.setState({ ratingId: item.id, ratingText: item.name })
                break
            case 'department':
                this.setState({ departmentId: item.id, departmentText: item.name })
                break
            case 'listcount':
                this.setState({ listcountId: item.id, listcountText: item.name })
                break
            default: break
        }
    }
    onPressDetail(item, module) {
        this.props.navigation.navigate('EmployeeDetail', {
            item: item
        })
    }
}

function mapStateToProps(state) {
    let lstYear = []
    let lstRating = []
    let lstEmployeeRating = []
    let lstDepartment = []
    let lstEmployee = []
    let lstFilteredEmployee = []
    if (state.employee.masters.length > 0) {
        lstYear = state.employee.masters[0]['year']
        lstRating = state.employee.masters[1]['rating']
        lstEmployeeRating = state.employee.masters[2]['employeeRating']
        lstDepartment = state.employee.masters[3]['department']
        lstEmployee = state.employee.masters[4]['employee']
        // lstFilteredEmployee = lstEmployee.filter(e =>
        //   e.dept == _lstDepartments[0].id)
    }
    return {
        isFetching: state.employee.isFetching,
        ratings: lstRating,
        empRatings: lstEmployeeRating,
        departments: lstDepartment,
        totalEmployees: lstEmployee,
        filteredEmployees: lstFilteredEmployee,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getMasterData: () => dispatch(fetchMaster('', 0, 'fetchmaster')), //0-master , 1-reports
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(empTopList)
const styleThis = StyleSheet.create({
    main: {
        flex: 1,
        height: WindowHeight,
        paddingTop: 40,
        paddingBottom: 10
    },
    actionBar: {
        ...Common.flexColumn,
        ...Common.alignCenter,
        height: 120,
        paddingTop: 10,
        width: '100%',
        backgroundColor: Color.gray200
    },
    actionCard: {
        ...Common.flexRow,
        ...Common.alignCenter,
        height: 45,
    }
})

const FilterButton = (props) => {
    return (
        <Card
            style={{
                ...styleThis.actionCard,
                width: props.label == 'DEPARTMENT' ? 120 : 90
            }}
            onPress={props.onPress}
        >
            <Card.Content style={{ ...Common.flexRow, ...Common.alignCenter }}>
                <MaterialCommunityIcons
                    name={props.icon}
                    style={{ fontSize: 25, color: Color.gray700, padding: 5 }}
                />
                <Caption style={{
                    fontSize: props.label == 'DEPARTMENT' ? 10 : 15,
                }}>
                    {props.text}
                </Caption>
            </Card.Content>
        </Card>
    )
}

