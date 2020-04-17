import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from 'src/pages/home'
import EmplyeeListScreen from 'src/pages/employee/list'
import EmplyeeTopListScreen from 'src/pages/employee/topList'
import EmplyeeAddScreen from 'src/pages/employee/add'
import ReportsScreen from 'src/pages/reports'
import BottomDrawerScreen from 'src/components/bottomDrawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomIconButton from 'src/components/customIconButton'
import { Color } from './styles/color'

console.disableYellowBox = true
const Tab = createMaterialBottomTabNavigator()
const RootStack = createStackNavigator()
const EmployeeStack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator headerMode="none" mode="modal">
                <RootStack.Screen name="Main" component={TabNavigator} />
                <RootStack.Screen name="TopList" component={EmplyeeTopListScreen} options={{ headerShown: false }} />
                {/* <RootStack.Screen name="ModalDrawer" mode="modal" headerMode="none" component={BottomDrawerScreen} options={{ headerShown: false }} /> */}
                <EmployeeStack.Screen name="EmployeeAdd" component={EmplyeeAddScreen} options={{ headerShown: false }} />
                <EmployeeStack.Screen name="Reports" component={ReportsScreen} options={{ headerShown: false }} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default App

const TabNavigator = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: Color.bluegray900 }}
            activeColor={Color.white}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{ tabBarIcon: ({ color }) => (<MaterialIcons name="view-list" color={Color.gray100} style={{ fontSize: 22 }} />) }}
            />
            <Tab.Screen
                name="Employee"
                component={EmployeeStackScreen}
                options={{ tabBarIcon: ({ color }) => (<MaterialIcons name="add-a-photo" color={Color.gray100} style={{ fontSize: 22 }} />) }}
            />
        </Tab.Navigator>
    )
}
const HomeStackScreen = () => {
    return (
        <EmployeeStack.Navigator>
            <EmployeeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <EmployeeStack.Screen
                name="TopList"
                component={EmplyeeTopListScreen}
                options={({ navigation }) => ({
                    animationEnabled: true,
                    headerBackImage: () => (<BackButton navigation={navigation} />),
                    title: '',
                    headerTransparent: true,
                })}
            />
        </EmployeeStack.Navigator>
    )
}
const EmployeeStackScreen = () => {
    return (
        <EmployeeStack.Navigator>
            <EmployeeStack.Screen name="Employee" component={EmplyeeListScreen} options={{ headerShown: false }} />
            {/* <EmployeeStack.Screen name="EmployeeAdd" component={EmplyeeAddScreen} options={{ headerShown: false }} /> */}
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




