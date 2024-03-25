import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "./Context/auth";
import { MdOutlineExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import Login from './Login';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [pageLoaded, setPageLoaded] = useState(false); 

  useEffect(() => {
    setPageLoaded(true); 
     if (pageLoaded) {
      handleReload(); 
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const handleReload = () => {
    window.location.reload(); 
  };

  return (
    <>
      {user ? (
        <div className="container">
          <h1>UWL Login App</h1>
          <p>Welcome {user.fullname}!</p>
          <h1>Your details in our system are:</h1>
          <p>Sex: {user.gender}</p>
            <p>Age: {user.age}</p>
          <Link to="" className="link" onClick={handleLogout}>
            <div className="logo2">
              <MdOutlineExitToApp />
              <p className="nameLogo">Logout</p>
            </div>
          </Link>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;

