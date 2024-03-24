import React from 'react';
import { CiHome } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { TbHexagonNumber1, TbHexagonNumber2, TbHexagonNumber3, TbHexagonNumber4 } from "react-icons/tb";
import './Nav.css'; // Import CSS file for styling

const Nav = () => {
  return (
    <nav className="navbar">
      {/* <Link to="/" className="nav-item"><CiHome /></Link> */}
      <Link to="/login" className="nav-item"><TbHexagonNumber1 /></Link>
      <Link to="/image" className="nav-item"><TbHexagonNumber2 /></Link>
      <Link to="/pizza" className="nav-item"><TbHexagonNumber3 /></Link>
      <Link to="/catalog" className="nav-item"><TbHexagonNumber4 /></Link>
    </nav>
  );
}

export default Nav;
