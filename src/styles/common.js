import { StyleSheet, Dimensions } from 'react-native'
import { Color } from './color'
const DEVICE_WIDTH = Dimensions.get("window").width

const Common = StyleSheet.create({
    txtError: {
        color: '#900',
        fontSize: 15,
    },
    txtSuccess: {
        color: 'green',
        fontSize: 16,
    },
    txtButtom: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    txtLink: {
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
    },
    alignCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignStart: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    alignSpaceEven: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    iconError: {
        position: 'absolute',
        right: 10,
        top: '30%',
        fontSize: 20,
        color: '#900',
    },
    iconLoader: {
        margin: '3%'
    },
    loaderConatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '3%',
        marginBottom: '3%',
    },
    viewNodata: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
    },

    ///from camera project
    textbox: {
        width: 300,
        height: 50,
        borderWidth: .8,
        borderColor: Color.gray500,
        padding: 20,
        fontSize: 16,
    },
    textInput: {
        width: 300,
        height: 50,
    },
    textArea: {
        width: 300,
        height: 80,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 45
    },

    //paper elements
    divider: {
        width: '80%',
        color: Color.gray900,
    }
})

const Scroll = StyleSheet.create({
    scrollMain: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#00bfa5',
    },
    scrollItems: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 0,

    },
    scrollImage: {
        height: 200,
        width: 200,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: '#00897B',
        shadowOpacity: .5,
    }
})

const FlatList = StyleSheet.create({
    flatList: {
        height: 200
    },
    listItems: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        height: 60,
    },
    listItemsTouchable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    listItemsText: {
        fontSize: 20,
        backgroundColor: 'white'
    },
    separator: {
        height: .5,
        width: "100%",
        backgroundColor: "gray"
    },
    FlatListHeader: {
        height: 100,
        backgroundColor: '#f1ece5',
        alignItems: "center",
        justifyContent: 'center',
    },
})


Common.Scroll = Scroll
Common.FlatList = FlatList

export {
    Common
}
