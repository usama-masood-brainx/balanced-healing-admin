import React, { useState } from "react";
import List from "list.js";
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { fetchAll } from "services/meditationService";
import * as moment from "moment";
import { useHistory } from "react-router-dom";

function MeditationTable() {
  const history = useHistory();
  const [meditations, setMeditations] = useState([]);
  React.useEffect(() => {
    fetchMeditations();
  }, []);

  const fetchMeditations = async () => {
    fetchAll()
      .then((data) => setMeditations(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SimpleHeader name="Meditations" parentName="Tables" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="mb-0">Light table</h3>
              </CardHeader>
              <div className="table-responsive">
                <Table className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Sr#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Background Image</th>
                      <th scope="col">CREATED AT</th>
                      <th scope="col">Description</th>
                      <th scope="col">Sound</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {meditations.map((meditation, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{meditation.title}</td>
                        <td>
                          <img
                            className="meditationImage"
                            alt="..."
                            src={meditation.image}
                          />
                        </td>
                        <td>{moment(meditation.date).format("DD/MM/YYYY")}</td>
                        <td>{meditation.description}</td>
                        <td>{/[^/]*$/.exec(meditation.audio)[0]}</td>
                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              color=""
                              role="button"
                              size="sm"
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.push(
                                    `/admin/meditation/${meditation._id}`
                                  );
                                }}
                              >
                                <div className="d-flex align-items-center justify-content-start">
                                  <i className="fa fa-eye mr-3"></i>
                                  <div>View</div>
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="d-flex align-items-center justify-content-start">
                                  <i className="fa fa-pencil-alt mr-3"></i>
                                  <div>Edit</div>
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div className="d-flex align-items-center justify-content-start">
                                  <i className="fa fa-times mr-3"></i>
                                  <div>Delete</div>
                                </div>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                    <tr></tr>
                  </tbody>
                </Table>
              </div>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default MeditationTable;
