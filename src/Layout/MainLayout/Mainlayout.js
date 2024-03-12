import React from "react";

import TopBar from "../TopBar/Topbar";
import SideMenu from "../Sidebar/Sidebartab";
import "./MainLayout.css";
import Progressbars from "../../component/ProgressBar/Progressbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footerbar/Footer";

const Mainlayout = () => {
  return (
    <div className="body">
      <div className="header">
        <div className="bar">
          <Progressbars />
        </div>
        <TopBar />
      </div>
      <div className="main">
      <SideMenu />
      <div className="main-content">
        <Outlet />
      </div>
      
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Mainlayout;
