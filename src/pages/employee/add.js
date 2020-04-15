import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform, ScrollView, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { Common, Color } from 'src/styles/main'
import { fetchDepartment, fetchDesignation, postEmployee } from 'src/actions/employee'
import Icon from 'react-native-vector-icons/Ionicons'
import BottomDrawer from 'src/components/common/bottomDrawer'
import BottomDrawerPicker from 'src/components/common/bottomDrawerPicker'
import dateMonths from 'src/configurations/date'
import { ImgBgSqr5 } from 'src/components/common/impImages'
import MyLoader from 'src/components/common/myLoader'
import ModalDrawer from 'src/components/modalDrawer'
const bannerHeight = 140

class add extends React.Component {
    constructor(props) {
        super(props)

        props = {
            isFetching: false,

            designations: [],
            departments: [],

            isCreating: false,
            isCreateSuccess: false,

            error: false,

            mode: '',
            actionType: '',
            postType: '',
        }

        this.state = {
            isDrawerInvoked: false,
            isDrawerPickerInvoked: false,
            drawerMode: '',
            drawerData: [],
            drawerDataPicker: dateMonths,
            bgColor: 'transparent',

            designationText: 'designation',
            designationId: 0,

            departmentText: 'department',
            departmentId: 0,

            dojText: 'doj',
            dojId: 0,

            nameError: false,
            departmentError: false,
            designationError: false,
            emailError: false,
            dojError: false,

            name: '',
            email: '',

            mode: 'insert',
            id: 0,
            isSuccessShow: false
        }

    }
    render() {
        return (
            <SafeAreaView style={styleThis.main}>
                <ScrollView>
                    <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : ""}
                        style={styleThis.body} >
                        {
                            this.props.isCreating &&
                            <View style={Common.loaderConatiner}>
                                <Text> Saving data</Text>
                                <MyLoader>
                                </MyLoader>
                            </View>
                        }
                        {
                            this.state.isSuccessShow && this.state.name == '' &&
                            <View style={Common.loaderConatiner}>
                                <Icon name="ios-checkmark-circle-outline" style={{ marginRight: 3 }} color={Color.green400} size={50} />
                            </View>
                        }
                        <View style={styleThis.input}>
                            <TextInput
                                style={[styleThis.textboxWhite]}
                                placeholder='name'
                                maxLength={50}
                                value={this.state.name}
                                onChangeText={(text) => this.setInputText(text, 'name')}
                                ref={this.txtName} />
                            {this.state.nameError && <Text style={styleThis.txtError}>Enter name.Only alphabets</Text>}
                        </View>
                        <View style={styleThis.input}>
                            <TextInput
                                style={[styleThis.textboxWhite]}
                                onChangeText={(text) => this.setInputText(text, 'email')}
                                maxLength={70}
                                placeholder='email'
                                value={this.state.email}
                                ref={this.txtEmail} />
                            {this.state.emailError && <Text style={styleThis.txtError}>Enter valid email</Text>}
                        </View>
                        <View style={styleThis.input}>
                            <TouchableOpacity
                                title="Department"
                                style={[styleThis.buttonSelect]}
                                onPress={(src) => this.handleOpen('department')}>
                                <Text style={styleThis.txtButtonSelect}>{this.state.departmentText}</Text>
                                <Icon name="ios-arrow-down" color={Color.lightgray} size={30} style={styleThis.listRowItemMenu} />
                            </TouchableOpacity>
                            {this.state.departmentError && <Text style={styleThis.txtError}>Select department</Text>}
                        </View>
                        <View style={styleThis.input}>
                            <TouchableOpacity
                                title="Designation"
                                style={[styleThis.buttonSelect]}
                                onPress={(src) => this.handleOpen('designation')}>
                                <Text style={styleThis.txtButtonSelect}>{this.state.designationText}</Text>
                                <Icon name="ios-arrow-down" color={Color.lightgray} size={30} style={styleThis.listRowItemMenu} />
                            </TouchableOpacity>
                            {this.state.designationError && <Text style={styleThis.txtError}>Select designation</Text>}
                        </View>
                        <View style={[styleThis.input]}>
                            <TouchableOpacity
                                title="day"
                                style={[styleThis.buttonSelect]}
                                onPress={(src) => this.handleOpen('doj')}>
                                <Text style={styleThis.txtButtonSelect}>{this.state.dojText}</Text>
                                <Icon name="ios-arrow-down" color={Color.lightgray} size={30} style={styleThis.listRowItemMenu} />
                            </TouchableOpacity>
                            {this.state.dojError && <Text style={styleThis.txtError}>Select date of joining</Text>}
                        </View>
                        <View style={styleThis.input}>
                            <TouchableOpacity
                                title="Create User"
                                style={[styleThis.buttonBlue]}
                                onPress={() => this.submitEmployee()}>
                                <Text style={styleThis.txtButtomWhite}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
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
                <BottomDrawerPicker
                    data={this.state.drawerDataPicker}
                    name={'empadd'}
                    handleOpen={(src) => this.handleOpen('doj')}
                    isDrawerPickerInvoked={this.state.isDrawerPickerInvoked}
                    onSelectFinal={(item) => this.setDojValue(item)}>
                </BottomDrawerPicker>
            </SafeAreaView>
        )
    }
    componentDidMount = () => {
        let employee = this.props.navigation.getParam('item', '')
        if (employee != null && employee.id > 0) {
            this.setState({
                designationText: employee.DESIGNATION,
                designationId: employee.designation,
                departmentText: employee.DEPARTMENT,
                departmentId: employee.dept,
                dojText: employee.doj,
                dojId: 0,
                name: employee.name,
                email: employee.email,
                mode: 'update',
                id: employee.id
            })
        } else {
            this.setState({ mode: 'insert' })
        }
        this.props.getDepartments()
        this.props.getDesignations()
        if (this.state.isSuccessShow)
            this.setState({ isSuccessShow: false })
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.actionType == 'POST' && nextProps.isCreateSuccess && nextProps.mode == 'EMPLOYEE') {
            this.setState({
                designationText: 'designation',
                designationId: 0,
                departmentText: 'department',
                departmentId: 0,
                dojText: 'doj',
                dojId: 0,
                name: '',
                email: '',

                mode: 'insert',
                isSuccessShow: true
            })
        }
    }
    handleOpen = (src) => {
        lstSrc = []
        switch (src) {
            case 'department':
                lstSrc = this.props.departments
                break
            case 'designation':
                lstSrc = this.props.designations
                break
            case 'doj':
                lstSrc = dateMonths
                break
            default: break
        }

        if (src == 'doj') {

            this.setState({
                isDrawerPickerInvoked: this.state.isDrawerPickerInvoked ? false : true,
                drawerMode: src,
                bgColor: !this.state.isDrawerPickerInvoked ? Color.gray300 : 'transparent',
                drawerData: lstSrc,
            })

        }
        else {

            this.setState({
                isDrawerInvoked: this.state.isDrawerInvoked && src != 'doj' ? false : true,
                drawerMode: src,
                bgColor: !this.state.isDrawerPickerInvoked ? Color.gray300 : 'transparent',
                drawerData: lstSrc,
            })
        }

        this.setInputText('', src)
    }
    onItemSelection = (item, module) => {
        switch (this.state.drawerMode) {
            case 'department':
                this.setState({ departmentId: item.id, departmentText: item.name })
                break
            case 'designation':
                this.setState({ designationId: item.id, designationText: item.name })
                break
            default: break
        }
        this.handleOpen(this.state.drawerMode)
    }
    setDojValue = (val) => {
        this.setState({ dojText: val })
        this.handleOpen('doj')
    }
    submitEmployee = () => {
        const objRequest = [
            { id: 'name', val: this.state.name },
            { id: 'dept', val: this.state.departmentId },
            { id: 'designation', val: this.state.designationId },
            { id: 'email', val: this.state.email },
            { id: 'doj', val: this.state.dojText }
        ]

        let isValid = this.validateInput(objRequest)
        if (isValid) {

            this.props.postEmployee(objRequest, this.state.id, this.state.mode)
        }
    }
    validateInput(objRequest) {

        let isSuccess = true

        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let regName = /^[a-zA-Z]+$/ ///^[a-z]+$/

        objRequest.map(item => {

            switch (item.id) {

                case 'name':

                    if (!regName.test(item.val) || item.val == null || item.val == '') {
                        this.setState({ nameError: true })
                        isSuccess = false
                    }
                    break

                case 'dept':

                    if (item.val == 0) {
                        this.setState({ departmentError: true })
                        isSuccess = false
                    }

                    break

                case 'designation':

                    if (item.val == 0) {
                        this.setState({ designationError: true })
                        isSuccess = false
                    }

                    break

                case 'email':

                    if (!regEmail.test(item.val)) {
                        this.setState({ emailError: true })
                        isSuccess = false
                    }

                    break

                case 'doj':

                    if (item.val == 'doj') {
                        this.setState({ dojError: true })
                        isSuccess = false
                    }

                    break

                default: break
            }
        })

        return isSuccess
    }
    setInputText(text, type) {

        let regName = /^[a-zA-Z]+$/ ///^[a-z]+$/


        if (this.state.isSuccessShow) {
            this.setState({ isSuccessShow: false })
        }

        switch (type) {

            case 'name':

                if (text.length > 0 && !regName.test(text))
                    return false

                this.setState({ nameError: false, name: text })
                break

            case 'department':
                this.state.departmentError ? this.setState({ departmentError: false }) : null
                break

            case 'designation':
                this.state.designationError ? this.setState({ designationError: false }) : null
                break

            case 'email':
                this.setState({ emailError: false, email: text })
                break

            case 'doj':
                this.state.dojError ? this.setState({ dojError: false }) : null
                break

            default: break
        }
    }
}
function mapStateToProps(state) {

    return {
        isFetching: state.employee.isFetching,

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
        getDepartments: () => dispatch(fetchDepartment('', 0, 'fetch')),
        getDesignations: () => dispatch(fetchDesignation('', 0, 'fetch')),
        postEmployee: (objRequest, id, mode) => dispatch(postEmployee(objRequest, id, mode))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(add)
const styleThis = StyleSheet.create({
    main: {
        ...Common.flexColumn,
        flex: 1,
    },
    header: {
        height: '25%'
    },
    body: {
        flexGrow: 6,
        ...Common.flexColumn,
        ...Common.alignCenter,
    },
    input: {
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: '3%'
    },
    textboxWhite: {
        height: 50,
        padding: 4,
        fontSize: 16,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: .8,
        borderBottomColor: Color.gray500
    },
    buttonBlue: {
        height: 43,
        backgroundColor: Color.blue900,
        ...Common.alignCenter
    },
    txtButtomWhite: {
        ...Common.txtButtom,
        color: Color.white,
        fontSize: 22,
        fontWeight: '400',
        letterSpacing: 1
    },
    buttonSelect: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        flexDirection: 'row',
        paddingRight: '5%',
        width: '100%'

    },
    txtButtonSelect: {
        color: '#BDBDBD',
        fontWeight: '600',
        fontSize: 17,
        paddingLeft: 10
    },
    txtError: {
        ...Common.txtError,
        marginTop: '2%'
    },
    loaderImage: {
        height: 60,
        width: 60,
        padding: 0,
        marginTop: '2%'
    },
})