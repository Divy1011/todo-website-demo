import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TodoList = ({ onDelete }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Retrieve todos from localStorage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const handleDelete = (id) => {

    onDelete(id);
    window.location.reload();
  };

  return (
    <div>
      <Button className="btnadd my-5" as={NavLink} to="/todoadd" variant="success">
        Add Todo
      </Button>
      <br></br>
      <h2 className="m-2">Todo List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Task</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td>{todo.todo}</td>
              <td>
                <Button variant="danger" className="me-2" onClick={() => handleDelete(todo.id)}>
                  Delete
                </Button>
                <Button variant="warning" as={NavLink} to="/todoedit">
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TodoList;
