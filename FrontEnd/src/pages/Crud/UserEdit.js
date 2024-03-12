import React, { useContext, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import noteContext from "./Context/NoteContext";
import { TextInput, EmailInput, SelectInput, DateInput, PasswordInput, SubmitBtn } from "../../component/Helpers/Inputs"; // Import the DarkBtn component
import "react-toastify/dist/ReactToastify.css";
import "../Crud/label.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const UserEdit = () => {
  const context = useContext(noteContext);
  const { notes, editNote } = context;
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formRef = useRef(null);

  useEffect(() => {
    if (notes && id) {
      const foundUser = notes.find((note) => note._id === id);
      if (foundUser) {
        const values = {};
        Object.entries(foundUser).forEach(([key, value]) => {
          values[key] = value;
        });
        reset(values);
      }
    }
  }, [id, notes, reset]);

  const onSubmit = (data) => {
    editNote(
      id,
      data.firstname,
      data.lastname,
      data.email,
      data.mobileno,
      data.username,
      data.password,
      data.gender,
      data.birthdate
    );
    navigate("/userlist");
  };

  const handleReset = () => {
    reset();
  };

  const handleBack = () => {
    navigate("/userlist");
  };

  return (
    <div>
      <h2>Edit User</h2>
      <br />
      <Container className="d-flex justify-content-center my-5">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <TextInput
                controlId="firstname"
                label="First Name"
                register={register("firstname", { required: true })}
                error={errors.firstname && "First Name is required"}
              />
              <TextInput
                controlId="lastname"
                label="Last Name"
                register={register("lastname", { required: true })}
                error={errors.lastname && "Last Name is required"}
              />
              <EmailInput
                controlId="email"
                label="Email"
                register={register("email", { required: true })}
                error={errors.email && "Email is required"}
              />
            </Col>
            <Col md={6}>
              <TextInput
                controlId="mobileno"
                label="Mobile Number"
                register={register("mobileno", { required: true })}
                error={errors.mobileno && "Mobile Number is required"}
              />
              <TextInput
                controlId="username"
                label="Username"
                register={register("username", { required: true })}
                error={errors.username && "Username is required"}
              />
              <PasswordInput
                controlId="password"
                label="Password"
                register={register("password", { required: true, minLength: 5 })}
                error={errors.password && "Password Must be at least 5 character Long"}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <SelectInput
                controlId="gender"
                label="Gender"
                options={[
                  { value: "", label: "Select Gender" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                register={register("gender", { required: true })}
                error={errors.gender && "Gender is required"}
              />
            </Col>
            <Col md={6}>
              <DateInput
                controlId="birthdate"
                label="Birthdate"
                register={register("birthdate", { required: true })}
                error={errors.birthdate && "Birthdate is required"}
              />
            </Col>
          </Row>
          <SubmitBtn label="Update" className="mx-3 mt-3" onClick={handleSubmit(onSubmit)} />
          <Button className="mx-3 mt-3" variant="dark" type="reset" onClick={handleReset}>
            Reset <FontAwesomeIcon icon={faRotateRight} />
          </Button>
          <Button className="mx-3 mt-3" variant="dark" type="button" onClick={handleBack}>
            Cancel &#10006;
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default UserEdit;
