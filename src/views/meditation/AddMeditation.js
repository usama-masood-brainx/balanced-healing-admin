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
import Dropzone from "dropzone";
import classnames from "classnames";
Dropzone.autoDiscover = false;

const AddMeditation = () => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  let imageDropzone, audioDropzone;

  const { id } = useParams();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [title, setTitle] = useState(defaultMeditation.title);
  const [date, setDate] = useState(defaultMeditation.date);
  const [desc, setDesc] = useState(defaultMeditation.description);
  const [image, setImage] = useState(defaultMeditation.image);
  const [audio, setAudio] = useState(defaultMeditation.audio);
  const [audioName, setAudioName] = useState("");
  const [imageName, setImageName] = useState("");

  let currentImageFile = undefined;
  let currentAudioFile = undefined;

  const initializeDropzone = () => {
    imageDropzone = new Dropzone(
      document.getElementById("dropzone-single-image"),
      {
        url: "/",
        thumbnailWidth: null,
        dictDefaultMessage:
          '<i class="ni ni-cloud-upload-96 icon-color text-xl"></i><p>Click to upload or Drop file here</p>',
        thumbnailHeight: null,
        maxFiles: 1,
        acceptedFiles: "image/*",
        init: function () {
          this.on("addedfile", function (file) {
            if (currentImageFile) {
              this.removeFile(currentImageFile);
            }
            setImageName(JSON.parse(JSON.stringify(file)).upload.filename);
            currentImageFile = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
              setImage(e.target.result);
            };
          });
        },
      }
    );

    audioDropzone = new Dropzone(
      document.getElementById("dropzone-single-audio"),
      {
        url: "/",
        thumbnailWidth: null,
        dictDefaultMessage:
          '<i class="ni ni-cloud-upload-96 icon-color text-xl"></i><p>Click to upload or Drop file here</p>',
        thumbnailHeight: null,
        maxFiles: 1,
        acceptedFiles: "audio/*",
        init: function () {
          this.on("addedfile", function (file) {
            if (currentAudioFile) {
              this.removeFile(currentAudioFile);
            }
            setAudioName(JSON.parse(JSON.stringify(file)).upload.filename);
            currentAudioFile = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
              setAudio(e.target.result);
            };
          });
        },
      }
    );
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    initializeDropzone();
    setEditorLoaded(true);
    id && fetchMeditation();
  }, []);

  const fetchMeditation = async () => {
    fetchOne(id)
      .then((data) => {
        setDesc(data.description);
        setTitle(data.title);
        setDate(data.date);
        setImage(data.image);
        setAudio(data.audio);
        setAudioName(/[^/]*$/.exec(data.audio)[0]);
        setImageName(/[^/]*$/.exec(data.image)[0]);
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Date</h4>
                      <ReactDatetime
                        inputProps={{
                          placeholder: "Add Date",
                        }}
                        timeFormat={false}
                        value={date ? moment(date) : ""}
                        onChange={(e) => setDate(e)}
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
                      <h4 className="headingColor mb-3">
                        {audio ? "Attached Sound" : "Attach Sound"}
                      </h4>
                      <div className="px-2">
                        {audio && (
                          <Row className="dashedBorder py-4">
                            <Col lg="8" md="12">
                              <AudioPlayer
                                customIcons={customIcons}
                                showJumpControls={false}
                                src={audio}
                              />
                            </Col>
                            <Col
                              lg="4"
                              md="12"
                              className="d-flex align-items-center justify-content-start"
                            >
                              <i
                                onClick={() => {
                                  setAudio("");
                                  if (currentAudioFile) {
                                    imageDropzone.removeFile(currentAudioFile);
                                  }
                                }}
                                role="button"
                                className="far fa-times-circle icon-color text-lg"
                              ></i>
                            </Col>
                          </Row>
                        )}
                        <div
                          className={classnames(
                            "dropzone dropzone-single mb-3",
                            { "d-none": audio }
                          )}
                          id="dropzone-single-audio"
                        >
                          <div className="fallback">
                            <div className="custom-file">
                              <input
                                className="custom-file-input"
                                id="projectCoverUploads"
                                type="file"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <small>{audioName}</small>
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor mb-3">
                        {image
                          ? "Attached Background Imgae"
                          : "Attach Background Imgae"}
                      </h4>
                      <div className="px-2">
                        {image && (
                          <Row className="dashedBorder py-4">
                            <Col lg="8" md="12">
                              <img
                                src={image}
                                className="meditationImageDetail"
                              />
                            </Col>
                            <Col
                              lg="4"
                              md="12"
                              className="d-flex align-items-center justify-content-start"
                            >
                              <i
                                onClick={() => {
                                  setImage("");
                                  if (currentImageFile) {
                                    imageDropzone.removeFile(currentImageFile);
                                  }
                                }}
                                role="button"
                                className="far fa-times-circle icon-color text-lg"
                              ></i>
                            </Col>
                          </Row>
                        )}
                        <div
                          className={classnames(
                            "dropzone dropzone-single mb-3",
                            { "d-none": image }
                          )}
                          id="dropzone-single-image"
                        >
                          <div className="fallback">
                            <div className="custom-file">
                              <input
                                className="custom-file-input"
                                id="projectCoverUploads"
                                type="file"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <small>{imageName}</small>
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
