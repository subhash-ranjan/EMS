import React from 'react'
import { View, Alert, StyleSheet, Image, SafeAreaView, Platform, Dimensions } from 'react-native';
import CustomFlatList from 'src/components/customFlatList'
import { connect } from 'react-redux'
import { Common, Color } from 'src/styles/main'
import { fetchDepartment, postDepartment } from 'src/actions/employee'
import ProgressBar from 'src/components/progressBar'
import { Divider, Text, Subheading } from 'react-native-paper'

const WindowHeight = Dimensions.get('window').height
const actionBarHeight = 80
let listHeight = '83%'

class list extends React.Component {
    constructor(props) {
        super(props)
        props = {
            isFetching: false,
            departments: [],
            isCreating: false,
            isCreateSuccess: false,
            error: false,
            mode: '',
            actionType: '',
            postType: '',
        }
        if (Platform.OS === 'android') {
            listHeight = '83%'
        } else {
            listHeight = '85%'
        }
    }
    render() {
        return (
            <SafeAreaView style={styleThis.main}>
                <ProgressBar isLoading={this.props.isFetching || this.props.isCreating} isLoaderText={false} height={40} />

                <View style={{ ...styleThis.input }} >
                    <Subheading style={{ color: Color.primary }}>Department list</Subheading>
                </View>
                <Divider />
                <View style={[styleThis.listBar, { height: listHeight }]}>
                    {
                        this.props.departments.length > 0
                        &&
                        <CustomFlatList
                            data={this.props.departments}
                            name={'Department'}
                            isImage={false}
                            isPress={false}
                            isDetail={false}
                            isDelete={true}
                            isEdit={false}
                            onDeleteClickAction={(item, module) => this.onPressDelete(item, module)}>
                        </CustomFlatList>}
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.props.getDepartments()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.actionType == 'POST' && nextProps.isCreateSuccess && nextProps.mode == 'DEPARTMENT') {
            this.props.getDepartments()
        }
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
                        this.props.postDepartmentApi(objRequest, item.id, 'delete')

                    }
                },
            ],
            { cancelable: false }
        )

    }
}
function mapStateToProps(state) {
    return {
        isFetching: state.employee.isFetching,
        departments: state.employee.departments,
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
        postDepartmentApi: (objRequest, id, mode) => dispatch(postDepartment(objRequest, id, mode))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(list)
const styleThis = StyleSheet.create({
    main: {
        flexDirection: 'column',
        height: WindowHeight,
        flex: 1
    },
    actionBar: {
        height: actionBarHeight,
        ...Common.alignCenter
    },
    listBar: {
        //borderWidth: 3
    },
    txtHeader: {
        color: Color.gray700,
        fontWeight: '400',
        fontSize: 20,
    },
    input: {
        ...Common.alignCenter,
        width: '100%',
        paddingVertical: 10,
    },
})