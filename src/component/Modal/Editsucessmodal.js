import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./CommonModalCss.css"

const EditSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>The todo has been updated successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSuccessModal;
