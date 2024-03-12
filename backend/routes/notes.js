const express = require("express");
const router = express.Router();
// const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote", 
  [
    body("firstname", "Enter a valid firstname").isLength({ min: 2 }),
    body("lastname", "Enter a valid lastname").isLength({ min: 2}),
    body("email", "Enter a valid Email").isEmail(),
    body("mobileno", "Enter a valid Number").exists(),
    body("username", "Enter a valid username").isLength({ min: 2 }),
    body("password", "Enter a valid password").isLength({ min: 4 }),
    body("gender", "Enter a valid gender"),
    body("birthdate", "Enter a valid DOB")
  ],
  async (req, res) => {
    try {
      const { firstname, lastname, email, mobileno,username,password,gender,birthdate } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        firstname,
        lastname,
        email,
        mobileno,
        username,
        password,
        gender,
        birthdate
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.put("/updatenote/:id", async (req, res) => {
  const { firstname, lastname, email, mobileno,username,password,gender,birthdate } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (firstname) {
      newNote.firstname = firstname;
    }
    if (lastname) {
      newNote.lastname = lastname;
    }
    if (email) {
      newNote.email = email;
    }
    if (mobileno) {
      newNote.mobileno = mobileno;
    }
    if (username) {
      newNote.username = username;
    }
    if (password) {
      newNote.password = password;
    }
    if (gender) {
      newNote.gender = gender;
    }
    if (birthdate) {
      newNote.birthdate = birthdate;
    }


    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    // Delete all notes
    await Note.deleteMany({});
    res.json({ success: "All notes have been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
