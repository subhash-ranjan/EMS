import React, { Fragment } from "react"
import { FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { useQuery } from "@apollo/react-hooks"
import { GET_ITEMS } from 'src/pages/cards/queries'
import CardItem from 'src/components/cards'
const item_limit = 2
const ItemList = (props) => {
    const { data, loading, error, fetchMore } = useQuery(GET_ITEMS, {
        variables: { title: '', limit: item_limit, cursor: '' },
    })
    if (loading) return <Text>loading..</Text>
    if (error) return <Text>ERROR</Text>
    if (!data) return <Text>Not found</Text>

    const { cursor, hasMore, GalleryItems } = data.galleryItemsCursor
    return (
        <Fragment>
            {
                (GalleryItems.length === 0) &&
                <Text style={{ marginTop: 50 }}> Not items</Text>
            }
            {
                (GalleryItems.length >= 0) &&
                <Fragment>
                    <FlatList
                        keyExtractor={(item) => item._id}
                        key={props.isGridView ? 1 : 0}
                        numColumns={props.isGridView ? 2 : 1}
                        data={GalleryItems}
                        style={{ width: '100%' }}
                        renderItem={({ item, index, separators }) => (
                            <CardItem
                                key={props.isGridView ? index : item._id}
                                item={item}
                                isGridView={props.isGridView}
                            />
                        )}
                    />
                    {
                        hasMore &&
                        <Button
                            mode='text'
                            onPress={() => {
                                fetchMore({
                                    query: GET_ITEMS,
                                    variables: { title: '', limit: item_limit, cursor: cursor },///props.serachText
                                    updateQuery: (previousResult, { fetchMoreResult }) => {
                                        if (!fetchMoreResult) return previousResult
                                        return {
                                            ...fetchMoreResult,
                                            galleryItemsCursor: {
                                                ...fetchMoreResult.galleryItemsCursor,
                                                GalleryItems: [
                                                    ...previousResult.galleryItemsCursor.GalleryItems,
                                                    ...fetchMoreResult.galleryItemsCursor.GalleryItems,
                                                ],
                                            },
                                        }
                                    }
                                })
                            }}
                        >Load more</Button>
                    }
                </Fragment >

            }
        </Fragment >
    )
}
export default ItemList