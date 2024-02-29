import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../component/Modal/deletemodal";
import Pagination from "../../component/Pagination/PagiNation";
import "react-toastify/dist/ReactToastify.css";
import "./TodoList.css";
import { faEraser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
  // Set document title on component mount
  useEffect(() => {
    document.title = "TodoList";
  }, []);

  // State initialization
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(6);

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    } else {
      const dummyData = generateDummyData();
      setTodos(dummyData);
      localStorage.setItem("todos", JSON.stringify(dummyData));
    }
  }, []);

  // Generate dummy data
  const generateDummyData = () => {
    const dummyData = [];
    for (let i = 1; i <= 100; i++) {
      dummyData.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        todo: `Task ${i}`,
      });
    }
    return dummyData;
  };

  // Function to handle todo deletion
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
    setShowDeleteModal(false);
    toast.success("Todo deleted successfully!!");
  };

  // Function to close delete confirmation modal
  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  // Function to show delete confirmation modal
  const handleShowModal = (todo) => {
    setShowDeleteModal(true);
    setTodoToDelete(todo); // Set the todoToDelete state for deletion
  };

  // Function to delete all todos
  const deleteAll = () => {
    setTodos([]);
    localStorage.removeItem("todos");
    setShowDeleteModal(false);
    toast.success("All Todos deleted successfully!!");
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to clear search term
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  //This function is responsible for handling the sorting of todos based on a specified field ( name, email, todo).
  const handleSort = (field) => {
    const newSortOrder = { ...sortOrder };
    newSortOrder[field] = newSortOrder[field] === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  //It uses the filter method on the todos array to check if any of the todo's name, email, or todo text includes the search term (case-insensitive).
  const filteredTodos = todos.filter(
    (todo) =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to sort filtered todos foreach apply to all todos sort func sort the todo in asc or dsc way
  const sortedFilteredTodos = () => {
    let sorted = [...filteredTodos];
    Object.keys(sortOrder).forEach((field) => {
      sorted = sorted.sort((a, b) => {
        if (a[field] < b[field]) {
          return sortOrder[field] === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sortOrder[field] === "asc" ? 1 : -1;
        }
        return 0;
      });
    });
    return sorted;
  };

  // Logic to get current todos based on pagination
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage + 1; // Adjusted index calculation
  const currentTodos = sortedFilteredTodos().slice(
    indexOfFirstTodo - 1, // Adjusted index for array slice
    indexOfLastTodo
  );

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <span className="eraser" onClick={handleClearSearch}>
            <FontAwesomeIcon icon={faEraser} className="icon" />
          </span>
        )}
      </div>

      <div className="">
        <Button
          className="btnadd me-5"
          as={NavLink}
          to="/todoadd"
          variant="success"
        >
          Add Todo
        </Button>
        <Button variant="danger" className="btndltall" onClick={deleteAll}>
          Delete All
        </Button>
      </div>
      <br />
      <Table striped bordered hover>
        <thead className="Heade">
          <tr>
            <th>No.</th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortOrder["name"] && (
                <span>{sortOrder["name"] === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortOrder["email"] && (
                <span>{sortOrder["email"] === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th onClick={() => handleSort("todo")}>
              Todo{" "}
              {sortOrder["todo"] && (
                <span>{sortOrder["todo"] === "asc" ? "▲" : "▼"}</span>
              )}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{indexOfFirstTodo + index}</td>{" "}
              {/* Display adjusted index */}
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
      <div className="Pagen">
        <Pagination
          className="Pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(filteredTodos.length / todosPerPage)}
          paginate={paginate}
        />
      </div>
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        handleConfirm={() => handleDelete(todoToDelete.id)} // Pass the todoToDelete id for deletion
      />
    </div>
  );
};

export default TodoList;
