import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./todo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const history = useNavigate();
  useEffect(() => {
    document.title = "Add Todo"
  }, [])
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(); // Capture reset function
  const [, setMsg] = useState(null); // State for toast message

  const onSubmit = (data) => {
   
    
    // Construct the todo item
    const todoItem = {
      ...data,
      id: Date.now(),
    };
   
    // Save the todo item to localStorage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    localStorage.setItem("todos", JSON.stringify([...storedTodos, todoItem]));

    // Clear the input fields
    reset(); // Call reset function to clear form fields

    // Show toast notification
    setMsg("Todo Added Successfully");
    toast.success("Todo Added Successfully Redirecting... TodoList ");

    // Navigate to the desired page
    setTimeout(() => {
      history("/todolist"); // Redirect to TodoList page
    }, 3000); 
  }
  return (
    <div className="container">
      <h2>
        <strong>Add Todo</strong>
      </h2>
      <ToastContainer position="top-center"/>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formName" className="my-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/, // Regex to allow only letters and spaces
                message: "Name must contain only letters and spaces",
              },
            })}
          />
          <Form.Text className="text-danger h4">
            {errors.name && errors.name.message}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formEmail" className="my-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
          />
          <Form.Text className="text-danger h4">
            {errors.email && errors.email.message}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formTodo" className="my-4">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            {...register("todo", { required: "Todo is required" })}
          />
          <Form.Text className="text-danger h4">
            {errors.todo && errors.todo.message}
          </Form.Text>
        </Form.Group>

        <Button className="btn btn-primary my-4" type="submit">
          Add Todo
        </Button>
      </Form>
    </div>
  );
};

export default Todo;
