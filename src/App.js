import React, { useContext } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks/index";
import { setContext } from "apollo-link-context";
import { AuthProvider } from "./Components/Context/auth";
import ErrorBoundary from "./Components/ErrorBoundary";
import Home from "./Components/Home";
import { Routes, Route, redirect as Redirect } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";

import About from "./Components/About";

loadDevMessages();
loadErrorMessages();

function App() {

   const httpLink = createHttpLink({
    uri: 'https://reactjsauth.onrender.com/',
        //  uri: 'http://localhost:5000/',
   });
  
  const authLink = setContext(()=>{
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

  
  
    const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });


  return (
    <div className="App">
      <ApolloProvider client={client}>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About/>}/>

            </Routes>
          </ErrorBoundary>
        </AuthProvider>
    </ApolloProvider>
    </div>
  )
}

export default App;
