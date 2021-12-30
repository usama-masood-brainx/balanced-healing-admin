import React, { useState } from "react";
import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { fetchOne } from "services/sheetService";
import { useParams } from "react-router-dom";

function Sheet() {
  const { id } = useParams();
  const [sheet, setSheet] = useState({});
  React.useEffect(() => {
    fetchMeditation();
  }, []);

  const fetchMeditation = async () => {
    fetchOne(id)
      .then((data) => setSheet(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SimpleHeader name="Sheet" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-7 col-md-12">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Sheet Detail</h3>
              </CardHeader>
              <hr className="my-0 mx-2" />
              {sheet && (
                <div>
                  <Row className="px-5 py-3">
                    <Col lg="12">
                      <h4 className="headingColor">Title</h4>
                      <p className="mb-0 text-dark">{sheet.title}</p>
                    </Col>
                  </Row>
                  <Row className="px-5 py-3">
                    <Col lg="12">
                      <h4 className="headingColor">Description</h4>
                      <p className="mb-0 text-dark">{sheet.detail}</p>
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

export default Sheet;
