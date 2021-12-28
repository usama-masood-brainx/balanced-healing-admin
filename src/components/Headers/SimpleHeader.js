import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
} from "reactstrap";

function TimelineHeader({ name }) {
  return (
    <>
      <div className="header header-dark bg-info pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="12">
                <h6 className="h1 text-white d-inline-block mb-0 mx-2">
                  {name}
                </h6>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

TimelineHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default TimelineHeader;
