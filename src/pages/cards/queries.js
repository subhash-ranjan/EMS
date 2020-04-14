import React from 'react'
import gql from 'graphql-tag'

const GET_ITEMS = gql`
query getItems ($title: String!,$limit: Int!,$cursor: String!)
{
  galleryItemsCursor(title:$title,limit:$limit,cursor:$cursor){
      cursor
      hasMore
      GalleryItems{
        _id
        userName
        url
        timeStamp
        date
        title
        description
      }
    }
}`


const ADD_ITEMS = gql`
mutation addGalleryItem($userId: String! $userName: String!, $timeStamp: String!, $date: String!, $url: String!, $title: String!, $subHeader: String!, $description: String!) {
    addGalleryItem(
            userId: $userId,
            userName: $userName,
            timeStamp: $timeStamp,
            date: $date,
            url: $url,
            title: $title,
            subHeader: $subHeader,
            description: $description
            ) {
                _id
                userId
                userName
                url
                timeStamp
                date
                title
                description
  }
}
`

export {
  GET_ITEMS, ADD_ITEMS
}