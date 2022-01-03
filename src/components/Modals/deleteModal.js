import { Button, Col, Modal, Row } from "reactstrap";
import React, { useEffect, useState } from "react";

const deleteModal = ({ open, handleClose }) => {
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={handleClose}
      >
        <div className="modal-header">
          <h5 className="modal-title">Delete</h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={handleClose}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Row className="px-3 pb-4">
            <Col lg="12"></Col>
          </Row>
        </div>
        <div className="modal-footer d-flex justify-content-end align-items-center">
          <Button color="primary" type="button">
            Delete
          </Button>
          <Button onClick={handleClose} type="button">
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default deleteModal;
