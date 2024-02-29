import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../component/Modal/deletemodal";
import "react-toastify/dist/ReactToastify.css";
import "./TodoList.css";
import { faEraser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
  useEffect(() => {
    document.title = "TodoList";
  }, []);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="div">
      <br />
      <h2 className="m-2">Todo List</h2>
      <div className="custom-search">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbtn" />
        <input
          type="text"
          className="search"
          placeholder="Search by name, email, or todo..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <FontAwesomeIcon icon={faEraser} className="eraser" onClick={handleClearSearch} />
        )}
      </div>

      <div className="">
        <Button
          className="btnadd me-5"
          as={NavLink}
          to="/todoadd"
          variant="success">
          Add Todo
        </Button>
        <Button variant="danger" className="btndltall" onClick={deleteAll}>
          Delete All
        </Button>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Todo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo, index) => (
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
