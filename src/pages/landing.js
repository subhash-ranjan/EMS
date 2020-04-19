import React from 'react'
import { View, Image, Dimensions, StyleSheet, LayoutAnimation, Platform, UIManager, Animated, SafeAreaView } from 'react-native';
import { Common, Color } from 'src/styles/main'
import { ImgGooSvg1, logo1 } from 'src/components/images'
import * as firebase from "firebase/app"
import { Text, ActivityIndicator, Button, Caption } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { HEIGHT, WIDTH } = Dimensions.get('window')

export default class landing extends React.Component {
  unsubscribe = null
  constructor(props) {
    super(props)
    this.state = {
      isLoging: false,
      isError: false,
      animation: new Animated.Value(0),
      loggedIn: false
    }
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }
  render() {
    const animatedStyle = {
      transform: [
        {
          translateY: this.state.animation.interpolate({
            inputRange: [0, 500],
            outputRange: [0, 500],
          }),
        }
      ]
    }
    return (
      <SafeAreaView style={styleThis.viewMain}>
        <View style={{ position: 'absolute', top: -90 }}>
          <ImgGooSvg1>
          </ImgGooSvg1>
        </View>
        <View style={[styleThis.vwSlider, { top: -50 }]}>
          <Image source={logo1} style={{ height: 55, width: 90 }}></Image>
        </View>
        <View style={[styleThis.vwContent]}>
          <Animated.View style={[styleThis.loginBox, animatedStyle]}>
            <View style={{ ...styleThis.loginTextBox }}>
              {
                !this.state.isLoging &&
                <Caption style={{ ...styleThis.text }}>LOGIN ANONYMOUSLY WITH FIREBASE</Caption>
              }
              {
                this.state.isLoging &&
                <View style={Common.loaderConatiner}>
                  <ActivityIndicator style={{ color: Color.amber600 }} color={Color.amber600} />
                  <Caption style={{ ...styleThis.text }}>Signing you in...</Caption>
                </View>
              }
              {
                this.state.isError &&
                <View style={{ ...Common.alignCenter, margin: 10 }}>
                  <Caption style={{ ...styleThis.text }}>Error: There seems to be issue with netowk</Caption>
                </View>
              }
            </View>
            <Button
              title="Login"
              mode='contained'
              color={Color.indigo700}
              icon='firebase'
              contentStyle={{ width: 280, height: 41 }}
              onPress={() => this.loginAnonymous()} >
              Login
              {/* <MaterialCommunityIcons name='firebase' style={{ fontSize: 33, color: Color.amber600 }} /> */}
            </Button>
          </Animated.View>
        </View>
      </SafeAreaView >
    )
  }
  componentDidUpdate = () => {
    if (this.state.loggedIn)
      this.props.navigation.navigate("Main")
  }
  componentDidMount() {
    this.animLogbox()
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLoging: false,
          isError: false,
          loggedIn: true
        })
        //var isAnonymous = user.isAnonymous;
      } else {
      }
    })
  }
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }
  animLogbox = () => {
    Animated.timing(this.state.animation, {
      toValue: -370,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }
  loginAnonymous() {

    LayoutAnimation.configureNext(LayoutAnimation.create(
      100,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity
    ))

    this.setState({
      isLoging: true
    })
    firebase.auth().signInAnonymously().catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message
      this.setState({
        isLoging: false,
        isError: true
      })
    })
  }
}
const styleThis = StyleSheet.create({
  viewMain: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: "center",
    justifyContent: 'center',
    resizeMode: 'cover',
    backgroundColor: Color.materialDark
  },
  vwSlider: {
    flexGrow: 1,
    ...Common.alignCenter,
  },
  vwContent: {
    flexGrow: 2,
    width: '100%',
    flexDirection: 'column',
  },
  loginBox: {
    ...Common.alignCenter,
    height: 400,
    width: '100%',
    position: 'absolute',
    left: 0,
    zIndex: 1,
    bottom: -400
  },
  text: {
    fontSize: 13,
    color: Color.amber400
  },
  loginTextBox: {
    height: 120,
    ...Common.flexColumn,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15
  }
})