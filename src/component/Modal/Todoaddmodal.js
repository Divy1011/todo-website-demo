import React from "react";
import { Modal, Button } from "react-bootstrap";

const TodoAddedModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Added Successfully</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your todo has been added successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TodoAddedModal;
