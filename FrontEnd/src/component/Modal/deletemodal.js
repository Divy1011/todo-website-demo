// DeleteConfirmationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  body = ""
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion &#128533;</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body} &#10067;
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel &#10060;
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirm &#10004;
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
