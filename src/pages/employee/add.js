import React from 'react'
import { View, StyleSheet, Platform, ScrollView, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { Button, Text, TextInput, Subheading, Portal } from 'react-native-paper'
import { connect } from 'react-redux'
import { Common, Color } from 'src/styles/main'
import { fetchDepartment, fetchDesignation, postEmployee } from 'src/actions/employee'
import dateMonths from 'src/config/date'
import ProgressBar from 'src/components/progressBar'
import ModalDrawer from 'src/components/modalDrawer'
import Icon from 'react-native-vector-icons/Ionicons'
import { Transition, Transitioning } from "react-native-reanimated"

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
            modalVisible: false,
            modalType: 'list',
            isDrawerPickerInvoked: false,
            drawerMode: '',
            drawerData: [],
            drawerDataPicker: dateMonths,

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
            isSuccessShow: false,

            //loader related
            loaderText: ''
        }
        this.ref = React.createRef()
    }
    transition = (
        <Transition.Together>
            <Transition.In
                type='scale'
                durationMs={200}
                interpolation="linear" />
            <Transition.Out
                type='fade'
                durationMs={200}
                interpolation="linear" />
        </Transition.Together>
    )
    render() {
        return (
            <SafeAreaView style={styleThis.main}>
                <ProgressBar isLoading={this.props.isCreating} isLoaderText={true} height={30} />

                <Transitioning.View
                    ref={this.ref}
                    transition={this.transition}
                    style={{ height: 30 }} >
                    {
                        this.state.isSuccessShow &&
                        <View style={{ ...styleThis.input, height: 30 }} >
                            <Icon name="ios-checkmark-circle-outline" color={Color.green400} size={30} />
                        </View>
                    }
                </Transitioning.View>

                <View style={{ ...styleThis.input }} >
                    <Subheading style={{ color: Color.primary }}>Add employee</Subheading>
                </View>
                <View style={styleThis.input}>
                    <TextInput
                        placeholder='name'
                        maxLength={50}
                        style={Common.textInput}
                        value={this.state.name}
                        onChangeText={(text) => this.setInputText(text, 'name')}
                        ref={this.txtName} />
                    {this.state.nameError && <Text style={{ ...Common.txtError }}>Enter name.Only alphabets</Text>}
                </View>
                <View style={styleThis.input}>
                    <TextInput
                        style={Common.textInput}
                        onChangeText={(text) => this.setInputText(text, 'email')}
                        maxLength={70}
                        placeholder='email'
                        value={this.state.email}
                        ref={this.txtEmail} />
                    {this.state.emailError && <Text style={{ ...Common.txtError }}>Enter valid email</Text>}
                </View>
                <View style={styleThis.input}>
                    <Button
                        mode='outlined'
                        title="Department"
                        contentStyle={{ ...Common.button, width: 300 }}
                        color={Color.indigo300}
                        icon={() => (
                            <Icon name="ios-arrow-down" color={Color.indigo300} size={18} />
                        )}
                        onPress={(src) => this.handleOpen('department')}>
                        <Text>{this.state.departmentText}</Text>
                    </Button>
                    {this.state.departmentError && <Text style={{ ...Common.txtError }}>Select department</Text>}
                </View>
                <View style={styleThis.input}>
                    <Button
                        mode='outlined'
                        title="Designation"
                        color={Color.indigo300}
                        contentStyle={{ ...Common.button, width: 300 }}
                        icon={() => (
                            <Icon name="ios-arrow-down" color={Color.indigo300} size={18} />
                        )}
                        onPress={(src) => this.handleOpen('designation')}>
                        <Text>{this.state.designationText}</Text>
                    </Button>
                    {this.state.designationError && <Text style={{ ...Common.txtError }}>Select designation</Text>}
                </View>
                <View style={styleThis.input}>
                    <Button
                        mode='outlined'
                        title="doj"
                        contentStyle={{ ...Common.button, width: 300 }}
                        icon='calendar'
                        color={Color.indigo300}
                        onPress={(src) => this.handleOpen('doj')}>
                        <Text>{this.state.dojText}</Text>
                    </Button>
                    {this.state.dojError && <Text style={{ ...Common.txtError }}>Select date of joining</Text>}
                </View>
                <View style={styleThis.input}>
                    <Button
                        mode='contained'
                        title="Create User"
                        color={Color.indigo500}
                        style={{ ...Common.button }}
                        onPress={() => this.submitEmployee()}>
                        Submit
                    </Button>
                </View>

                {
                    this.state.modalVisible &&
                    <ModalDrawer
                        data={this.state.drawerData}
                        name={'empadd'}
                        mode={this.state.modalType}
                        visible={this.state.modalVisible}
                        hideModal={() => { this.closeDrawer() }}
                        onPress={(item, module) => this.onItemSelection(item, module)}
                        onSelectFinal={(item) => this.setDojValue(item)}
                    />
                }
            </SafeAreaView >
        )
    }
    componentDidMount = () => {
        // let employee = this.props.navigation.getParam('item', '')
        // if (employee != null && employee.id > 0) {
        //     this.setState({
        //         designationText: employee.DESIGNATION,
        //         designationId: employee.designation,
        //         departmentText: employee.DEPARTMENT,
        //         departmentId: employee.dept,
        //         dojText: employee.doj,
        //         dojId: 0,
        //         name: employee.name,
        //         email: employee.email,
        //         mode: 'update',
        //         id: employee.id
        //     })
        // } else {
        //     this.setState({ mode: 'insert' })
        // }
        this.props.getDepartments()
        this.props.getDesignations()
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

            setTimeout(() => {
                this.setState({ isSuccessShow: false })
            }, 800)
        }
        this.ref.current.animateNextTransition()
    }
    handleOpen = (src) => {
        let lstSrc = []
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
                modalVisible: true,
                modalType: 'calendar',
                drawerMode: src,
                drawerData: lstSrc,
            })
        }
        else {
            this.setState({
                modalVisible: true,
                modalType: 'list',
                drawerMode: src,
                drawerData: lstSrc
            })
        }
        this.setInputText('', src)
    }
    closeDrawer = async () => {
        this.setState({ modalVisible: false })
    }
    onItemSelection = async (item, module) => {
        await this.closeDrawer()
        switch (this.state.drawerMode) {
            case 'department':
                this.setState({ departmentId: item.id, departmentText: item.name })
                break
            case 'designation':
                this.setState({ designationId: item.id, designationText: item.name })
                break
            default: break
        }
    }
    setDojValue = async (val) => {
        await this.closeDrawer()
        this.setState({ dojText: val })
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
    submitEmployee = () => {
        this.setState({ loaderText: 'saving data..' })
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
        flex: 1,
        ...Common.flexColumn,
        ...Common.alignStart,
    },
    body: {
        flex: 1,
        ...Common.flexColumn,
        ...Common.alignStart,
    },
    input: {
        ...Common.alignCenter,
        width: '100%',
        paddingVertical: 10,
    },
})