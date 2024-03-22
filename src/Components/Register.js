import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "./util/Hooks";
import { AuthContext } from "./Context/auth";

const Register = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "", 
    // yob: "",    
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  if (loading) {
    return (
      <div>
        <img className="loadingImg" src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" />
                <h1>Loading ...</h1>
      </div>
    );
  }


  function registerUser() {
    addUser();
  }

  return (
    <div className="registerContainer">
      <div className="registerChild">
        <h1>REGISTRATION PAGE</h1>
        <hr />
        <form action="" onSubmit={onSubmit}>
          <div className="inputDiv">
            <label>Username</label>
            <input
              className="registerInput"
              placeholder="Username"
              type="text"
              required
              name="username"
              value={values.username}
              onChange={onChange}
            />
          </div>
          <div className="inputDiv">
            <label>Email</label>
            <input
              className="registerInput"
              placeholder="Email"
              type="email"
              required
              name="email"
              value={values.email}
              onChange={onChange}
            />
          </div>
          <div className="inputDiv">
            <label>Phone</label>
            <input
              className="registerInput"
              placeholder="+254"
              type="text"
              required
              name="phone"
              value={values.phone}
              onChange={onChange}
            />
          </div>
          <div className="inputDiv">
            <label>Password</label>
            <input
              className="registerInput"
              placeholder="Password"
              type="password"
              required
              name="password"
              value={values.password}
              onChange={onChange}
            />
          </div>
          <div className="inputDiv">
            <label>Confirm Password</label>
            <input
              className="registerInput"
              placeholder="Confirm Password"
              type="password"
              required
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
            />
          </div>
          <div className="inputDiv">
            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={values.gender === "Male"}
                  onChange={onChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={values.gender === "Female"}
                  onChange={onChange}
                />
                Female
              </label>
            </div>
          </div>
          {/* Year of Birth Selection */}
          {/* <div className="inputDiv">
            <label>Year of Birth</label>
            <select
              className="registerInput"
              name="yob"
              value={values.yob}
              onChange={onChange}
            >
              <option value="">Select Year</option>
              {Array.from({length: new Date().getFullYear() - 1899}, (_, i) => 1900 + i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div> */}
          <div className="buttonDiv">
            <button className="registerButton" type="submit">
              Register
            </button>
          </div>
          <div className="end">
            <p>Have an account?</p>
            <Link to="/" className="link">
              Login
            </Link>
          </div>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="errorDiv">
            {Object.values(errors).map((value, index) => (
              <ul key={index}>
                <li>{value}</li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $phone: String!
    $password: String!
    $confirmPassword: String!
    $gender: String!   
    # $yob: Int!         
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        phone: $phone
        password: $password
        confirmPassword: $confirmPassword
        gender: $gender   
        # yob: $yob         
      }
    ) {
      id
      email
      phone
      username
      gender
      createdAt
      token
    }
  }
`;

export default Register;
