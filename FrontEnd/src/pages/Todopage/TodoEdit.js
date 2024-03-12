import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const TodoEdit = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Edit Todo";
  }, []);
  const { id } = useParams(); // Retrieve the id parameter from the URL
 // Access the history object
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTodoById = async () => {
      try {
        // Retrieve todos array from localStorage
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        // Find the todo with the specified ID
        const filteredTodos = todos.filter((todo) => String(todo.id) === id);
        console.log(filteredTodos)
        const todo = filteredTodos[0]; // Since filter returns an array, we take the first element
        if (todo) {
          reset(todo);
        } else {
          console.error("Todo not found with id:", id);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };
    fetchTodoById();
  }, [id, reset, setValue]);


  // handle form submission
  const onSubmit = (data) => {
    const handleUpdate = (editedTodo) => {
      const { id } = editedTodo;
      // Update the todo item in local storage
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedIndex = todos.findIndex((todo) => todo.id === id);
      if (updatedIndex !== -1) {
        todos[updatedIndex] = editedTodo;
        localStorage.setItem("todos", JSON.stringify(todos));
        // Redirect to the TodoList page
        toast.success("Todo Updated successfully!!");
        setTimeout(() => {
          navigate("/todolist")
        }, 800);
      } else {
        console.error("Todo not found in local storage:", id);
      }
    };

    handleUpdate(data);
  };
  

  return (
    <div>
      <h2>
        <strong>Edit Todo</strong>
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="frmname" className="my-4">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/, // Regex to allow only letters and spaces
                message: "Name must contain only letters and spaces",
              },
            })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="formEmail" className="my-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="formTodo" className="my-4">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            name="todo"
            placeholder="Enter Todo"
            {...register("todo", { required: "Todo is required" })}
          />
          {errors.todo && (
            <span className="text-danger">{errors.todo.message}</span>
          )}
        </Form.Group>

        <Button variant="primary my-5" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default TodoEdit;
