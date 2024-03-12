const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  mobileno: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("notes", NotesSchema);
