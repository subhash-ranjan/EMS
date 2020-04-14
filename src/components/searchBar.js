import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { Searchbar } from 'react-native-paper'
import { Transition, Transitioning } from "react-native-reanimated"
import CustomIconButton from 'src/components/customIconButton'

const DEVICE_WIDTH = Dimensions.get("window").width

class searchBar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            isSearchBar: false
        }
        this.refBanner = React.createRef()
    }
    transitionBanner = (
        <Transition.Together>
            <Transition.In
                type="slide-top"
                durationMs={300}
                interpolation="easeInOut"
            />
            <Transition.Out
                type="fade"
                durationMs={300}
                interpolation="easeInOut" />
        </Transition.Together>
    )
    render() {
        return (
            <Transitioning.View
                ref={this.refBanner}
                transition={this.transitionBanner}
                style={styleThis.banner}
            >
                {!this.state.isSearchBar &&
                    <View style={{ ...Common.flexRow, justifyContent: 'flex-end', paddingRight: 5 }} >
                        <CustomIconButton
                            name='search'
                            style={{ color: Color.indigo300, fontSize: 32 }}
                            size={32}
                            onPress={() => this.toggleSearchBar(true)}
                        />
                    </View>
                }
                {this.state.isSearchBar &&
                    <View style={{ ...Common.flexRow, ...Common.alignCenter }} >
                        <Searchbar
                            placeholder="title"
                            onChangeText={this._onChangeSearch}
                            value={this.state.searchText}
                            style={styleThis.searchBar}
                            iconColor={Color.indigo200}
                        />
                        <CustomIconButton
                            name='cancel'
                            style={{ color: Color.primary, fontSize: 30 }}
                            size={30}
                            onPress={() => this.toggleSearchBar(false)}
                        />
                    </View>
                }
            </Transitioning.View>
        )
    }
    componentDidMount = () => {
        this.refBanner.current.animateNextTransition()
    }
    componentDidUpdate = () => {
        this.refBanner.current.animateNextTransition()
    }
    toggleSearchBar = (isVisible) => {
        this.refBanner.current.animateNextTransition()
        this.setState({ isSearchBar: isVisible })
    }
    _onChangeSearch = (val) => {
        if (val != '' && !/^[a-zA-Z]+$/.test(val))
            return false
        this.setState({ searchText: val })
    }
}
export default searchBar

const styleThis = StyleSheet.create({
    transitionContainer: {
        flex: 1,
    },
    banner: {
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH,
        height: 60,
        //backgroundColor: Color.indigo50
    },
    searchBar: {
        height: 40,
        width: DEVICE_WIDTH - 80,
        elevation: 0,
        color: Color.indigo200
    }
})
