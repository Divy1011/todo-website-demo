import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../../component/Modal/deletemodal";
import Pagination from "../../component/Helpers/PagiNation";
import "react-toastify/dist/ReactToastify.css";
import "./TodoList.css";
import { faEraser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TodoList = () => {
  // Set document title on component mount and get todos
  useEffect(() => {
    document.title = "TodoList";
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // State initialization
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(6);

  // Function to add dummy data
  const addDummyData = () => {
    const cnfw = window.confirm(
      "Are you sure you want to add 100 dummy todos ?"
    );
    if (cnfw) {
      const dummyData = generateDummyData();
      setTodos(dummyData);
      localStorage.setItem("todos", JSON.stringify(dummyData));
    }
    toast.success("Dummy data added Successful!!");
  };

  // Generate dummy data
  const generateDummyData = () => {
    const dummyData = [];
    for (let i = 1; i <= 100; i++) {
      dummyData.push({
        id: i,
        name: `User ${i}`,
        email: `name${i}@gmail.com`,
        todo: `Task ${i}`,
      });
    }
    return dummyData;
  };

  // Function to handle todo deletion
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
    const cnf = window.confirm("Are you sure you want to delete All Todos");
    if (cnf) {
      setTodos([]);
      localStorage.removeItem("todos");
      setShowDeleteModal(false);
      toast.success("All Todos deleted successfully!!");
    }
  };

  // This function takes input of search field and updates searchTerm state
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Function to clear search term
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Function to handle sorting
  const handleSort = (field) => {
    setSortOrder((prevSortOrder) => ({
      ...prevSortOrder,
      [field]: prevSortOrder[field] === "asc" ? "desc" : "asc",
    }));
  };

  // This function Sort the field by sortorder from handlesort func and returns filtered todos
  const sortedFilteredTodos = () => {
    let sorted = [...todos];

    // Sort based on the primary field
    const primaryField = Object.keys(sortOrder)[0];
    sorted = sorted.sort((a, b) => {
      if (a[primaryField] !== b[primaryField]) {
        return sortOrder[primaryField] === "asc" ? -1 : 1;
      }
      return 0;
    });

    // Apply secondary sorting
    const secondaryField = Object.keys(sortOrder)[1];
    if (secondaryField) {
      sorted = sorted.sort((a, b) => {
        if (a[secondaryField] !== b[secondaryField]) {
          return sortOrder[secondaryField] === "asc" ? -1 : 1;
        }
        return 0;
      });
    }

    // Apply tertiary sorting
    const thirdField = Object.keys(sortOrder)[2];
    if (thirdField) {
      sorted = sorted.sort((a, b) => {
        if (a[thirdField] !== b[thirdField]) {
          return sortOrder[thirdField] === "asc" ? -1 : 1;
        }
        return 0;
      });
    }

    return sorted.filter(
      (todo) =>
        todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Function to handle pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current todos based on pagination and search term
  const filteredTodos = sortedFilteredTodos();
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = (currentPage - 1) * todosPerPage + 1; // Corrected index calculation
  const currentTodos = filteredTodos.slice(indexOfFirstTodo - 1, indexOfLastTodo);

  return (
    <div className="div">
      <br />
      <h2 className="m-2 mt-3">Todo List</h2>
      {todos.length === 0 ? (
        <div className="empty-todos-message">
          <div className="btns">
            <Button
              className="btnadd1 me-5 mb-3"
              variant="info"
              onClick={addDummyData}
            >
              Add Dummy Data
            </Button>
            <Button
              className="btnadd me-5 mb-3"
              as={NavLink}
              to="/todoadd"
              variant="success"
            >
              Add Todo
            </Button>
          </div>
          <p className="empt">Todos are empty!!</p>
          <p className="empt1">
            Please Add a todo or Dummy data to view list
          </p>
        </div>
      ) : (
        <>
          {filteredTodos.length === 0 ? (
            <>
              <div className="custom-search">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="searchbtn"
                />
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

              <div className="empty-todos-message">
                <p className="empt">No todos found !!</p>
              </div>
            </>
          ) : (
            <>
              <div className="custom-search">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="searchbtn"
                />
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
                <Button
                  variant="danger"
                  className="btndltall"
                  onClick={deleteAll}
                >
                  Delete All
                </Button>
              </div>
              <br />
              <Table striped bordered hover>
                <thead className="Heade">
                  <tr>
                    <th>No.</th>
                    <th onClick={() => handleSort("name")}>
                      Name
                      {sortOrder["name"] && (
                        <span>{sortOrder["name"] === "asc" ? "▲" : "▼"}</span>
                      )}
                    </th>
                    <th onClick={() => handleSort("email")}>
                      Email
                      {sortOrder["email"] && (
                        <span>{sortOrder["email"] === "asc" ? "▲" : "▼"}</span>
                      )}
                    </th>
                    <th onClick={() => handleSort("todo")}>
                      Todo
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
                      <td>{indexOfFirstTodo + index}</td> {/* Fixed numbering */}
                      <td>{todo.name}</td>
                      <td>{todo.email}</td>
                      <td>{todo.todo}</td>
                      <td>
                        <Button
                          variant="danger"
                          className="me-2"
                          onClick={() => handleShowModal(todo)}
                        >
                          Delete
                        </Button>
                        <Link
                          to={`/todoedit/${todo.id}`}
                          state={{ todo: todo }}
                        >
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
            </>
          )}
        </>
      )}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCloseModal}
        handleConfirm={() => handleDelete(todoToDelete.id)}
        body="Are you sure want to Delete this todo"
      />
    </div>
  );
};

export default TodoList;
