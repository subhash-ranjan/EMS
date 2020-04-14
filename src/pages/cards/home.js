import React from 'react'
import { View, Image, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native'
import { Divider, Colors, Button } from 'react-native-paper'
import { Transition, Transitioning } from "react-native-reanimated"
import { Common, Color } from 'src/styles/main'
import CustomNavBar from 'src/components/customNavBar'
import CardItem from 'src/components/cards'
import SearchBar from 'src/components/searchBar'
import ItemList from 'src/pages/cards/itemList'
import { CardImage1, CardImage2, CardImage3, CardImage4 } from 'src/components/images'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const DEVICE_WIDTH = Dimensions.get("window").width
const imageList = [
    {
        id: 1,
        image: CardImage1
    },
    {
        id: 2,
        image: CardImage2
    },
    {
        id: 3,
        image: CardImage3
    },
    {
        id: 4,
        image: CardImage4
    }
]
const navbarTypes = ['list', 'grid']

class home extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedTab: 0,
            type: navbarTypes[0],
        }
        this.ref = React.createRef()
    }
    transition = (
        <Transition.Together>
            <Transition.In
                type="fade"
                durationMs={200}
                interpolation='easeInOut'
            />
            <Transition.Change
                type="fade"
                durationMs={300}
                interpolation="easeInOut" />
        </Transition.Together>
    )
    render() {
        const isGridView = this.state.type == navbarTypes[0] ? false : true
        return (
            <SafeAreaView style={styleThis.container}>
                <SearchBar />
                <Divider style={Common.divider} />
                <Transitioning.View
                    ref={this.ref}
                    transition={this.transition}
                    style={styleThis.contain}
                >
                    <CustomNavBar
                        types={navbarTypes}
                        activeType={this.state.type}
                        onToggle={this.onToggle}
                    />
                    <View style={{ ...styleThis.viewRows, marginBottom: 50 }}>
                        <ItemList isGridView={isGridView} />
                    </View>
                </Transitioning.View>
            </SafeAreaView >
        )
    }
    componentDidUpdate = () => {
        this.ref.current.animateNextTransition()
    }
    onToggle = (type) => {
        this.ref.current.animateNextTransition()
        this.setState({ type })
    }
}
export default home

const styleThis = StyleSheet.create({
    container: {
        flex: 1,
        ...Common.alignCenter,
        //backgroundColor: Color.gray100
    },
    contain: {
        flex: 1,
        ...Common.flexColoumn,
        ...Common.alignStart,
    },
    viewRows: {
        ...Common.flexColoumn,
        ...Common.alignCenter,
        width: DEVICE_WIDTH,
        paddingVertical: 10,
    },
})

