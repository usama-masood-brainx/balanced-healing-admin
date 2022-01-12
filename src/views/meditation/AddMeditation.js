import React, { useEffect, useRef, useState } from "react";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Card, CardHeader, Container, Row, Col, Input, Form } from "reactstrap";
import { fetchOne, add, update } from "services/meditationService";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import * as moment from "moment";
import {
  customIcons,
  defaultMeditation,
  updateToast,
  successToast,
  errorToast,
} from "shared/constants";
import { uploadFile } from "services/s3Service";
import Dropzone from "dropzone";
import classnames from "classnames";
import { useParams } from "react-router-dom";
import SpinnerLoader from "components/Misc/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { dataURLtoFile, isCorrectImageRatio } from "services/utilities";
Dropzone.autoDiscover = false;

const AddMeditation = () => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);

  const { id } = useParams();

  //form values states
  const [meditation, setMeditation] = useState(defaultMeditation);
  const [title, setTitle] = useState(defaultMeditation.title);
  const [date, setDate] = useState(defaultMeditation.date);
  const [desc, setDesc] = useState(defaultMeditation.description);
  const [image, setImage] = useState(defaultMeditation.image);
  const [audio, setAudio] = useState(defaultMeditation.audio);
  const [audioName, setAudioName] = useState("");
  const [imageName, setImageName] = useState("");
  const [currentImageFile, setCurrentImageFile] = useState(false);
  const [currentAudioFile, setCurrentAudioFile] = useState(false);
  const [showSpinner, setSpinner] = useState(true);

  //validation states
  const [showError, setErrorMessage] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [audioChanged, setAudioChanged] = useState(false);

  const initializeDropzone = () => {
    const img = new Dropzone(document.getElementById("dropzone-single-image"), {
      url: "#",
      thumbnailWidth: null,
      dictDefaultMessage:
        '<i class="ni ni-cloud-upload-96 icon-color text-xl"></i><p>Click to upload or Drop file here</p>',
      thumbnailHeight: null,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function (file) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            if (currentImageFile) {
              this.removeFile(currentImageFile);
            }
            const convertedFile = dataURLtoFile(e.target.result, imageName);
            isCorrectImageRatio(
              convertedFile,
              () => {
                setImage(e.target.result);
                setImageName(JSON.parse(JSON.stringify(file)).upload.filename);
                setCurrentImageFile(convertedFile);
                setImageChanged(true);
              },
              () => {
                img.removeAllFiles();
                toast.error(
                  "Image Aspect Ratio not suitable for Mobile Devices",
                  errorToast
                );
              }
            );
          };
        });
      },
    });

    new Dropzone(document.getElementById("dropzone-single-audio"), {
      url: "#",
      thumbnailWidth: null,
      dictDefaultMessage:
        '<i class="ni ni-cloud-upload-96 icon-color text-xl"></i><p>Click to upload or Drop file here</p>',
      thumbnailHeight: null,
      maxFiles: 1,
      acceptedFiles: "audio/*",
      init: function () {
        this.on("addedfile", function (file) {
          setAudioChanged(true);
          if (currentAudioFile) {
            this.removeFile(currentAudioFile);
          }
          setAudioName(JSON.parse(JSON.stringify(file)).upload.filename);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            setAudio(e.target.result);
            const convertedFile = dataURLtoFile(e.target.result, audioName);
            setCurrentAudioFile(convertedFile);
          };
        });
      },
    });
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    initializeDropzone();
    setEditorLoaded(true);
    id ? fetchMeditation() : setSpinner(false);
  }, []);

  const fetchMeditation = async () => {
    fetchOne(id)
      .then((data) => {
        setMeditation(data);
        setDesc(data.description);
        setTitle(data.title);
        setDate(data.date);
        setImage(data.image);
        setAudio(data.audio);
        setAudioName(/[^/]*$/.exec(data.audio)[0]);
        setImageName(/[^/]*$/.exec(data.image)[0]);
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    setSpinner(true);
    try {
      if (
        id &&
        meditation.title === title &&
        meditation.date === date &&
        meditation.description === desc &&
        meditation.audio === audio &&
        meditation.image === image
      ) {
        toast.success("Meditation Updated Successfuly", updateToast);
        setSpinner(false);
        return;
      }
      if (
        !title ||
        !date ||
        !desc ||
        (imageChanged && !currentImageFile) ||
        (!imageChanged && !image)
      ) {
        setErrorMessage(true);
        setSpinner(false);
        return;
      }
      let uploadedImage = image;
      let uploadedAudio = audio;
      let result;
      if (imageChanged) {
        uploadedImage = await uploadFile(
          currentImageFile,
          `images/${imageName}`
        );
      }
      if (audioChanged) {
        uploadedAudio = await uploadFile(
          currentAudioFile,
          `audios/${audioName}`
        );
      }
      if (id) {
        result = await update(id, {
          title,
          date: moment(date).format("YYYY-MM-DD"),
          description: desc,
          image: uploadedImage,
          audio: uploadedAudio,
        });
      } else {
        result = await add({
          title,
          date: moment(date).format("YYYY-MM-DD"),
          description: desc,
          image: uploadedImage ? uploadedImage : image,
          audio: uploadedAudio ? uploadedAudio : audio,
        });
      }
      setSpinner(false);
      if (!result?.created) {
        toast.error("Meditation already exists on specified Date", errorToast);
      } else {
        id
          ? toast.success("Meditation Updated Successfuly", updateToast)
          : toast.success("Meditation Added Successfuly", successToast);
        setErrorMessage(false);
      }
      if (!id) {
        setMeditation(defaultMeditation);
        setDesc(defaultMeditation.description);
        setTitle(defaultMeditation.title);
        setDate(defaultMeditation.date);
        setImage(defaultMeditation.image);
        setAudio(defaultMeditation.audio);
        setAudioName("");
        setImageName("");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", errorToast);
      setErrorMessage(false);
    }
  };

  return (
    <>
      <SpinnerLoader showSpinner={showSpinner} />
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
                        className={!title && showError ? "is-invalid" : ""}
                        placeholder="Add Title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Date</h4>
                      <Input
                        type="date"
                        className={!date && showError ? "is-invalid" : ""}
                        value={date ? moment(date).format("YYYY-MM-DD") : ""}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="px-5 py-3">
                    <Col lg="12">
                      <h4 className="headingColor">Description</h4>
                      <div className={!desc && showError ? "is-invalid" : ""}>
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
                      </div>
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
                                  setAudioName("");
                                  setCurrentAudioFile(false);
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
                      <small>{decodeURI(audioName)}</small>
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
                                  setImageName("");
                                  setCurrentImageFile(false);
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
                            { "d-none": image },
                            { "invalid-dropzone": !image && showError }
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
                      <small>{decodeURI(imageName)}</small>
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
      <Toaster />
    </>
  );
};

export default AddMeditation;
