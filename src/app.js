import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import LandingScreen from 'src/pages/landing'
import AccountScreen from 'src/pages/account'
import HomeScreen from 'src/pages/home'
import EmplyeeHomeScreen from 'src/pages/employee/index'
import EmplyeeListScreen from 'src/pages/employee/list'
import EmplyeeTopListScreen from 'src/pages/employee/topList'
import EmplyeeAddScreen from 'src/pages/employee/add'
import EmployeeDetailScreen from 'src/pages/employee/detail'
import EmployeeAddRatingScreen from 'src/pages/employee/addRating'
import DepartmentListScreen from 'src/pages/department/list'
import DepartmentAddScreen from 'src/pages/department/add'
import DesignationListScreen from 'src/pages/designation/list'
import DesignationAddScreen from 'src/pages/designation/add'
import ReportsScreen from 'src/pages/reports'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomIconButton from 'src/components/customIconButton'
import { Color } from './styles/color'

import * as firebase from "firebase/app"
import "firebase/auth"
var firebaseConfig = {
    apiKey: "***",
    authDomain: ""***",
    databaseURL: ""***",
    projectId: ""***",
    storageBucket: "",
    messagingSenderId: ""***",
    appId: ""***"
}
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}


console.disableYellowBox = true
const Tab = createMaterialBottomTabNavigator()
const RootStack = createStackNavigator()
const EmployeeStack = createStackNavigator()
const HomeStack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator headerMode="none" mode="modal">
                <RootStack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                <RootStack.Screen name="Main" component={TabNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default App

const TabNavigator = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: Color.bluegray900 }}
            activeColor={Color.bluegray200}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home-circle" color={Color.bluegray300} style={{ fontSize: 22 }} />) }}
            />
            <Tab.Screen
                name="Employee"
                component={EmployeeStackScreen}
                options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-tie" color={Color.bluegray400} style={{ fontSize: 22 }} />) }}
            />
            <Tab.Screen
                name="Reports"
                component={ReportsScreen}
                options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="chart-pie" color={Color.bluegray400} style={{ fontSize: 22 }} />) }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account-circle" color={Color.bluegray400} style={{ fontSize: 22 }} />) }}
            />
        </Tab.Navigator>
    )
}
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <HomeStack.Screen name="TopList" component={EmplyeeTopListScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="Reports" component={ReportsScreen} options={({ navigation }) => option(navigation)} />
        </HomeStack.Navigator>
    )
}
const EmployeeStackScreen = () => {
    return (
        <EmployeeStack.Navigator>
            <EmployeeStack.Screen name="EmployeeHome" component={EmplyeeHomeScreen} options={{ headerShown: false }} />
            <EmployeeStack.Screen name="EmployeeList" component={EmplyeeListScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="EmployeeAdd" component={EmplyeeAddScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="EmployeeAddRating" component={EmployeeAddRatingScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="DepartmentList" component={DepartmentListScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="DesignationList" component={DesignationListScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="DepartmentAdd" component={DepartmentAddScreen} options={({ navigation }) => option(navigation)} />
            <EmployeeStack.Screen name="DesignationAdd" component={DesignationAddScreen} options={({ navigation }) => option(navigation)} />
        </EmployeeStack.Navigator>
    )
}
const BackButton = ({ navigation }) => {
    return (
        <CustomIconButton
            name='keyboard-arrow-left'
            type='material'
            style={{ fontSize: 40, color: Color.indigo400 }}
            onPress={() => navigation.goBack()}
        />
    )
}

const option = (navigation) => ({
    animationEnabled: true,
    headerBackImage: () => (<BackButton navigation={navigation} />),
    title: '',
    headerTransparent: true,
})




