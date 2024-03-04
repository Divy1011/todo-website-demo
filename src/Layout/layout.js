import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "../../src/pages/Todopage/Todo";
import About from "../../src/pages/Aboutpages/About";
import ContactUs from "../../src/pages/Contactpage.js/ContactUs";
import Service from "../../src/pages/ServicesPages/Service";
import TodoList from "../pages/Todopage/TodoList";
import HomePage from "../pages/Homepages/HomePage";
import TodoEdit from "../pages/Todopage/TodoEdit";
import Mainlayout from "./MainLayout/Mainlayout";
import News from "../pages/News/News";

const Layout = () => {
  const apikey = "01fc976ebd2d4448aef270ddbf022dd6";
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/services" element={<Service />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/todoadd" element={<Todo />} />
        <Route path="/todoedit/:id" element={<TodoEdit />} />
        <Route path="/news" element={<News apikey={apikey} />} />
        <Route
          exact
          path="/news/business"
          element={<News apikey={apikey} key="business" category="business" />}
        />
        <Route
          exact
          path="/news/general"
          element={<News apikey={apikey} key="general" category="general" />}
        />
        <Route
          exact
          path="/news/entertainment"
          element={
            <News
              apikey={apikey}
              key="entertainment"
              category="entertainment"
            />
          }
        />
        <Route
          exact
          path="/news/health"
          element={<News apikey={apikey} key="health" category="health" />}
        />
        <Route
          exact
          path="/news/science"
          element={<News apikey={apikey} key="science" category="science" />}
        />
        <Route
          exact
          path="/news/sports"
          element={<News apikey={apikey} key="sports" category="sports" />}
        />
        <Route
          exact
          path="/news/technology"
          element={
            <News apikey={apikey} key="technology" category="technology" />
          }
        />
      </Route>
    </Routes>
  );
};

export default Layout;
