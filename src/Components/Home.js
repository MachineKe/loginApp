import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'; // Import Redirect
import { AuthContext } from "./Context/auth";
import { MdOutlineExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import Login from './Login';
import { TfiReload } from "react-icons/tfi";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [age, setAge] = useState(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAge = async () => {
      if (user) {
        await new Promise(resolve => setTimeout(resolve, 0)); // Delay for 4 seconds
        setAge(user.age);
        setLoadingUserDetails(false); // Mark loading as false once age is set
      }
    }

    fetchAge();
  }, [user]); // Remove 'age' as dependency

  const handleLogout = () => {
    logout();
  };

  const handleReload = () => {
    window.location.reload(); // Reload the window
  };

  return (
    <>
      {user ? (
        <div className="container">
          <h1>UWL Login App</h1>
          <button onClick={handleReload}><TfiReload /></button> {/* Handle reload on button click */}
          <p>Welcome {user.fullname}!</p>
          <h1>Your details in our system are:</h1>
          <p>Sex: {user.gender}</p>
          {loadingUserDetails ? ( // Check loading state
            <p>Age: Loading...</p>
          ) : (
            <p>Age: {age}</p>
          )}
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

