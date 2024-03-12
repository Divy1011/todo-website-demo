import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Topbar.css";

const TopBar = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <>
      <Navbar bg={darkTheme ? "light" : "dark"} variant={darkTheme ? "light" : "dark"} className="nav">
        <Container>
          <Navbar.Brand href="/home">Navbar</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link onClick={toggleTheme} className="mx-3">
              {darkTheme ? "Dark Theme" : "Light Theme"}
            </Nav.Link>

            <NavDropdown title="Profile" id="dropdown-button-drop-start" className="mx-3">
              <div className="profile">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <NavDropdown.Item className="it1" as={NavLink} to="/">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} className="it2" to="/">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
