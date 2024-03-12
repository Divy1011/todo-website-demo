/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import noteContext from "./Context/NoteContext";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./UserList.css";
import Pagination from "../../component/Helpers/PagiNation";
import TableComponent from "../../component/Helpers/SortableTable"; // Import the corrected table component
import DeleteConfirmationModal from "../../component/Modal/deletemodal";

const UserList = () => {
  const navigate = useNavigate();
  // Fetching the context and necessary functions
  const context = useContext(noteContext);
  const { notes, getNotes, deleteNote, deleteallNote, addNote } = context;

  // State variables for managing modal, delete, search, sort, and pagination
  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6); // Number of notes per page

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Effect hook to fetch notes when component mounts
  useEffect(() => {
    getNotes();
  }, []);

  // Function to handle delete operation
  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteUserId(id); // Set the id of the user to be deleted
  };
  // Function to close the delete confirmation modal

  // Function to handle confirming delete operation
  const handleConfirmDelete = async () => {
    if (deleteUserId) {
      await deleteNote(deleteUserId); // Delete the note only when confirmed
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  // Function to handle confirming delete all operation
  const handleConfirmDeleteAll = async () => {
    const cnf = window.confirm("Are You sure you want to Delete ALL Users");
    if (cnf) {
      try {
        await deleteallNote(); // Call the deleteallNote function
      } catch (error) {
        console.error("Error deleting all users:", error.message); // Log error if deletion fails
      }
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchActive(true); // Set search field as active when user types
    setCurrentPage(1); // Reset pagination to the first page when searching
  };

  // Function to handle clearing search query
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchActive(false); // Set search field as inactive when user clears search query
    setCurrentPage(1); // Reset pagination to the first page when clearing search
  };

  // Function to handle sorting columns
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Function to add dummy data
  const addDummyData = async () => {
    const cnfdummy = window.confirm(
      "Are You sure you want to add 100 Dummy Data? "
    );
    if (cnfdummy) {
      try {
        for (let i = 0; i < 100; i++) {
          const dummyData = {
            firstname: `John${i}`,
            lastname: `Doe${i}`,
            email: `john.doe${i}@example.com`,
            mobileno: `${i}${i}${i}${i}`,
            username: `johndoe${i}`,
            password: `password${i}`,
            gender: "male",
            birthdate: `1990-01-${i}`,
          };
          await addNote(
            dummyData.firstname,
            dummyData.lastname,
            dummyData.email,
            dummyData.mobileno,
            dummyData.username,
            dummyData.password,
            dummyData.gender,
            dummyData.birthdate
          );
        }
        toast.warning("100 Dummy data added !!"); // Display success message after adding dummy data
        window.location.reload(); // Reload the page
      } catch (error) {
        console.error("Error adding dummy data:", error.message);
        toast.error("Failed to add dummy data");
      }
    }
  };

  // Filter notes based on searchQuery
  let filteredNotes = notes;
  if (searchActive) {
    filteredNotes = notes.filter((note) => {
      const {
        firstname,
        lastname,
        email,
        mobileno,
        username,
        password,
        gender,
        birthdate,
      } = note;
      const searchTerms = searchQuery.toLowerCase().trim();
      return (
        firstname.toLowerCase().includes(searchTerms) ||
        lastname.toLowerCase().includes(searchTerms) ||
        email.toLowerCase().includes(searchTerms) ||
        mobileno.includes(searchTerms) ||
        username.toLowerCase().includes(searchTerms) ||
        password.toLowerCase().includes(searchTerms) ||
        gender.toLowerCase().includes(searchTerms) ||
        birthdate.toLowerCase().includes(searchTerms)
      );
    });
  }

  // Sort filteredNotes based on sortBy and sortOrder
  let sortedNotes = [...filteredNotes];
  if (sortBy) {
    sortedNotes.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];
      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  // Calculate pagination indexes based on filtered and sorted notes
  const indexOfLastNote = Math.min(currentPage * notesPerPage, sortedNotes.length);
  const indexOfFirstNote = (currentPage - 1) * notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Define table columns
  const columns = [
    { title: "Name", field: "firstname" },
    { title: "Email", field: "email" },
    { title: "Mobile No", field: "mobileno" },
    { title: "Username", field: "username" },
    { title: "Password", field: "password" },
    { title: "Gender", field: "gender" },
    { title: "Birthdate", field: "birthdate" },
  ];

  const handleEdit = (id) => {
    if (id) {
      navigate(`/useredit/${id}`);
    } else {
      toast.error("Failed to Get ID");
    }
  };

  return (
    <div>
      <div className="searchbar">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbtn" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="eraser" onClick={handleClearSearch}>
          <FontAwesomeIcon icon={faEraser} className="icon" />
        </span>
      </div>

      {notes.length === 0 || filteredNotes.length === 0 ? (
        <>
          <Button
            className="mb-4 mx-5"
            variant="success"
            as={NavLink}
            to="/useradd">
            Add User+
          </Button>
          <Button className=" mb-4" variant="dark" onClick={addDummyData}>
            Add 100 Dummy Data
          </Button>
          <p className="p2">Empty&#8252; &#128565;</p>
        </>
      ) : (
        <>
          <Button className="mb-4" variant="success" as={NavLink} to="/useradd">
            Add User+
          </Button>
          <Button
            className="mx-2 mb-4"
            variant="danger"
            onClick={handleConfirmDeleteAll}>
            Delete All
          </Button>
          <TableComponent
            columns={columns}
            data={currentNotes}
            handleDelete={handleDelete}
            handleSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleEdit={handleEdit}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedNotes.length / notesPerPage)}
            paginate={paginate}
          />
          <DeleteConfirmationModal
            show={showModal}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmDelete}
            body="Are you sure you want to delete this note"
          />
        </>
      )}
    </div>
  );
};

export default UserList;




