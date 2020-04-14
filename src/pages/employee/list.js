import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Alert, Platform, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomFlatList from 'src/components/customFlatList'
import { Common, Color } from 'src/styles/main'
import { fetchEmployees, postEmployee, fetchDepartment } from 'src/actions/employee'
import SearchBar from 'src/components/searchBar'
import ProgressBar from 'src/components/progressBar'
import CustomIconButton from 'src/components/customIconButton'
import { Divider, Text, Caption } from 'react-native-paper'
const icns = ["computer", "wc", "person", "git-network", "man", "man", "man",]
const WindowHeight = Dimensions.get('window').height
const actionBarHeight = 80
let listHeight = '65%'
if (Platform.OS === 'android') { listHeight = '65%' } else { listHeight = '72%' }

class empList extends React.Component {
    constructor(props) {
        super(props)
        props = {
            isFetching: true,
            isCreating: false,
            isCreateSuccess: false,
            employees: [],
            departments: [],
            deptEmployees: [],
            error: false,
            mode: '',
            actionType: '',
            postType: '',
        }
        this.state = {
            dataList: props.deptEmployees,
            departmentActive: 1,
            searchText: '',
            isDepartmentChange: false
        }
    }
    render() {
        return (
            <SafeAreaView style={styleThis.mainContent}>
                <ProgressBar isLoading={this.props.isFetching} loaderText='' />
                <SearchBar />
                <Divider />
                <View style={styleThis.actionBar}>
                    {
                        this.props.departments.map((item, index) => {
                            if (index < 5) {
                                return (
                                    <View style={styleThis.actionContainer} key={String(item.id)}>
                                        <CustomIconButton
                                            name={icns[index]}
                                            type='material'
                                            style={{
                                                fontSize: 30,
                                                color: this.state.departmentActive == item.id ? Color.gray800 : Color.gray500,
                                            }}
                                            onPress={() => this.onFetchEmployess(item.id)}
                                        />
                                        <Caption style={{ fontSize: 8 }}>{item.name.toUpperCase()}</Caption>
                                    </View>
                                )
                            }
                        })
                    }
                </View>
                {/* <View style={styleThis.searchBar}>
                    <TextInput
                        style={[styleThis.textboxWhite]}
                        placeholder='name'
                        maxLength={40}
                        autoCorrect={false}
                        value={this.state.searchText}
                        onChangeText={(text) => this.onSearch(text)} />
                    <TouchableOpacity
                        style={[styleThis.btnSearch]}
                        onPress={() => {
                            this.onSearch(this.state.searchText)
                        }}>
                        <Icon name='ios-search' color={Color.white} size={25} />
                    </TouchableOpacity>
                </View> */}
                <View style={[styleThis.listBar, { height: listHeight }]}>
                    {
                        this.props.isFetching &&
                        <View style={Common.loaderConatiner}>
                            {/* <MyLoader>
                            </MyLoader> */}
                        </View>
                    }
                    {
                        this.state.dataList.length > 0
                        &&
                        <View>
                            <CustomFlatList
                                data={this.state.dataList}
                                name={'Employee'}
                                isImage={true}
                                isPress={false}
                                isEdit={true}
                                isDelete={true}
                                isDetail={true}
                                isDepartmentChange={this.state.isDepartmentChange}
                                onEditClickAction={(item, module) => this.onPressEdit(item, module)}
                                onDetailClickAction={(item, module) => this.onPressDetail(item, module)}
                                onDeleteClickAction={(item, module) => this.onPressDelete(item, module)}>
                            </CustomFlatList>
                        </View>
                    }
                    {
                        !this.props.isFetching
                        &&
                        this.state.isNoData
                        &&
                        <View style={Common.viewNodata}>
                            <Text>no data</Text>
                            <Icon name='ios-sad' color={Color.gray300} size={30} />
                        </View>
                    }
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.props.getDepartments()
        this.props.getEmployees()
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps) {
        let lstEmployees = nextProps.employees
        if (lstEmployees.length > 0) {
            let list = lstEmployees.filter(e => e.dept == this.state.departmentActive)
            this.setState({
                dataList: list,
                isNoData: list.length == 0 ? true : false
            })
        }
        if (nextProps.actionType == 'POST'
            &&
            nextProps.postType == 'delete'
            &&
            nextProps.isCreateSuccess
            &&
            nextProps.mode == 'EMPLOYEE') {
            this.props.getEmployees()
        }
    }
    onFetchEmployess(dept) {
        let lstEmployees = this.props.employees.filter(e => e.dept == dept)
        this.setState({
            departmentActive: dept,
            dataList: lstEmployees,
            isDepartmentChange: true,
            isNoData: lstEmployees.length == 0 ? true : false
        })
    }
    onPressDetail(item, module) {
        this.props.navigation.navigate('EmployeeDetail', {
            item: item
        })
    }
    onPressDelete(item, module) {
        Alert.alert(
            'Are you sure to delete?',
            'never recover',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Delete', onPress: () => {

                        const objRequest = []
                        this.props.postEmployee(objRequest, item.id)

                    }
                },
            ],
            { cancelable: false }
        )


    }
    onPressEdit(item, module) {

        this.props.navigation.navigate('EmployeeAdd', {
            item: item
        })

    }
    onSearch(text) {
        let regName = /^[a-zA-Z]+$/ ///^[a-z]+$/
        if (text != '' && !regName.test(text)) {
            return false
        } else {
            this.setState({ searchText: text })
        }
        let lstEmployees = this.props.employees.filter(e =>
            String(e.name).toLowerCase().includes(String(text).toLowerCase())
            &&
            e.dept == this.state.departmentActive
        )

        this.setState({
            dataList: lstEmployees,
            isNoData: lstEmployees.length == 0 ? true : false
        })
    }
}
function mapStateToProps(state) {
    return {
        isFetching: state.employee.isFetching,
        employees: state.employee.employees,
        departments: state.employee.departments,
        designations: state.employee.designations,
        isCreating: state.employee.isCreating,
        isCreateSuccess: state.employee.isCreateSuccess,
        error: state.employee.error,
        mode: state.employee.mode,
        actionType: state.employee.actionType,
        postType: state.employee.postType,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getEmployees: () => dispatch(fetchEmployees('', 0, 'fetch')),
        getDepartments: () => dispatch(fetchDepartment('', 0, 'fetch')),
        postEmployee: (objRequest, id) => dispatch(postEmployee(objRequest, id, 'delete'))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(empList)
const styleThis = StyleSheet.create({
    mainContent: {
        flex: 1,
        height: WindowHeight,
    },
    actionBar: {
        ...Common.flexRow,
        ...Common.alignCenter,
        height: 80,
        width: '100%',
        backgroundColor: Color.gray200,
    },
    searchBar: {
        ...Common.flexRow,
        ...Common.alignCenter,
        width: '100%',
        height: actionBarHeight,
        backgroundColor: Color.yellow200,
        borderBottomWidth: 1,
        borderBottomColor: Color.gray400,
    },
    listBar: {
        //borderWidth: 2
    },

    actionContainer: {
        flexDirection: 'column',
        ...Common.alignCenter,
    },
    rowActionsBox: {
        display: 'flex',
        margin: '3%',
        width: 50,
        height: 50,
        borderRadius: 50,
        ...Common.alignCenter,
        backgroundColor: Color.amber300,
    },
    loaderImage: {
        height: 60,
        width: 60,
        padding: 0,
        margin: 0
    },
    textboxWhite: {
        height: 40,
        width: '70%',
        paddingLeft: 10,
        fontSize: 16,
        borderWidth: .5,
        borderRadius: 8,
        borderColor: Color.gray500,
        color: Color.bluegray800
    },
    btnSearch: {
        backgroundColor: Color.amber500,
        ...Common.alignCenter,
        width: '20%',
        height: 40,
        borderRadius: 8,
        marginLeft: 2,
    },
    btnText: {
        fontSize: 16,
        fontWeight: '300',
        color: Color.bluegray800
    }
})