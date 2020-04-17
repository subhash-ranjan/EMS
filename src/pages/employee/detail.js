import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { connect } from 'react-redux'
import { fetchRatingAndSalary, postRatingAndSalary } from 'src/actions/employee'
import dateMonths from 'src/config/date'
import ProgressBar from 'src/components/progressBar'
import { Button, Text, TextInput, Divider, Card, Avatar, Title, Paragraph, Subheading, DataTable, Caption } from 'react-native-paper'
import CustomIconButton from 'src/components/customIconButton'
const { height } = Dimensions.get('window')

const lstYear = dateMonths[0]['year']
let lstYearToUpdate = []

class empDetailNew extends Component {
    constructor(props) {
        super(props)
        props = {
            isFetching: false,
            designations: [],
            departments: [],
            ratings: [],
            isCreating: false,
            isCreateSuccess: false,
            error: false,
            mode: '',
            actionType: '',
            postType: '',
        }
        this.state = {
            itemId: 0,
            isFormInvalid: false,
            currentEmployee: [],
            employeeid: 0,
        }
    }
    render() {
        return (
            <SafeAreaView style={{ ...styleThis.container }}>
                <ProgressBar isLoading={this.props.isFetching} isLoaderText={false} height={5} />
                <View style={{ ...styleThis.input }} >
                    <Subheading style={{ color: Color.primary }}>Employee details</Subheading>
                </View>
                <View style={{ ...styleThis.squareBox }}>
                    <ScrollView style={{ height: '90%', width: '100%' }}>
                        <Card style={{ ...styleThis.Card }}>
                            <Card.Title
                                subtitle='EMPLOYEE DETAILS'
                                left={(props) => <Avatar.Icon size={40} icon="account-details" />}
                            />
                            <Divider />
                            <Card.Content>
                                <DataTable.Row>
                                    <DataTable.Cell>Name</DataTable.Cell>
                                    <DataTable.Cell numeric>{this.props.employee.name}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>Email</DataTable.Cell>
                                    <DataTable.Cell numeric>{this.props.employee.email}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>Department</DataTable.Cell>
                                    <DataTable.Cell numeric>{this.props.employee.DEPARTMENT}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>Designation</DataTable.Cell>
                                    <DataTable.Cell numeric>{this.props.employee.DESIGNATION}</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row>
                                    <DataTable.Cell>Date of joining</DataTable.Cell>
                                    <DataTable.Cell numeric>{this.props.employee.doj}</DataTable.Cell>
                                </DataTable.Row>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Title
                                subtitle='EMPLOYEE RATINGS'
                                left={(props) => <Avatar.Icon size={40} icon="star" />}
                            />
                            <Divider />
                            <Card.Content>
                                <View style={{ ...styleThis.boxRating }}>
                                    {
                                        !this.props.isFetching && this.props.rating.length == 0 &&
                                        <View style={{
                                            ...Common.flexColumn,
                                            ...Common.alignSpaceEven,
                                        }}>
                                            <Text>No Ratings </Text>
                                            <Button
                                                mode='text'
                                                onPress={() => {
                                                    this.props.navigation.navigate('EmployeeAddRatingS', {
                                                        employeeId: this.state.employeeid,
                                                        yearsToUpdate: lstYearToUpdate
                                                    })
                                                }}
                                            >
                                                <Text style={{ color: Color.indigo400 }} > ADD RATING</Text>
                                            </Button>
                                        </View>
                                    }
                                    {
                                        this.props.rating.length > 0 &&
                                        <DataTable>
                                            <DataTable.Header>
                                                <DataTable.Title >YEAR</DataTable.Title>
                                                <DataTable.Title numeric>RATING</DataTable.Title>
                                                <DataTable.Title numeric>SALARY</DataTable.Title>
                                            </DataTable.Header>
                                            {
                                                this.props.rating.map(function (item) {
                                                    return (
                                                        <DataTable.Row key={String(item.id)}>
                                                            <DataTable.Cell>{item.YEAR} </DataTable.Cell>
                                                            <DataTable.Cell numeric>{item.salary} </DataTable.Cell>
                                                            <DataTable.Cell numeric>{item.rating} </DataTable.Cell>
                                                        </DataTable.Row>
                                                    )
                                                })
                                            }
                                        </DataTable>
                                    }
                                </View>

                            </Card.Content>
                        </Card>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        let employee = !!this.props.route.params ? this.props.route.params.item : null
        if (employee != null) {
            this.setState({
                employeeid: employee.id
            })
        }
        this.props.getEmployeeRating(employee.id)//employee.id)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.actionType == 'POST' && nextProps.isCreateSuccess && nextProps.mode == 'RATING') {
            lstYearToUpdate.map((item, index) => {
                arrRating[index].salary = ''
                arrRating[index].ratingText = ''
            })
            this.setState({ rating: arrRating })
            this.props.getEmployeeRating(this.state.employeeid)//employee.id)
        }
        if (nextProps.employee.doj != null) {
            let doj = JSON.parse(JSON.stringify(nextProps.employee['doj']))
            doj = doj.substring(0, 4)
            lstYearUpdated = lstYear.filter(e => e.id >= doj)
            let years = nextProps.rating.length > 0 ? nextProps.rating.map(x => x['YEAR']) : ''
            if (nextProps.rating.length > 0)
                lstYearUpdated = lstYearUpdated.filter(e => !String(years).includes(e.id))
            lstYearToUpdate = lstYearUpdated
        }
    }
}
function mapStateToProps(state) {
    let resultRating = []
    let resultEmployee = []
    if (state.employee.ratings.length > 0) {
        resultEmployee = state.employee.ratings[0]['employee'][0]
        resultRating = state.employee.ratings[1]['rating']
    }
    return {
        rating: resultRating,
        employee: resultEmployee,
        isFetching: state.employee.isFetching,
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
        getEmployeeRating: (employeeId) => dispatch(fetchRatingAndSalary('', employeeId, 'fetchrating')),
        postRatingAndSalary: (objRequest) => dispatch(postRatingAndSalary(objRequest, 0, 'insertrating')),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(empDetailNew)
const styleThis = StyleSheet.create({
    container: {
        flex: 1,
        ...Common.flexColumn,
        ...Common.alignStart,
        height: height,
        paddingBottom: 10
    },
    input: {
        ...Common.alignCenter,
        width: '100%',
        paddingVertical: 10,
    },
    squareBox: {
        width: '100%',
        backgroundColor: Color.gray200,
        padding: 10,
    },
    Card: {
        marginBottom: 20
    },
    boxRating: {
        flex: 1,
        ...Common.flexColumn,
        ...Common.alignCenter,
        minHeight: 100,
    },


    squareBox2: {
        width: '96%',
        backgroundColor: Color.gray200,
        position: 'relative',
        top: 20,
    },
    squareBox3: {
        ...Common.flexColumn,
        ...Common.alignStart,
        width: '100%',
        backgroundColor: Color.gray200,
        borderColor: Color.gray200,
        position: 'relative',
    },
    boxHeader1: {
        height: 50,
        ...Common.alignCenter,
        borderWidth: .5,
        backgroundColor: Color.amber300,
        borderColor: Color.orange300,
    },
    boxHeader2: {
        height: 50,
        ...Common.alignCenter,
        borderWidth: .5,
        backgroundColor: Color.amber400,
        borderColor: Color.orange400,
    },
    boxButton: {
        width: '100%',
        ...Common.alignStart,
    },
    buttonRating: {
        height: 50,
        width: '96%',
        ...Common.alignCenter,
        backgroundColor: Color.deepOrange800,
        borderColor: Color.deepOrange800,
    },
    boxHeaderText: {
        fontSize: 20,
        color: Color.white,
        fontWeight: '300',
    },
    boxContent: {
        // ...Common.alignCenter,
    },
    rowItem: {
        ...Common.flexRow,
        flexGrow: 1,
        borderBottomWidth: .5,
        borderColor: Color.white,
        paddingTop: 3,
        height: '20%'
    },
    rowItemHeader: {
        width: '50%',
        textAlign: 'right',
        fontSize: 15,
        fontWeight: 'bold',
        paddingRight: 5
    },
    rowItemText: {
        width: '50%',
        textAlign: 'left',
        color: Color.gray800,
        fontSize: 15,
        paddingLeft: 5
    },
    colItemRow: {
        ...Common.flexRow,
        backgroundColor: Color.gray300,
        height: 35
    },
    colItemRowContent: {
        ...Common.flexRow,
        height: 43,
    },
    colItems: {
        ...Common.alignCenter,
        width: '33.33%',
        borderWidth: .2,
        borderColor: Color.white,
    },
    loaderImage: {
        height: 60,
        width: 60,
        padding: 0,
        margin: 0
    },
    circle: {
        height: 50,
        width: 50,
        backgroundColor: Color.white,
        borderRadius: 50,
        ...Common.alignCenter,
        borderWidth: 1,
        borderColor: Color.gray400,
    },
    buttonSelect: {
        display: 'flex',
        borderWidth: 1,
        borderColor: Color.gray500,
        flexDirection: 'row',
        paddingRight: '5%',
        paddingLeft: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
        width: '80%'
    },
    txtButtonSelect: {
        color: Color.gray500,
        fontWeight: '600',
        fontSize: 17,
    },
    textboxWhite: {
        borderWidth: 1,
        borderColor: Color.gray500,
        height: 30,
        //...Common.alignCenter,
        width: 80,
        padding: '5%',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    buttonSave: {
        flexDirection: "row",
        ...Common.alignCenter,
        height: 45,
        width: 250,
        marginTop: 5,
        backgroundColor: Color.cyan900,
    },

    ratingError: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtError: {
        ...Common.txtError,
        margin: '3%'
    },
})
let arrRating = [
    { ratingText: '', salary: '' },
    { ratingText: '', salary: '' },
    { ratingText: '', salary: '' },
    { ratingText: '', salary: '' },
    { ratingText: '', salary: '' },]

