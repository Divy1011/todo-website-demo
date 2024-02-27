// TodoList.js
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../component/Modal/deletemodal";
import "react-toastify/dist/ReactToastify.css";

const TodoList = () => {
  useEffect(() => {
    document.title = "TodoList";
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
    setShowDeleteModal(false);
    toast.success("Todo deleted successfully!!");
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowModal = (todo) => {
    setShowDeleteModal(true);
    setTodoToDelete(todo); // Set the todoToDelete state for deletion
  };

  const deleteAll = () => {
    setTodos([]);
    localStorage.removeItem("todos");
    setShowDeleteModal(false);
    toast.success("All Todos deleted successfully!!");
  };

  return (
    <div className="div">
      <br />
      <h2 className="m-2">Todo List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Button
                className="btnadd"
                as={NavLink}
                to="/todoadd"
                variant="success">
                Add Todo
              </Button>
            </th>
            <th>
              <Button variant="danger" onClick={deleteAll}>
                Delete All
              </Button>
            </th>
          </tr>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Todo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td>{todo.todo}</td>
              <td>
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => handleShowModal(todo)} // Pass the todo object
                >
                  Delete
                </Button>
                <Link to={`/todoedit/${todo.id}`} state={{ todo: todo }}>
                  <Button variant="warning">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        handleConfirm={() => handleDelete(todoToDelete.id)} // Pass the todoToDelete id for deletion
      />
    </div>
  );
};

export default TodoList;
