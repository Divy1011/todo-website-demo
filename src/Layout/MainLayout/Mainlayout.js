import React from "react";
import { Row, Col } from "react-bootstrap";
import TopBar from "../TopBar/Topbar";
import SideMenu from "../Sidebar/Sidebartab";
import "./MainLayout.css";
import Progressbars from "../../component/ProgressBar/Progressbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footerbar/Footer";

const Mainlayout = () => {
  return (
    <div className="main-wrapper">
      <Row className="header">
        <Col span={24}>
          <Progressbars />
          <TopBar />
        </Col>
      </Row>
      <Row className="body">
        <Col className="side">
          <SideMenu />
        </Col>
        <Col className="content">
          <Outlet />
        </Col>
      </Row>
      <Row className="footer">
      <Footer/>
      </Row>
    </div>
  );
};

export default Mainlayout;
