import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TodoEdit = ({ onUpdate, location }) => {
  // Provide default values for todo properties
  const initialTodo = location.state ? location.state.todo : { name: "", email: "", task: "" };
  const [name, setName] = useState(initialTodo.name);
  const [email, setEmail] = useState(initialTodo.email);
  const [task, setTask] = useState(initialTodo.task);

  const handleUpdate = () => {
    const updatedTodo = {
      id: initialTodo.id, // Preserve the ID of the todo
      name: name,
      email: email,
      task: task
    };
    onUpdate(updatedTodo); // Pass the updated todo to the parent component
  };

  return (
    <div>
      <h2><strong>Edit Todo</strong></h2>
      <Form>
        <Form.Group controlId="formName" className='my-4'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className='my-4'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formTask" className='my-4'>
          <Form.Label>Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary my-5" onClick={handleUpdate}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default TodoEdit;
