import { Button, Col, Form, Input, Modal, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import { defaultSheet } from "shared/constants";
import { fetchAll } from "services/sheetService";
import { add, update } from "services/moodService";

const AddMood = ({ moodModal, handleModalClose, moodObj }) => {
  const [title, setTitle] = useState(defaultSheet.title);
  const [sheets, setSheets] = useState([]);
  const [sheet, setSheet] = useState(null);
  const [iseditingVariableSet, editingVariableSet] = useState(false);

  if ((!title || !sheet) && moodObj !== undefined && !iseditingVariableSet) {
    setTitle(moodObj.title);
    setSheet(moodObj.sheet?._id);
    editingVariableSet(true);
  }

  useEffect(() => {
    fetchSheets({ skip: 0, take: 20 });
  }, []);

  const fetchSheets = async (body) => {
    fetchAll(body)
      .then((data) => {
        setSheets(data.sheets);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    if (moodObj !== undefined) {
      update(moodObj._id, { title, sheet })
        .then(() => handleClose())
        .catch((err) => console.log(err));
    } else {
      add({ title, sheetId: sheet })
        .then(() => handleClose())
        .catch((err) => console.log(err));
    }
  };

  const handleClose = () => {
    setTitle("");
    setSheet("");
    editingVariableSet(false);
    handleModalClose();
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={moodModal}
        toggle={handleClose}
      >
        <div className="modal-header">
          <h5 className="modal-title">{moodObj ? "Edit Mood" : "Add Mood"}</h5>
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
          <Form>
            <Row className="px-3 pb-4">
              <Col lg="12">
                <h4 className="headingColor">Title</h4>
                <Input
                  placeholder="Add Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="px-3">
              <Col lg="12">
                <h4 className="headingColor">Sheet</h4>
                <Input onChange={(e) => setSheet(e.target.value)} type="select">
                  {(!moodObj || (moodObj && !moodObj.sheet)) && (
                    <option value disabled selected>
                      Select Sheet
                    </option>
                  )}
                  {sheets.map((_sheet, index) => (
                    <option
                      value={_sheet._id}
                      key={index}
                      selected={sheet === _sheet._id}
                    >
                      {_sheet.title}
                    </option>
                  ))}
                </Input>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="modal-footer d-flex justify-content-center align-items-center">
          <Button onClick={handleSubmit} color="primary" type="button">
            {moodObj ? "Update" : "Add New"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddMood;
