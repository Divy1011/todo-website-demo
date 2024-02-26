import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./Sidebar.css";
import {
  IconButton,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";


const SideMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <div className="sidebar-toggle">
        <IconButton 
          variant="text" 
          size="md" 
          onClick={openDrawer} 
          className="toggle-button"
        >
          {isDrawerOpen ? (
            <XMarkIcon className="h-4 w-4 stroke-current" />
          ) : (
            <Bars3Icon className="h-5 w-6 stroke-current" />
          )}
        </IconButton>
      </div>
      <div className="menu">
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card  shadow={false} className="card">
          <Nav defaultActiveKey="/" className="nav">
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
              <li className="list-group-item ">
                <Nav.Link as={NavLink} to="/About">
                  products
                </Nav.Link>
              </li>
              <li className="list-group-item ">
                <Nav.Link as={NavLink} to="/About">
                  Branches
                </Nav.Link>
              </li>
              <li className="list-group-item ">
                <Nav.Link as={NavLink} to="/About">
                  Locate US
                </Nav.Link>
              </li>
              <li className="list-group-item ">
                <Nav.Link as={NavLink} to="/contactus">
                  add anything
                </Nav.Link>
              </li>
              <li className="list-group-item ">
                <Nav.Link as={NavLink} to="/contactus">
                 xyz
                </Nav.Link>
              </li>
              <li className="list-group-item ">
                <Nav.Link as={NavLink} to="/contactus">
                  
                </Nav.Link>
              </li>
            </ul>
          </Nav>
        </Card>
      </Drawer>
      </div>
    </>
  );
};

export default SideMenu;
