import React, { useEffect, useRef, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Card, CardHeader, Container, Row, Col, Input, Form } from "reactstrap";
import { useParams } from "react-router-dom";
import { fetchOne } from "services/meditationService";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as moment from "moment";
import { customIcons, defaultMeditation } from "shared/constants";
import ReactDatetime from "react-datetime";

const AddMeditation = () => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const { id } = useParams();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [meditation, setMeditation] = useState(defaultMeditation);
  const [desc, setDesc] = useState(defaultMeditation.description);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    id && fetchMeditation();
  }, []);

  const fetchMeditation = async () => {
    fetchOne(id)
      .then((data) => {
        setMeditation(data);
        setDesc(data.description);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SimpleHeader name={id ? "Edit Meditation" : "Add Meditation"} />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-7 col-md-12">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Meditation Detail</h3>
              </CardHeader>
              <hr className="my-0 mx-2" />
              <div>
                <Form>
                  <Row className="px-5 py-3">
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Title</h4>
                      <Input
                        placeholder="Add Title"
                        type="text"
                        value={meditation.title}
                        onChange={(e) =>
                          setMeditation({
                            ...meditation,
                            ...{ title: e.target.value },
                          })
                        }
                      />
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Date</h4>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Add Date",
                        }}
                        timeFormat={false}
                        value={moment(meditation.date)}
                        onChange={(e) =>
                          setMeditation({
                            ...meditation,
                            ...{ date: e },
                          })
                        }
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
                  <Row className="px-5 py-3">
                    <Col lg="6" md="12">
                      <h4 className="headingColor mb-3">Attached Sound</h4>
                      <div className="px-2">
                        <Row className="dashedBorder py-4">
                          {meditation.audio !== "" && (
                            <>
                              <Col lg="8" md="12">
                                <AudioPlayer
                                  customIcons={customIcons}
                                  showJumpControls={false}
                                  src={meditation.audio}
                                />
                              </Col>
                              <Col
                                lg="4"
                                md="12"
                                className="d-flex align-items-center justify-content-start"
                              >
                                <i
                                  onClick={() =>
                                    setMeditation({
                                      ...meditation,
                                      ...{ audio: "" },
                                    })
                                  }
                                  role="button"
                                  className="far fa-times-circle icon-color text-lg"
                                ></i>
                              </Col>
                            </>
                          )}
                        </Row>
                      </div>
                      <small>{/[^/]*$/.exec(meditation.audio)[0]}</small>
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor mb-3">
                        Attached Background Imgae
                      </h4>
                      <div className="px-2">
                        <Row className="dashedBorder py-4">
                          {meditation.image && (
                            <>
                              <Col lg="8" md="12">
                                <img
                                  src={meditation.image}
                                  className="meditationImageDetail"
                                />
                              </Col>
                              <Col
                                lg="4"
                                md="12"
                                className="d-flex align-items-center justify-content-start"
                              >
                                <i
                                  onClick={() =>
                                    setMeditation({
                                      ...meditation,
                                      ...{ image: "" },
                                    })
                                  }
                                  role="button"
                                  className="far fa-times-circle icon-color text-lg"
                                ></i>
                              </Col>
                            </>
                          )}
                        </Row>
                      </div>
                      <small>{/[^/]*$/.exec(meditation.image)[0]}</small>
                    </Col>
                  </Row>
                </Form>
                <Row className="px-5 py-3">
                  <Col>
                    <button className="btn addBtn">
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
