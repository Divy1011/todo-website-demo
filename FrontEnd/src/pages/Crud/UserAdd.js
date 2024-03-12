import React, { useContext } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import noteContext from "./Context/NoteContext";
import { NavLink, useNavigate } from "react-router-dom";
import "../Crud/label.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TextInput, EmailInput, SelectInput, DateInput, PasswordInput, SubmitBtn } from "../../component/Helpers/Inputs"; // Import the input components

const UserAdd = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addNote(
      data.firstname,
      data.lastname,
      data.email,
      data.mobileno,
      data.username,
      data.password,
      data.gender,
      data.birthdate
    );
    toast.success("User Added successfully!!");
    navigate("/userlist");
  };

  return (
    <>
      <h2>Add User</h2>
      <Container className="d-flex justify-content-center my-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <TextInput
                controlId="firstname"
                label="First Name"
                register={register("firstname", { required: true })}
                error={errors.firstname && "First name is required"}
              />

              <EmailInput
                controlId="email"
                label="Email"
                register={register("email", {
                  required: true,
                  pattern: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                })}
                error={errors.email && "Enter Valid Email"}
              />

              <TextInput
                controlId="username"
                label="Username"
                register={register("username", { required: true })}
                error={errors.username && "Username is required"}
              />

              <SelectInput
                controlId="gender"
                label="Gender"
                options={[
                  { value: "", label: "Select gender" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                register={register("gender", { required: true })}
                error={errors.gender && "Gender is required"}
              />
            </Col>

            <Col md={6}>
              <TextInput
                controlId="lastname"
                label="Last Name"
                register={register("lastname", { required: true })}
                error={errors.lastname && "Last name is required"}
              />

              <TextInput
                controlId="mobileno"
                label="Mobile No"
                register={register("mobileno", {
                  required: true,
                  minLength: 10,
                  maxLength: 12,
                  type: Number,
                })}
                error={errors.mobileno && "Enter Valid Mobile Number"}
              />

              <PasswordInput
                controlId="password"
                label="Password"
                register={register("password", { required: true, minLength: 5 })}
                error={errors.password && "Password Must be at least 5 character Long"}
              />

              <DateInput
                controlId="birthdate"
                label="Birth Date"
                register={register("birthdate", { required: true })}
                error={errors.birthdate && "Birthdate is required"}
              />
            </Col>
          </Row>

          <SubmitBtn type="submit" label="Submit" />
          <NavLink className="btn btn-dark mx-3" type="button" to="/userlist">
            Back &#10140;
          </NavLink>
        </Form>
      </Container>
    </>
  );
};

export default UserAdd;
