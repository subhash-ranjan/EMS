import React from 'react'
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { connect } from 'react-redux'
import CustomSlider from 'src/components/sliderTransition'
import { fetchEmployees } from 'src/actions/employee'
import Icon from 'react-native-vector-icons/Ionicons'
import { ImgBgSqr1, ImgBgSqr2, ImgBgSqr3, } from 'src/components/images'
import CustomIconButton from 'src/components/customIconButton'

const scrollImages = [ImgBgSqr1, ImgBgSqr2, ImgBgSqr3]
const boxColors = [
  { color: Color.gray200 },
  { color: Color.green300 },
  { color: Color.cyan400 },
  { color: Color.teal400 },
  { color: Color.cyan500 },
  { color: Color.teal500 }]

class home extends React.Component {

  constructor(props) {
    super(props)
    props = {
      isFetching: false,
      employees: [],
      departments: [],
      designations: []
    }
  }
  render() {
    return (
      <SafeAreaView style={styleThis.main}>
        <CustomSlider images={scrollImages} isPaging={true} isContainMode={false} height={200}></CustomSlider>
        <ScrollView style={styleThis.nothing}>
          <View style={styleThis.conatiner}>
            <ItemBox
              toRedirect='Employee'
              navigation={this.props.navigation}
              icon='account-tie'
              type='material_com'
              text='LIST OF EMPLOYEES'
            />
            <ItemBox
              toRedirect='TopList'
              navigation={this.props.navigation}
              icon='ios-medal'
              type='ionicons'
              text='TOP PERFORMERS'
            />
          </View>
          <View style={styleThis.conatiner}>
            <ItemBox
              toRedirect='Report'
              navigation={this.props.navigation}
              icon='ios-stats'
              type='ionicons'
              text='REPORTS'
            />
            <ItemBox
              toRedirect='Report'
              navigation={this.props.navigation}
              icon='ios-trending-up'
              type='ionicons'
              text='NET STRENGTH INCREASE'
            />
          </View>
          <View style={styleThis.conatiner}>
            <ItemBox
              toRedirect='DepartmentList'
              navigation={this.props.navigation}
              icon='account-group'
              type='material_com'
              text='LIST OF DEPARTMENTS'
            />
            <ItemBox
              toRedirect='DesignationList'
              navigation={this.props.navigation}
              icon='ios-man'
              type='ionicons'
              text='LIST OF DESIGNATIONS' />
          </View>
        </ScrollView >
      </SafeAreaView >
    )
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.employee.isFetching,
    employees: state.employee.employees,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(fetchEmployees('', 0, 'fetch')),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(home)
const styleThis = StyleSheet.create({
  main: {
    flex: 1
  },
  conatiner: {
    ...Common.flexRow,
    ...Common.alignCenter,
    height: 160
  },
  squareBox: {
    ...Common.flexColumn,
    height: 140,
    flexGrow: 1,
    width: '30%',
    borderRadius: 5,
    margin: 15,
  },
  TopBox: {
    flexGrow: 2,
    ...Common.alignCenter,
    width: '100%',
  },
  BottomBox: {
    flexGrow: 2,
    borderTopWidth: .5,
    borderColor: Color.gray200,
    marginTop: 10
  },
  roundMenu: {
    display: 'flex',
    ...Common.alignCenter,
    borderRadius: 50,
    height: 80,
    width: 80
  },
  boxText: {
    color: Color.gray500,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 12,
    padding: 5
  },
  loaderImage: {
    height: 60,
    width: 60,
    padding: 0,
    margin: 0
  },
  rowActionsBox: {
    ...Common.flexRow,
    width: 70,
    height: 70,
    borderRadius: 50,
    ...Common.alignCenter,
    backgroundColor: Color.amber300,
    marginBottom: '5%'
  }
})

const ItemBox = (props) => {
  return (
    <View style={{ ...styleThis.squareBox }}>
      <View style={styleThis.TopBox}>
        <TouchableOpacity style={{ ...styleThis.roundMenu, backgroundColor: Color.gray300 }}
          onPress={() => props.navigation.navigate(props.toRedirect)}>
          <CustomIconButton
            name={props.icon}
            type={props.type}
            style={{ fontSize: 35, color: Color.indigo300 }}
            onPress={() => props.navigation.navigate(props.toRedirect)}
          />
        </TouchableOpacity>
      </View>
      <View style={styleThis.BottomBox}>
        <Text style={styleThis.boxText}>{props.text}</Text>
      </View>
    </View>
  )
}

