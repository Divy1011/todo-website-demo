import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCogs,
  faList,
  faUser,
  faListAlt,
  faPhone
} from "@fortawesome/free-solid-svg-icons"; 
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useNavigate();

  const handleTrigger = () => setIsOpen(!isOpen);

  const redirectToHome = () => {

    history("/"); 
  };
  const redirectToabout = () => {
    history("/about");
  };
  const redirectTocontact = () => {
    history("/contactus");
  };
  const redirectToservice = () => {
    history("/services");
  };
  const redirectTotodolist = () => {
    history("/todolist");
  };
  return (
    <div className="App">
      <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="trigger" onClick={handleTrigger}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        <div className="sidebar-position" onClick={redirectToHome}>
          <div>
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span>Home</span>
        </div>
        <div className="sidebar-position" onClick={redirectToabout}>
          <FontAwesomeIcon icon={faCogs} />
          <span>About</span>
        </div>
        <div className="sidebar-position" onClick={redirectTocontact}>
          <FontAwesomeIcon icon={faPhone} />
          <span>ContactUs</span>
        </div>

        <div className="sidebar-position" onClick={redirectToservice}>
          <FontAwesomeIcon icon={faList} />
          <span>Services</span>
        </div>
        <div className="sidebar-position" onClick={redirectTotodolist}>
          <FontAwesomeIcon icon={faListAlt} />
          <span>Todo</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
