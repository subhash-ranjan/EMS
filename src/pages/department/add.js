import React from 'react'
import { View, TouchableOpacity, Platform, StyleSheet, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { Common, Color } from 'src/styles/main'
import { postDepartment } from 'src/actions/employee'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button, Text, TextInput } from 'react-native-paper'
import ProgressBar from 'src/components/progressBar'

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
            name: '',
            nameError: false,
            mode: 'insert',
            isSuccessShow: false
        }
    }
    render() {
        return (
            <SafeAreaView style={styleThis.main}>
                <ProgressBar isLoading={this.props.isCreating} isLoaderText={true} height={30} />
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? "padding" : ""}
                    style={styleThis.body}>
                    {
                        this.state.isSuccessShow &&
                        this.state.name == '' &&
                        <View style={{ alignItems: 'center', marginBottom: 8, flexDirection: 'row' }}>
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
                        />
                        {this.state.nameError && <Text style={styleThis.txtError}>Enter department name</Text>}
                    </View>
                    <View style={styleThis.input}>

                        <Button
                            mode='contained'
                            title="Create User"
                            color={Color.indigo500}
                            style={{ ...Common.button }}
                            onPress={() => this.submitDepartment()}>
                            Submit
                    </Button>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.actionType == 'POST' && nextProps.isCreateSuccess && nextProps.mode == 'DEPARTMENT') {
            this.setState({
                name: '',
                isSuccessShow: true
            })
        }
    }
    setInputText(text, type) {
        if (this.state.isSuccessShow) {
            this.setState({ isSuccessShow: false })
        }
        let regName = /^[a-zA-Z]+$/
        if (text != '' && !regName.test(text))
            return false
        this.setState({ nameError: false, name: text })
    }
    submitDepartment() {
        if (this.state.name == '') {
            this.setState({ nameError: true })
        }
        else {

            const objRequest = {
                name: this.state.name
            }

            this.props.postDepartment(objRequest, this.state.mode)
        }
    }
    componentDidMount() {
        if (this.state.isSuccessShow)
            this.setState({ isSuccessShow: false })
    }
}
function mapStateToProps(state) {
    return {
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
        postDepartment: (objRequest, mode) => dispatch(postDepartment(objRequest, 0, mode))
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
    header: {
        flexGrow: 2
    },
    body: {
        flexGrow: 6,
        width: '100%',
        ...Common.alignCenter,
        paddingBottom: '30%',
        paddingBottom: '10%'
    },
    input: {
        height: 80,
        width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
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