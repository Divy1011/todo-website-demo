import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>The todo has been deleted successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSuccessModal;
