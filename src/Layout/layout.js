import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "../../src/pages/Todopage/Todo";
import About from "../../src/pages/Aboutpages/About";
import ContactUs from "../../src/pages/Contactpage.js/ContactUs";
import Service from "../../src/pages/ServicesPages/Service";
import TodoList from "../pages/Todopage/TodoList";
import HomePage from "../pages/Homepages/HomePage";
import TodoEdit from "../pages/Todopage/TodoEdit";
import Mainlayout from "./MainLayout/Mainlayout";
import { Suspense } from "react";


export default function Layout() {
  const todo = localStorage.getItem('todos')
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleUpdate = (updatedTodo) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/services" element={<Service />} />
        <Route
          path="/todolist"
          element={
            <Suspense>
              <TodoList todos={todos} onDelete={handleDelete} />
            </Suspense>
          }
        />
        <Route
          path="/todoadd"
          element={
            <Suspense>
              <Todo onAdd={handleAddTodo} />
            </Suspense>
          }
        />
        <Route
          path="/todoedit"
          element={
            <Suspense>
              <TodoEdit onUpdate={handleUpdate}  location={{ state: { todo } }} />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
