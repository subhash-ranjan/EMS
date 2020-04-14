import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'
import { Common, Color } from 'src/styles/main'
import { BASE_URL } from 'src/config'

const CardItem = (props) => {
    return (
        <View style={styleThis.container}>
            <Card key={props.item._id} style={styleThis.card}>

                {
                    props.isGridView ? <Card.Cover
                        source={{ uri: `${BASE_URL}/uploads/${props.item.url}` }}
                        style={{ height: 160 }}
                    /> : <Card.Cover source={{ uri: `${BASE_URL}/uploads/${props.item.url}` }} />
                }

                <Card.Content>
                    <Title>{props.item.title}</Title>
                    <Paragraph>{props.item.title}</Paragraph>
                </Card.Content>
            </Card>
        </View>

    )
}
export default CardItem
const styleThis = StyleSheet.create({
    container: {
        flex: 1,
        ...Common.alignCenter,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    card: {
        width: '100%'
    },
})

