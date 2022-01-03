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
import { fetchAll, remove } from "services/sheetService";
import { useHistory } from "react-router-dom";

function MoodsTable() {
  const pageSize = 10;
  const history = useHistory();
  const [sheets, setSheets] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    fetchSheets({ skip: 0, take: pageSize });
  }, []);

  const fetchSheets = async (body) => {
    fetchAll(body)
      .then((data) => {
        setSheets(data.sheets);
        setCount(data.count);
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
    fetchSheets({ skip: (pageNumber - 1) * pageSize, take: pageSize });
    setPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchSheets({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      ...(e.target.value && { search: e.target.value }),
    });
  };

  return (
    <>
      <SimpleHeader name="Sheets" />
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
                      <th scope="col">Description</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {sheets.map((sheet, index) => (
                      <tr key={index}>
                        <td>
                          <div className="default-color pl-4">{index + 1}</div>
                        </td>
                        <td className="default-color">{sheet.title}</td>
                        <td>
                          {sheet.detail.length > 90
                            ? sheet.detail.substring(0, 90) + "..."
                            : sheet.detail}
                        </td>
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
                                  history.push(`/admin/sheet/${sheet._id}`);
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
                                  history.push(`/admin/add-sheet/${sheet._id}`);
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
                                  remove(sheet._id).then(() =>
                                    fetchSheets({
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

export default MoodsTable;
