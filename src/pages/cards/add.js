import React from 'react'
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Image, Platform, Dimensions } from 'react-native'
import { Common, Color } from 'src/styles/main'
import * as yup from 'yup'
import { Formik } from 'formik'
import { TextInput, Button, Text, Subheading } from 'react-native-paper'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import ActionSheet from 'react-native-actionsheet'
import ImagePicker from 'react-native-image-picker'
import { mutate, graphql } from 'react-apollo'
import { ADD_ITEMS, GET_ITEMS } from 'src/pages/cards/queries'
import ProgressBar from 'src/components/progressBar'
import { BASE_URL } from 'src/config'
import CustomIconButton from 'src/components/customIconButton'

const DEVICE_WIDTH = Dimensions.get("window").width
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}
const item_limit = 2

class AddItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imgageError: false,
            isLoading: false,
            loaderText: '',
            isSuccess: false,
            photo: null
        }
    }
    render() {
        return (
            <SafeAreaView style={styleThis.conatiner}>
                <View style={{
                    top: 0,
                    height: 40,
                    width: DEVICE_WIDTH,
                }}>
                    <ProgressBar isLoading={this.state.isLoading} loaderText={this.state.loaderText} isSuccess={this.state.isSuccess} />
                </View>
                <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : ""}>
                    <ScrollView>
                        <Formik
                            initialValues={{ name: '', title: '', description: '' }}
                            onSubmit={(values, { resetForm }) => this.saveUser(values, resetForm)}
                            validationSchema={yup.object().shape({
                                name: yup
                                    .string()
                                    .max(10)
                                //.required()
                                ,
                                title: yup
                                    .string()
                                    .max(10)
                                //.required()
                                ,
                                description: yup
                                    .string()
                                    .matches(/^[a-zA-Z0-9,.!? ]*$/, 'only alphanumeric , . !')
                                    .max(100)
                                //.required()
                            })}>
                            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                                <View style={styleThis.viewBoxForm}>
                                    <View style={{ ...styleThis.viewBox }} >
                                        <Subheading style={{ color: Color.primary }}>Add item</Subheading>
                                    </View>
                                    <View style={styleThis.viewBox}>
                                        <TextInput
                                            value={values.name}
                                            style={Common.textInput}
                                            onChangeText={handleChange('name')}
                                            onBlur={() => setFieldTouched('name')}
                                            label='name'
                                        />
                                        {touched.name && errors.name &&
                                            <Text style={{ fontSize: 12, color: 'red' }}>{errors.name}</Text>
                                        }
                                    </View>
                                    <View style={styleThis.viewBox}>
                                        <TextInput
                                            value={values.title}
                                            style={Common.textInput}
                                            onChangeText={handleChange('title')}
                                            onBlur={() => setFieldTouched('title')}
                                            label='title'
                                        />
                                        {touched.title && errors.title &&
                                            <Text style={{ fontSize: 12, color: 'red' }}>{errors.title}</Text>
                                        }
                                    </View>
                                    <View style={styleThis.viewBox}>
                                        <TextInput
                                            value={values.description}
                                            style={Common.textArea}
                                            onChangeText={handleChange('description')}
                                            onBlur={() => setFieldTouched('description')}
                                            label="description"
                                            multiline={true}
                                            numberOfLines={50}
                                        />
                                        {touched.description && errors.description &&
                                            <Text style={{ fontSize: 12, color: 'red' }}>{errors.description}</Text>
                                        }
                                    </View>
                                    <View style={{ ...styleThis.viewBox, ...Common.flexRow, height: 100 }}>
                                        <CustomIconButton
                                            name='camera-alt'
                                            style={{ fontSize: 50, color: '#3f50b5' }}
                                            onPress={() => this.ActionSheet.show()}
                                        />
                                        {
                                            this.state.photo &&
                                            <Image
                                                style={{ width: 80, height: 100, marginLeft: 20 }}
                                                source={{ uri: 'file://' + this.state.photo.filePath, scale: 1 }} />
                                        }
                                    </View>
                                    <View style={styleThis.viewBox}>
                                        {this.state.imgageError && <Text style={{ color: 'red' }}>Please upload an image</Text>}
                                    </View>
                                    <View style={styleThis.viewBox}>
                                        <Button dark={true}
                                            style={Common.button}
                                            compact={true}
                                            mode="contained"
                                            onPress={handleSubmit}>
                                            Submit
                                    </Button>
                                    </View>
                                </View>
                            )}

                        </Formik>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            title={'Which one do you like ?'}
                            options={['Camera', 'Photo Library', 'Cancel']}
                            cancelButtonIndex={2}
                            destructiveButtonIndex={4}
                            onPress={(index) => { this.toggleActionSheet(index) }}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView >
        )
    }
    toggleActionSheet = (buttonIndex) => {
        switch (buttonIndex) {
            case 0:
                this.loadCamera(true)
                break
            case 1:
                this.openImagePicker('')
                break
            default:
                break
        }
    }
    loadCamera = (option) => {
        this.props.navigation.navigate('ModalCamera', {
            onClose: () => this.closeModal(),
            getCameraImage: (filePath, fileName, uri) => {
                this.pictureTaken(filePath, fileName, uri)
            }
        })
    }
    pictureTaken = async (_filePath, _fileName, _uri) => {
        const photo = { fileName: _fileName, type: null, filePath: _filePath, uri: _uri }
        this.setState({ photo: photo, imgageError: false })
        this.closeModal()
    }
    closeModal = () => {
        this.props.navigation.pop()
    }
    openImagePicker = (name) => {
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const photo = { fileName: response.fileName, type: response.type, filePath: response.path, uri: response.uri }
                this.setState((prevState) => {
                    return {
                        photo: photo,
                        imgageError: false
                    }
                })
            }
        })
    }
    saveUser = async (values, resetForm) => {
        if (!this.state.photo) {
            this.setState({ imgageError: true })
            return false
        }
        this.showLoader(true, 'uploading image', false)
        await this.uploadFile()
        this.showLoader(true, 'upload successful', false)
        this.showLoader(true, 'saving data', false)

        const response = await this.props
            .addGalleryItem({
                userId: '',
                userName: 'ram',//values.name,
                timeStamp: Date.now().toString(),
                date: this.formatDate(new Date(Date.now())),
                url: this.state.photo.fileName,
                title: 'nature',//values.title,
                subHeader: '',
                description: values.description,
            })
            .then((res) => {
                this.showLoader(true, 'saved', true)
            })
            .catch((error) => {
                console.log(error)
                this.showLoader(true, error.message, true)
            })
        this.showLoader(false, '', false)
        resetForm({})
    }
    uploadFile = async () => {
        try {
            let photo = this.state.photo
            const data = new FormData()
            data.append("file", {
                name: photo.fileName,
                type: photo.type === null ? 'image/jpeg' : photo.type,
                uri: Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            })
            fetch(`${BASE_URL}/upload`, {
                method: 'post',
                body: data
            })
                .then(data => data.json())
                .then(json => {
                    //console.log(json)
                })
                .catch(function (error) {
                    console.log(error)
                })

        } catch (err) {
            console.log(err)
        }
    }
    formatDate(date) {
        var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var day = date.getDate();
        var monthIndex = date.getMonth()
        var year = date.getFullYear()
        return day + ' ' + monthNames[monthIndex] + ' ' + year
    }
    showLoader(_isLoading, text, _isSuccess) {
        if (_isLoading) {
            this.setState({ isLoading: _isLoading, loaderText: text, isSuccess: _isSuccess })
        } else {
            setTimeout(() => {
                this.setState({ isLoading: _isLoading, loaderText: text, isSuccess: _isSuccess, photo: null })
            }, 900)
        }
    }
}
export default graphql(ADD_ITEMS, {
    props: ({ mutate }) => ({
        addGalleryItem: (params) => {
            return mutate({
                variables: params,
                refetchQueries: [{
                    query: GET_ITEMS,
                    variables: { title: '', limit: item_limit, cursor: '' },
                }],
                // update: (cache, { data: { addGalleryItem } }) => {
                //     let { galleryItems } = cache.readQuery({ query: GET_ITEMS, })
                //     let modifiedItems = galleryItems.GalleryItems.concat([addGalleryItem])
                //     galleryItems.GalleryItems = modifiedItems
                //     galleryItems.count = galleryItems.count + 1
                //     cache.writeQuery({
                //         query: GET_ITEMS,
                //         data: { galleryItems: galleryItems },
                //     })
                // },
            })
        }
    })
})(AddItem)

const styleThis = StyleSheet.create({
    conatiner: {
        flex: 1,
        ...Common.flexColoumn,
        ...Common.alignStart,
    },
    viewBoxForm: {
        ...Common.flexColoumn,
        //...Common.alignStart,
        width: '100%',
        height: '100%',
        paddingTop: 10,
    },
    viewBox: {
        width: '100%',
        height: 'auto',
        paddingVertical: 8,
        ...Common.alignCenter,
    },
    viewBoxHeader: {
        width: '100%',
        height: 'auto',
        paddingBottom: 5,
        paddingLeft: 30,
        alignItems: 'flex-start',
    },
    viewBoxCamera: {
        ...Common.alignCenter,
    },
    viewBoxImage: {
        width: '100%',
        height: 80,
        paddingVertical: 15,
        ...Common.alignCenter,
    }
})

