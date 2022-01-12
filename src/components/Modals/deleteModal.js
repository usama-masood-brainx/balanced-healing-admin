import { Button, Col, Modal, Row } from "reactstrap";
import React, { useEffect, useState } from "react";

const DeleteModal = ({ open, handleClose, handleDelete, message, title }) => {
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={open}
        toggle={handleClose}
      >
        <div className="modal-header">
          <h5 className="modal-title">{title}</h5>
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
          <Row>
            <Col lg="12">
              <div
                className="text-center"
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              ></div>
            </Col>
          </Row>
        </div>
        <div className="modal-footer d-flex justify-content-end align-items-center">
          <Button onClick={handleClose} type="button">
            No
          </Button>
          <Button onClick={handleDelete} color="danger" type="button">
            Yes
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
