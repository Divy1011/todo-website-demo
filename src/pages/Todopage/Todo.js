import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Todo = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [todo, setTodo] = useState('');

  const handleAdd = () => {
    if (!name || !email || !todo) return;

    // Construct the todo item
    const todoItem = {
      id: Date.now(), // Use a unique identifier for the todo item
      name,
      email,
      todo
    };

    // Save the todo item to localStorage
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    localStorage.setItem('todos', JSON.stringify([...storedTodos, todoItem]));

    // Call the onAdd function with the todo item
    onAdd(todoItem);

    // Clear the input fields
    setName('');
    setEmail('');
    setTodo('');
  };

  return (
    <div>
      <h2><strong>Add Todo</strong></h2>
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

        <Form.Group controlId="formTodo" className='my-4'>
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Form.Group>

        <Button className='btn my-5' variant="danger" onClick={handleAdd} as={NavLink} to="/todolist">
          Add Todo
        </Button>
      </Form>
    </div>
  );
};

export default Todo;
