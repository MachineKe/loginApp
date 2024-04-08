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
import Catalog from "./Components/Catalog/Catalog";
import Pizza from "./Components/Pizza/Pizza";
import ImageGallery from "./Components/imageClick/ImageClick";
import Nav from "./Components/Nav/Nav";

loadDevMessages();
loadErrorMessages();

function App() {

   const httpLink = createHttpLink({
    uri: 'https://weba-eiev.onrender.com/',
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
<Nav/>
            <Routes>
                            <Route path="/regApp" element={<Home/>} />
                            <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About/>}/>
              <Route path="/catalog" element={<Catalog />} />
                           <Route path="/pizza" element={<Pizza/>}/>
                           <Route path="/" element={<ImageGallery/>}/>

            </Routes>
          </ErrorBoundary>
        </AuthProvider>
    </ApolloProvider>
    </div>
  )
}

export default App;
