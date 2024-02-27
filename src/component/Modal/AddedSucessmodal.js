import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./CommonModalCss.css"

const AddSuccessModal = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/todolist");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Added Successfully.. &#129321;</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your todo has been added successfully!!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleRedirect}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSuccessModal;
