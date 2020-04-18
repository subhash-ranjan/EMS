import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { Common, Color } from 'src/styles/main'
import * as firebase from "firebase/app"
import { Text, Button, Caption, Avatar, Card } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class account extends Component {
    unsubscribe = null
    constructor(props) {
        super(props)
        this.state = {
            isAnonymous: false,
            email: ''
        }
    }
    render() {
        return (
            <SafeAreaView style={styleThis.main}>
                <View style={styleThis.header}>
                    <Card>
                        <Card.Content style={{ ...styleThis.Card }}>
                            <Avatar.Icon size={50} icon="account-tie" />
                            {
                                this.state.isAnonymous
                                &&
                                <Caption style={{ ...styleThis.text }}>Logged in as : Anonymous user </Caption>
                            }
                            {
                                !this.state.isAnonymous
                                &&
                                <Caption style={{ ...styleThis.text }}>Logged in as : {this.state.email} </Caption>
                            }
                        </Card.Content>
                    </Card>
                </View>
                <View style={styleThis.body}>
                    <Button
                        mode='contained'
                        contentStyle={{ width: 250 }}
                        onPress={() => this.signOutUser()}>
                        Sign Out
                    </Button>

                </View>
            </SafeAreaView>
        )
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    isAnonymous: user.isAnonymous,
                    email: user.email,
                    //name: user.displayName
                })
                this.props.navigation.navigate('Main')
            } else {
                this.props.navigation.navigate('Landing')
            }
        })
    }
    signOutUser() {
        firebase.auth().signOut()
    }
    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe()
    }
}
const styleThis = StyleSheet.create({
    main: {
        flexDirection: 'column',
        height: '100%',
        flex: 1
    },
    header: {
        flexGrow: 1,
        height: 180,
        padding: 30,
        ...Common.flexColumn,
        ...Common.alignCenter,
        backgroundColor: Color.gray300,
    },
    Card: {
        flexGrow: 1,
        ...Common.flexColumn,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    body: {
        flexGrow: 4,
        ...Common.alignCenter,
    },
    signoutButton: {
        ...Common.alignCenter,
        height: 40,
        backgroundColor: Color.amber500,
        width: '80%',
        position: 'relative',
        top: 20,
    },
    text: {
        fontSize: 13,
    }
})
