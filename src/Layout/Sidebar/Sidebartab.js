import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faCogs,
  faList,
  faUser,
  faListAlt,
  faPhone,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useNavigate();

  const handleTrigger = () => {
    setIsOpen(!isOpen);
  // Close the news dropdown when sidebar is toggled
  };

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

  const redirectTonews = () => {
    history("/news");
  };

  return (
    <div id="nav" className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div>
        <FontAwesomeIcon
          id="divm"
          icon={isOpen ? faTimes : faBars}
          className="trigger"
          onClick={handleTrigger}
        />
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
      <div className="sidebar-position" onClick={redirectTonews}>
        <FontAwesomeIcon icon={faNewspaper} />
        <span>News</span>
      </div>
    </div>
  );
};

export default SideMenu;
