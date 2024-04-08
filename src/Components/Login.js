import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "./util/Hooks";
import { AuthContext } from "./Context/auth";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      navigate("/regApp");
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

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className="loginContainer">
      <div className="loginChild">
        <h1>LOGIN PAGE</h1>
        <hr />
        <form action="" onSubmit={onSubmit}>
          <div className="inputDiv">
            <label>Username</label>
            <input
              className="loginInput"
              placeholder="Username"
              type="text"
              required
              name="username"
              value={values.username}
              onChange={onChange}
            />
          </div>
          <div className="inputDiv">
            <label>Password</label>
            <input
              className="loginInput"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={values.password}
              onChange={onChange}
            />
                        <button
              className="togglePassVisibility"
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <BiHide className="toggleIcon"/> : <BiShow className="toggleIcon"/>}
              </button>

          </div>
          <div className="buttonDiv">
            <button className="loginButton" type="submit">
              Login
            </button>
          </div>
          <div className="end">
            <p className="confirm">Don't have an account?</p>
            <Link to="/register" className="link">
              Register
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      gender
      phone
      createdAt
      token
      age
    }
  }
`;

export default Login;

