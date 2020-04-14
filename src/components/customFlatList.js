import React from 'react'
import { View, TouchableOpacity, FlatList, TouchableHighlight, StyleSheet } from 'react-native'
import { Common, Color } from 'src/styles/main'
import Swipable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider, Text, Caption } from 'react-native-paper'
let _refList = []

export default class customFlatList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ height: '100%' }}>
                <FlatList
                    ItemSeparatorComponent={flatListItemSeparator}
                    scrollEnabled={true}
                    keyExtractor={item => String(item.id)}
                    ListHeaderComponent={this.props.isHeader ? flatListHeader : null}
                    data={this.props.data}
                    contentContainerStyle={{ justifyContent: 'center' }}
                    renderItem={({ item }) => (
                        <ListItems
                            item={item}
                            type={this.props.name}
                            onPress={this.props.onPress}
                            onEditClick={this.props.onEditClickAction}
                            onDetailClick={this.props.onDetailClickAction}
                            onDeleteClick={this.props.onDeleteClickAction}
                            isImage={this.props.isImage}
                            isPress={this.props.isPress}
                            isEdit={this.props.isEdit}
                            isDetail={this.props.isDetail}
                            isDelete={this.props.isDelete} />
                    )} />

            </View>
        )
    }
    componentWillMount() {
        _refList = []
        _refList.length = 0
    }
    componentWillUnmount() {
        _refList = []
        _refList.length = 0
    }
    componentWillUpdate(nextProps) {
        if (nextProps.isDepartmentChange) {
            _refList = []
            _refList.length = 0
        }
    }
}

const ListItems = ({ item, type, isImage, isPress, isDetail, isDelete, isEdit, onDetailClick, onDeleteClick, onEditClick, onPress }) => {
    return (
        <Swipable
            ref={updateRef}
            onSwipeableRightWillOpen={(ref) => swipeOpen(ref)}
            onSwipeableLeftWillOpen={(ref) => swipeOpen(ref)}
            renderRightActions={
                (progress, dragX, onDetailPress) =>

                    (isDelete || isDetail) &&
                    <RightActionsDetail
                        progress={progress}
                        dragX={dragX}
                        isDelete={isDelete}
                        isDetail={isDetail}
                        onDetailPress={() => { onDetailClick(item, type) }}
                        onDeletePress={() => { onDeleteClick(item, type) }} />
            }
            renderLeftActions={
                (progress, dragX, onDetailPress) =>

                    isEdit &&
                    <LeftActionsDetail
                        progress={progress}
                        dragX={dragX}
                        isEdit={isEdit}
                        onEditPress={() => { onEditClick(item, type) }} />
            }>
            <View style={Common.FlatList.listItems}>
                {isImage && <MaterialIcons name="account-circle" color={Color.amber200} size={35} style={{ position: 'absolute', left: 10 }} />}
                <Text>{item.name}</Text>
            </View>
        </Swipable >
    )

}
updateRef = ref => {
    _refList.push(ref)
}
swipeOpen = (thisRef) => {
    _refList.forEach((ref) => {
        if (ref != null && (ref.state.rowState == -1 || ref.state.rowState == 1))//.rowTranslation._value > 0)
            ref.close()
    })
}
const RightActionsDetail = ({ progress, dragX, isDetail, isDelete, onDetailPress, onDeletePress }) => {
    return (
        <View style={styleThis.actionView}>
            {isDetail &&
                <TouchableOpacity style={[styleThis.actionButton, styleThis.amber300]} onPress={onDetailPress}>
                    <Icon name="ios-menu" color={Color.white} size={25} />
                    <Text style={styleThis.txtWhite10}>Details</Text>
                </TouchableOpacity>
            }
            {isDelete &&
                <TouchableOpacity style={[styleThis.actionButton, styleThis.deepOrange300]} onPress={onDeletePress}>
                    <Icon name="ios-trash" color={Color.white} size={25} />
                    <Text style={styleThis.txtWhite10}>Delete</Text>
                </TouchableOpacity>
            }
        </View >
    )
}

const LeftActionsDetail = ({ progress, dragX, isEdit, onEditPress }) => {
    return (
        <View style={styleThis.actionView}>
            {
                isEdit &&
                <TouchableOpacity style={[styleThis.actionButton, styleThis.amber300]} onPress={onEditPress}>
                    <Icon name="ios-create" color={Color.white} size={25} />
                    <Text style={styleThis.txtWhite10}>Edit</Text>
                </TouchableOpacity>
            }
        </View >
    )
}
const flatListItemSeparator = () => <Divider />

const flatListHeader = () => {
    return (
        <View style={Common.FlatList.FlatListHeader}>
            <Text style={Common.txtError}> {this.props.name} List </Text>
        </View>
    )
}

const styleThis = StyleSheet.create({
    listRow: {
        ...Common.flexRow,
        ...Common.alignCenter
    },
    listRowItemText: {
        fontSize: 17,
        width: '40%',
        fontWeight: '400',
        textAlign: 'center',
        flexGrow: 7,
    },
    listRowItemMenu: {
        flexGrow: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionView: {
        display: 'flex',
        flexDirection: 'row'
    },
    actionButton: {
        height: '100%',
        width: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    amber300: {
        backgroundColor: Color.amber300
    },
    deepOrange300: {
        backgroundColor: Color.deepOrange300
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 50,
        ...Common.alignCenter,
        borderColor: Color.amber400,
        borderWidth: 1,
        marginRight: 15,
        backgroundColor: Color.amber100
    },
    txtWhite10: {
        color: Color.white,
        fontSize: 10,
    }
})