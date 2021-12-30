import React, { useEffect, useRef, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Card, CardHeader, Container, Row, Col, Input, Form } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { fetchOne, update, add } from "services/sheetService";
import { defaultSheet } from "shared/constants";
import Dropzone from "dropzone";
Dropzone.autoDiscover = false;

const AddMeditation = () => {
  const history = useHistory();
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const { id } = useParams();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState(defaultSheet.title);
  const [desc, setDesc] = useState(defaultSheet.detail);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    id && fetchSheet();
  }, []);

  const fetchSheet = async () => {
    fetchOne(id)
      .then((data) => {
        setDesc(data.detail);
        setTitle(data.title);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    if (id) {
      update(id, { title, detail: desc })
        .then(() => history.push("/admin/sheets"))
        .catch((err) => console.log(err));
    } else {
      add({ title, detail: desc })
        .then(() => history.push("/admin/sheets"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <SimpleHeader name={id ? "Edit Sheet" : "Add Sheet"} />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-7 col-md-12">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Sheet Detail</h3>
              </CardHeader>
              <hr className="my-0 mx-2" />
              <div>
                <Form>
                  <Row className="px-5 py-3">
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
                  <Row className="px-5 py-3">
                    <Col lg="12">
                      <h4 className="headingColor">Description</h4>
                      {editorLoaded && (
                        <CKEditor
                          editor={ClassicEditor}
                          data={desc}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDesc(data);
                          }}
                        />
                      )}
                    </Col>
                  </Row>
                </Form>
                <Row className="px-5 py-3">
                  <Col>
                    <button onClick={handleSubmit} className="btn addBtn">
                      {id ? "Update" : "Add New"}
                    </button>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddMeditation;
