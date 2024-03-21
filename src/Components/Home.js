import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'; // Import Redirect
import { AuthContext } from "./Context/auth";
import { MdOutlineExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import Login from './Login';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {user ? (
        <div className="container">
          <h1>Login App</h1>
          <p>Welcome {user.username}!</p>
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


