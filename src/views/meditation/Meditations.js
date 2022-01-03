import React, { useState } from "react";
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
  Input,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { fetchAll, remove } from "services/meditationService";
import * as moment from "moment";
import { useHistory } from "react-router-dom";
import SpinnerLoader from "components/Misc/Spinner";

function MeditationTable() {
  const pageSize = 10;
  const history = useHistory();
  const [meditations, setMeditations] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showSpinner, setSpinner] = useState(true);

  React.useEffect(() => {
    fetchMeditations({ skip: 0, take: pageSize });
  }, []);

  const fetchMeditations = async (body) => {
    setSpinner(true);
    fetchAll(body)
      .then((data) => {
        setMeditations(data.meditations);
        setCount(data.count);
        setSpinner(false);
      })
      .catch((err) => console.log(err));
  };

  const pages = () => {
    let pagesArr = [];
    for (let i = 1; i <= Math.ceil(count / pageSize); i++) {
      pagesArr.push(
        <PaginationItem className={currentPage === i ? "active" : ""}>
          <PaginationLink onClick={(e) => handlePageClick(e, i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pagesArr;
  };

  const handlePageClick = (e, pageNumber) => {
    e.preventDefault();
    fetchMeditations({ skip: (pageNumber - 1) * pageSize, take: pageSize });
    setPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchMeditations({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      ...(e.target.value && { search: e.target.value }),
    });
  };

  return (
    <>
      <SpinnerLoader showSpinner={showSpinner} />
      <SimpleHeader name="Meditations" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader className="border-0">
                <h3 className="d-inline-block mr-4">Search: </h3>
                <Input
                  className="d-inline-block searchBox"
                  placeholder="Search Title"
                  type="text"
                  value={search}
                  onChange={handleSearch}
                />
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
                        <td>
                          <div className="default-color d-flex justify-content-center align-items-center">
                            {index + 1}
                          </div>
                        </td>
                        <td className="default-color">{meditation.title}</td>
                        <td>
                          <div>
                            <img
                              className="meditationImage"
                              alt="..."
                              src={meditation.image}
                            />
                          </div>
                        </td>
                        <td>{moment(meditation.date).format("MM/DD/YYYY")}</td>
                        <td>
                          {meditation.description.length > 90
                            ? meditation.description.substring(0, 90) + "..."
                            : meditation.description}
                        </td>
                        <td>{/[^/]*$/.exec(meditation.audio)[0]}</td>
                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light action-bg"
                              color=""
                              role="button"
                              size="sm"
                            >
                              <i className="fas fa-ellipsis-h icon-color" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  history.push(
                                    `/admin/add-meditation/${meditation._id}`
                                  );
                                }}
                              >
                                <div className="d-flex align-items-center justify-content-start">
                                  <i className="fa fa-pencil-alt mr-3"></i>
                                  <div>Edit</div>
                                </div>
                              </DropdownItem>
                              <DropdownItem
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSpinner(true);
                                  remove(meditation._id).then(() =>
                                    fetchMeditations({
                                      skip: (currentPage - 1) * pageSize,
                                      take: pageSize,
                                    }).catch((err) => console.log(err))
                                  );
                                }}
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
                    <PaginationItem
                      className={currentPage === 1 ? "disabled" : ""}
                    >
                      <PaginationLink
                        onClick={(e) => handlePageClick(e, currentPage - 1)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {pages().map((page, index) => (
                      <div key={index}>{page}</div>
                    ))}
                    <PaginationItem
                      className={
                        currentPage >= Math.ceil(count / pageSize)
                          ? "disabled"
                          : ""
                      }
                    >
                      <PaginationLink
                        onClick={(e) => handlePageClick(e, currentPage + 1)}
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
