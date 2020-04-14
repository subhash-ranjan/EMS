import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/app'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import configureStore from 'src/config/configureStore'
const store = configureStore()

const theme = {
    ...DefaultTheme,
    s: {
        ...DefaultTheme.s,
        primary: '#3f50b5',
        accent: '#f1c40f',
    },
}
const StarterApp = () => (
    <Provider store={store}>
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    </Provider>
)
AppRegistry.registerComponent('EMS', () => StarterApp)