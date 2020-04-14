import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from 'src/pages/home'
import EmplyeeListScreen from 'src/pages/employee/list'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Color } from './styles/color'

console.disableYellowBox = true
const Tab = createMaterialBottomTabNavigator()
const RootStack = createStackNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: Color.amber300 }}
            activeColor={Color.deepOrange600}
        >
            <Tab.Screen
                name="List"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="view-list" color={Color.orange600} style={{ fontSize: 22 }} />
                    )
                }}
            />
            <Tab.Screen
                name="Add"
                component={EmplyeeListScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="add-a-photo" color={Color.orange600} style={{ fontSize: 22 }} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator mode="modal" headerMode="none">
                <RootStack.Screen name="Main" component={TabNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}
export default App




