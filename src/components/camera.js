import React from 'react'
import { View, StyleSheet, Platform, Dimensions, Image, Alert, Linking } from 'react-native'
import { Common, Color } from 'src/styles/main'
import { RNCamera } from 'react-native-camera'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Button, Text, Title, Modal, Portal, Dialog, ActivityIndicator } from 'react-native-paper'
import CustomIconButton from 'src/components/customIconButton'

const DEVICE_WIDTH = Dimensions.get("window").width
const DEVICE_HEIGHT = Dimensions.get("window").height
const RNFS = require('react-native-fs')
const dirHome = Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/myAppName`,
    android: `${RNFS.PicturesDirectoryPath}/myAppName`
})
const dirPicutures = `${dirHome}/Pictures`

class camera extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgPath: '',
            visible: true,
            isLoading: false
        }
    }

    render() {
        return (
            <View style={styleThis.conatiner}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styleThis.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    captureAudio={false}
                >
                    <CustomIconButton
                        name='cancel'
                        style={{ ...styleThis.icons }}
                        size={45}
                        onPress={() => this.props.route.params.onClose()}
                    />
                    {this.state.isLoading && <ActivityIndicator animating={true} color={Color.amber400} style={{ paddingTop: 30 }} />}
                    <View style={styleThis.iconView}>
                        <CustomIconButton
                            name='camera'
                            style={{ ...styleThis.icons }}
                            size={45}
                            onPress={() => this.takePicture()}
                        />
                    </View>

                </RNCamera>
            </View>
        )
    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true }
            this.showLoader(true)
            const data = await this.camera.takePictureAsync(options)

            let directoryPath = `${dirPicutures}/`
            let fileName = `${Date.now()}.jpg`
            const filePath = `${dirPicutures}/${fileName}`
            //const imageMoved = await this.moveAttachment(data.uri, filePath)
            this.showLoader(false)
            this.props.route.params.getCameraImage(data.uri, fileName, data.uri)
        }
    }
    moveAttachment = async (filePath, newFilepath) => {
        return new Promise((resolve, reject) => {
            RNFS.mkdir(dirPicutures)
                .then(() => {
                    RNFS.moveFile(filePath, newFilepath)
                        .then(() => resolve(true))
                        .catch(error => reject(error));
                })
                .catch(err => reject(err));
        })
    }
    showLoader(val) {
        this.setState({ isLoading: val })
    }
}

export default camera

const styleThis = StyleSheet.create({
    conatiner: {
        ...Common.flexColoumn,
        ...Common.alignStart,
        height: '100%',
        width: '100%',
        flexGrow: 1
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        flexGrow: 1
    },
    capture: {
        flex: 0,
        backgroundColor: Color.amber100,
        borderRadius: 5,
        padding: 8,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    iconView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    icons: {
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 45,
    },
})

