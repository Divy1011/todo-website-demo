import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Text input component
const TextInput = ({ controlId, label, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Label>{label}</Form.Label>
    <Form.Control type="text" {...register} />
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

// Email input component
const EmailInput = ({ controlId, label, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Label>{label}</Form.Label>
    <Form.Control type="email" {...register} />
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

// Select input component
const SelectInput = ({ controlId, label, options, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Label>{label}</Form.Label>
    <Form.Select {...register}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

// Date input component
const DateInput = ({ controlId, label, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Label>{label}</Form.Label>
    <Form.Control type="date" {...register} />
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

//Password Input
const PasswordInput = ({ controlId, label, register, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Form.Group controlId={controlId} className="mb-4">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control type={showPassword ? "text" : "password"} {...register} />
        <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
          {showPassword ? (
            <FontAwesomeIcon icon={faEyeSlash} />
          ) : (
            <FontAwesomeIcon icon={faEye} />
          )}
        </Button>
      </InputGroup>
      {error && <span className="text-danger">{error}</span>}
    </Form.Group>
  );
};

//Dropdown input
const DropdownInput = ({ controlId, label, options, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Label>{label}</Form.Label>
    <Form.Select {...register}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

// Checkbox input component
const CheckboxInput = ({ controlId, label, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Check type="checkbox" label={label} {...register} />
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

// Radio input component
const RadioInput = ({ controlId, label, register, error }) => (
  <Form.Group controlId={controlId} className="mb-4">
    <Form.Check type="radio" label={label} {...register} />
    {error && <span className="text-danger">{error}</span>}
  </Form.Group>
);

const SubmitBtn = ({ label = "", onClick, className = "" }) => {
  return (
    <Button
      variant="primary"
      type="submit"
      onClick={onClick}
      className={className}>
      {label}
    </Button>
  );
};

export {
  TextInput,
  EmailInput,
  SelectInput,
  DateInput,
  PasswordInput,
  DropdownInput,
  CheckboxInput,
  RadioInput,
  SubmitBtn,
};
