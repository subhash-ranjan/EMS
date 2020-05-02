import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, LayoutAnimation, Platform, UIManager } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { Searchbar } from 'react-native-paper'
import CustomIconButton from 'src/components/customIconButton'

const DEVICE_WIDTH = Dimensions.get("window").width
const boxHeight = 80

class searchBar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            isSearchBar: false,
            boxHeight: 0
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }
    render() {
        return (
            <View style={styleThis.banner}>
                <View style={{ ...Common.flexRow, justifyContent: 'flex-end', paddingRight: 5 }} >
                    <CustomIconButton
                        name='search'
                        type='material'
                        style={{ color: Color.indigo400, fontSize: 32 }}
                        size={32}
                        onPress={() => this.toggleSearchBar(true)}
                    />
                </View>
                <View style={{
                    ...Common.flexRow,
                    ...Common.alignCenter,
                    height: this.state.boxHeight
                }} >
                    {this.state.isSearchBar &&
                        <React.Fragment>
                            <Searchbar
                                placeholder="title"
                                onChangeText={this._onChangeSearch}
                                value={this.state.searchText}
                                style={styleThis.searchBar}
                                iconColor={Color.indigo200}
                            />
                            <CustomIconButton
                                name='cancel'
                                type='material'
                                style={{ color: Color.indigo400, fontSize: 35, marginLeft: 3 }}
                                onPress={() => this.toggleSearchBar(false)}
                            />
                        </React.Fragment>
                    }
                </View>
            </View>
        )
    }
    componentDidMount = () => {
    }
    componentDidUpdate = () => {
    }
    toggleSearchBar = (isVisible) => {
        LayoutAnimation.configureNext(LayoutAnimation.create(
            300,
            LayoutAnimation.Types.linear,
            LayoutAnimation.Properties.opacity
        ))
        this.setState({ isSearchBar: isVisible, boxHeight: isVisible ? boxHeight : 0 })
    }
    _onChangeSearch = (val) => {
        if (val != '' && !/^[a-zA-Z]+$/.test(val))
            return false
        this.setState({ searchText: val })
        this.props.onChangeText(val)
    }
}
export default searchBar

const styleThis = StyleSheet.create({
    banner: {
        ...Common.flexColumn,
        ...Common.alignCenter,
        width: DEVICE_WIDTH,
        backgroundColor: Color.ingigo50,
        minHeight: 50
    },
    searchBar: {
        height: 40,
        width: DEVICE_WIDTH - 80,
        elevation: 0,
        color: Color.indigo400
    }
})
