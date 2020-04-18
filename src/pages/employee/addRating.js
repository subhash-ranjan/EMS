import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { connect } from 'react-redux'
import { fetchRatingAndSalary, postRatingAndSalary } from 'src/actions/employee'
import dateMonths from 'src/config/date'
import ProgressBar from 'src/components/progressBar'
import { Button, Text, TextInput, Divider, Card, Avatar, Title, Paragraph, Subheading, DataTable, Caption } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

const lstYear = dateMonths[0]['year']
let lstYearToUpdate = []
const lstRating = dateMonths[0]['rating']
let arrRating = [{ ratingText: '', salary: '' }, { ratingText: '', salary: '' }, { ratingText: '', salary: '' }, { ratingText: '', salary: '' }, { ratingText: '', salary: '' },]

export class addRating extends Component {
    constructor(props) {
        super(props)
        props = {
            isCreating: false,
            isCreateSuccess: false,
            error: false,
            mode: '',
            actionType: '',
            postType: '',
        }
        this.state = {
            employeeId: null,
            yearsToUpdate: null,
            rating: arrRating,
            isFormInvalid: false,
            isSuccessShow: false
        }
    }
    render() {
        return (
            <SafeAreaView style={{ ...styleThis.container }}>
                <ProgressBar isLoading={this.props.isCreating} isLoaderText={true} height={30} />
                <View style={{ ...styleThis.input }} >
                    <Subheading style={{ color: Color.primary }}>Add ratings and salary</Subheading>
                </View>
                <ScrollView style={{ height: '100%', width: '100%' }}>
                    <View style={{ ...styleThis.squareBox }}>
                        <Card style={{ ...styleThis.Card }}>
                            <Card.Content>
                                <View style={{ ...styleThis.input }} >
                                    {
                                        this.state.isFormInvalid &&
                                        <Button
                                            icon={() => <Ionicons name='md-warning' style={{ ...Common.txtError }} />}
                                        >
                                            <Text style={{ ...Common.txtError }}>Enter all the rating and salary</Text>
                                        </Button>
                                    }
                                    {
                                        this.state.isSuccessShow &&
                                        <View style={{ ...styleThis.input, height: 30 }} >
                                            <Ionicons name="ios-checkmark-circle-outline" color={Color.green400} size={30} />
                                        </View>
                                    }
                                </View>
                                <Caption> * rating must be from 1 to 5</Caption>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>YEAR</DataTable.Title>
                                        <DataTable.Title>RATING</DataTable.Title>
                                        <DataTable.Title>SALARY</DataTable.Title>
                                    </DataTable.Header>
                                    {
                                        !!this.state.yearsToUpdate &&
                                        this.state.yearsToUpdate.map((item, index) => {
                                            return (
                                                <DataTable.Row key={index} style={{ height: 60 }}>
                                                    <DataTable.Cell>{item.name}</DataTable.Cell>
                                                    <View style={{ ...Common.alignCenter, padding: 5 }}>
                                                        <TextInput
                                                            placeholder='rating'
                                                            maxLength={1}
                                                            value={this.state.rating[index].ratingText}
                                                            style={{ height: '100%', width: 100 }}
                                                            onChangeText={(text) => this.setInputText(text, index, 'rating')}
                                                        />
                                                    </View>
                                                    <View style={{ ...Common.alignCenter, padding: 5 }}>
                                                        <TextInput
                                                            placeholder='salary'
                                                            maxLength={9}
                                                            style={{ height: '100%', width: 100 }}
                                                            value={this.state.rating[index].salary}
                                                            onChangeText={(text) => this.setInputText(text, index, 'salary')}
                                                        />
                                                    </View>
                                                </DataTable.Row>
                                            )
                                        })
                                    }
                                </DataTable>
                                <View style={{ ...styleThis.input }} >
                                    <Button
                                        mode='contained'
                                        title="Submit"
                                        color={Color.indigo500}
                                        style={{ ...Common.button, marginTop: 10 }}
                                        onPress={() => this.saveRating()}>
                                        Submit
                                    </Button>
                                </View>
                            </Card.Content>
                        </Card>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    componentDidMount = () => {
        if (!!this.props.route.params) {
            const { employeeId, yearsToUpdate } = this.props.route.params
            this.setState({
                employeeId: employeeId,
                yearsToUpdate: yearsToUpdate
            })
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isCreateSuccess && nextProps.mode == 'RATING') {
            lstYearToUpdate.map((item, index) => {
                arrRating[index].salary = ''
                arrRating[index].ratingText = ''
            })

            this.setState({ isSuccessShow: true, rating: arrRating })
            setTimeout(() => {
                this.setState({ isSuccessShow: false })
            }, 1500)
        }
    }
    setInputText(text, index, type) {
        var regNumber = /^\d+$/
        if (text.length > 0 && !regNumber.test(text))
            return
        if (type == 'salary') {
            arrRating[index].salary = text
        } else {

            if (text > 5)
                return

            arrRating[index].ratingText = text
        }
        this.setState({ rating: arrRating })
    }
    saveRating = () => {
        let _year = ''
        let _rating = ''
        let _salary = ''
        let loopLen = this.state.yearsToUpdate.length
        let isValid = true
        this.state.yearsToUpdate.map((item, index) => {
            if (arrRating[index].ratingText == 'rating' || arrRating[index].salary == '') {
                isValid = false
            }
            let str = index < loopLen - 1 ? '#' : ''
            _year = _year + item.id + str
            _rating = _rating + arrRating[index].ratingText + str
            _salary = _salary + arrRating[index].salary + str
        })
        if (isValid) {
            const objRequest = {
                employee: this.state.employeeId,
                year: _year,
                rating: _rating,
                salary: _salary
            }
            this.props.postRatingAndSalary(objRequest)
        }
        else {
            this.setState({ isFormInvalid: true })
        }
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
        postRatingAndSalary: (objRequest) => dispatch(postRatingAndSalary(objRequest, 0, 'insertrating')),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(addRating)
const styleThis = StyleSheet.create({
    container: {
        flex: 1,
        ...Common.flexColumn,
        ...Common.alignStart,
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

    ratingError: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtError: {
        ...Common.txtError,
        margin: '3%'
    }
})
