import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteSuccessModal from "../../component/Modal/deletemodal";

const TodoList = () => {
  useEffect(() => {
    document.title = "TodoList"
  }, [])
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this todo?");
    if (shouldDelete) {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setShowDeleteSuccessModal(true); 
    }
    toast.success("Todo deleted sucessfully")
  };
  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
    toast.success("Todo deleted successfully"); // Show toast notification
  }

  const deleteAll = () => {
    const shouldDeleteAll = window.confirm("Are you sure you want to delete all todos?");
    if (shouldDeleteAll) {
      setTodos([]);
      localStorage.removeItem("todos");
      setShowDeleteSuccessModal(true); 
      // Perform any other necessary actions upon deleting all todos
    }
    toast.success("All Todos deleted sucessfully")
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
            <th><Button className="btnadd" as={NavLink} to="/todoadd" variant="success">
              Add new todo
            </Button></th>
            <th></th>
            <th><Button variant="danger" onClick={deleteAll}>Delete All</Button></th>
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
                <Button variant="danger" className="me-2" onClick={() => handleDelete(todo.id)}>
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
      <DeleteSuccessModal
        show={showDeleteSuccessModal}
        handleClose={handleCloseDeleteSuccessModal}
      />
    </div>
  );
};

export default TodoList;
