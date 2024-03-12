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

export default function Layout() {
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
      </Route>
    </Routes>
  );
}
