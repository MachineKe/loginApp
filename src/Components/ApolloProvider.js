import React from 'react'
import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from "@apollo/react-hooks/index"
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import Login from "./Login"

loadDevMessages();
loadErrorMessages();

const ApolloProviderFile = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:5000",
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
  return (
    <div className="ApolloProvider">
      <ApolloProvider client={client}  >
        <Login/>
    </ApolloProvider>
    </div>
  )
}

export default ApolloProviderFile