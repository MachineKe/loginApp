import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'; // Import Redirect
import { AuthContext } from "./Context/auth";
import { MdOutlineExitToApp } from "react-icons/md";
import { Link } from "react-router-dom";
import Login from './Login';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const [age, setAge] = useState(null);

  useEffect(() => {
    const fetchAge = async () => {
      if (user) {
        // Simulate fetching age from an asynchronous source (e.g., API)
        await new Promise(resolve => setTimeout(resolve, 4000)); // Delay for 4 seconds

          setAge(user.age);
        }
      }
  

    fetchAge();
  }, [user, age]); // Include 'age' as dependency

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {user ? (
        <div className="container">
          <h1>UWL Login App</h1>
          <p>Welcome {user.fullname}!</p>
          <h1>Your details in our system are:</h1>
          <p>Sex: {user.gender}</p>
          {age ? (
            <p>Age: {age}</p>
          ) : (
            <p>Age: Loading...</p>
          )}          <Link to="" className="link" onClick={handleLogout}>
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




