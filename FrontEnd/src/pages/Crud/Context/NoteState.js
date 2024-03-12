/* eslint-disable no-unused-vars */
import noteContext from "./NoteContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NoteState = ({ children }) => {
  const host = "http://localhost:5000/api/notes"; // Consistent naming

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //ADD User
  const addNote = async (
    firstname,
    lastname,
    email,
    mobileno,
    username,
    password,
    gender,
    birthdate
  ) => {
    try {
      const response = await axios.post(`${host}/addnote`, {
        firstname,
        lastname,
        email,
        mobileno,
        username,
        password,
        gender,
        birthdate,
      });
      setNotes([...notes, response.data]);
    } catch (error) {
      toast.error("Failed to add note!!!", error);
    }
  };

  //Fetch all users from database
  const getNotes = async () => {
    try {
      const response = await axios.get(`${host}/fetchallnotes`);
      setNotes(response.data);
    } catch (error) {
      toast.error("Failed to fetch notes !!!", error);
    }
  };

  //Delete User
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${host}/deletenote/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note Deleted Successfully!")
    } catch (error) {
      toast.error("Failed to delete note!!!", error);
    }
  };

  //Edit User
  const editNote = async (
    id,
    firstname,
    lastname,
    email,
    mobileno,
    username,
    password,
    gender,
    birthdate
  ) => {
    try {
      const response = await axios.put(`${host}/updatenote/${id}`, {
        firstname,
        lastname,
        email,
        mobileno,
        username,
        password,
        gender,
        birthdate,
      });
      setNotes(
        notes.map((note) =>
          note._id === id
            ? {
                ...note,
                firstname,
                lastname,
                email,
                mobileno,
                username,
                password,
                gender,
                birthdate,
              }
            : note
        )
      );
      toast.success("User Updated successfully!!");
    } catch (error) {
      toast.error("Failed to update note", error);
    }
  };

  //Delete All Users
  const deleteallNote = async () => {
    try {
      await axios.delete(`${host}/deleteall`);
      setNotes([]);
      toast.success("All notes deleted successfully");
    } catch (error) {
      toast.error("Failed to delete all notes", error);
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, getNotes, deleteNote, editNote, deleteallNote }}
    >
      {children}
    </noteContext.Provider>
  );
};

export default NoteState;
