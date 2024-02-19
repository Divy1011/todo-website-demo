import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";

const SideMenu = () => {
  return (
    <div className="sidemenu">
      <Nav defaultActiveKey="/" className="flex-column">
      <ul className="list-group">
      <li className="list-group-item">
        <Nav.Link as={NavLink} to="/" >
          Home
        </Nav.Link>
        </li>
        <li className="list-group-item ">
        <Nav.Link as={NavLink} to="/About" >
          About
        </Nav.Link>
        </li>
        <li className="list-group-item ">
        <Nav.Link as={NavLink} to="/contactus">
          Contact Us
        </Nav.Link>
        </li>
        <li className="list-group-item ">
        <Nav.Link as={NavLink} to="/services">
          Services
        </Nav.Link>
        </li>
        <li className="list-group-item ">
        <Nav.Link as={NavLink} to="/todolist">
          ToDo
        </Nav.Link>
        </li>
        </ul>
      </Nav>
    </div>
  );
};

export default SideMenu;
