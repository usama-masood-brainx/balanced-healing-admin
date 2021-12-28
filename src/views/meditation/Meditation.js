/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
// javascript plugin that creates a sortable object from a dom object
import List from "list.js";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { fetchOne } from "services/meditationService";
import * as moment from "moment";
import { useParams } from "react-router-dom";

function MeditationTable() {
  const { id } = useParams();
  const [meditation, setMeditation] = useState({});
  React.useEffect(() => {
    fetchMeditation();
  }, []);

  const fetchMeditation = async () => {
    console.log(id);
    fetchOne(id)
      .then((data) => setMeditation(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SimpleHeader name="Meditations" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col-lg-7 col-md-12">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Meditation Detail</h3>
              </CardHeader>
              <hr/>
              {meditation && (
                <div>
                  <Row className="px-5 py-3">
                    <Col lg="6" md="12">
                      {meditation.title}
                    </Col>
                    <Col lg="6" md="12">
                      {meditation.date}
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

export default MeditationTable;
