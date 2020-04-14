import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider } from 'react-apollo'
import { onError } from "apollo-link-error"
import { BASE_URL } from 'src/config'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
    uri: `${BASE_URL}/graphql`
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
        )
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const AplloClient = new ApolloClient({
    cache,
    link: errorLink.concat(httpLink),
})


export {
    ApolloProvider,
    AplloClient
} 