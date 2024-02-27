import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteSuccessModal from "../../component/Modal/deletemodal"; // Import the delete success modal component

const TodoList = () => {
  useEffect(() => {
    document.title = "TodoList"
  }, [])
  
  const [todos, setTodos] = React.useState([]);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State for showing/hiding modal

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
      setShowDeleteSuccessModal(true); // Show delete success modal
    }
  };

  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
    toast.success("Todo deleted successfully"); // Show toast notification
  };

  const deleteAll = () => {
    const shouldDeleteAll = window.confirm("Are you sure you want to delete all todos?");
    if (shouldDeleteAll) {
      setTodos([]);
      localStorage.removeItem("todos");
      toast.success("Todos deleted successfully");
      
      // Perform any other necessary actions upon deleting all todos
    }
  };

  return (
    <div className="div">
      <br />
      <h2 className="m-2">Todo List</h2>
      <Table striped bordered hover>
        {/* Table Headers */}
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              {/* Table Cells */}
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
      {/* Delete Success Modal */}
      <DeleteSuccessModal
        show={showDeleteSuccessModal}
        handleClose={handleCloseDeleteSuccessModal}
      />
    </div>
  );
};

export default TodoList;
