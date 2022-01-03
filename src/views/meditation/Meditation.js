import React, { useState } from "react";
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { fetchOne } from "services/meditationService";
import * as moment from "moment";
import { useParams } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { customIcons } from "shared/constants";
import SpinnerLoader from "components/Misc/Spinner";

function Meditation() {
  const { id } = useParams();
  const [meditation, setMeditation] = useState({});
  const [showSpinner, setSpinner] = useState(true);

  React.useEffect(() => {
    fetchMeditation();
  }, []);

  const fetchMeditation = async () => {
    setSpinner(true);
    fetchOne(id)
      .then((data) => {
        setMeditation(data);
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SpinnerLoader showSpinner={showSpinner} />
      <SimpleHeader name="Meditation" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-7 col-md-12">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Meditation Detail</h3>
              </CardHeader>
              <hr className="my-0 mx-2" />
              {meditation && (
                <div>
                  <Row className="px-5 py-3">
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Title</h4>
                      <p className="mb-0 text-dark">{meditation.title}</p>
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor">Date</h4>
                      <p className="mb-0 text-dark">
                        {moment(meditation.date).format("MM/DD/YYYY")}
                      </p>
                    </Col>
                  </Row>
                  <Row className="px-5 py-3">
                    <Col lg="12">
                      <h4 className="headingColor">Description</h4>
                      <p className="mb-0 text-dark">{meditation.description}</p>
                    </Col>
                  </Row>
                  <Row className="px-5 py-3">
                    <Col lg="6" md="12">
                      <h4 className="headingColor mb-3">Attached Sound</h4>
                      <Row>
                        <Col lg="8" md="12">
                          <AudioPlayer
                            autoPlay={false}
                            customIcons={customIcons}
                            showJumpControls={false}
                            src={meditation.audio}
                          />
                        </Col>
                      </Row>
                      <small>{/[^/]*$/.exec(meditation.audio)[0]}</small>
                    </Col>
                    <Col lg="6" md="12">
                      <h4 className="headingColor mb-3">
                        Attached Background Imgae
                      </h4>
                      <img
                        src={meditation.image}
                        className="meditationImageDetail"
                      />
                      <br />
                      <small>{/[^/]*$/.exec(meditation.image)[0]}</small>
                    </Col>
                  </Row>
                </div>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Meditation;
