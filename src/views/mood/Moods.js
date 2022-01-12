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
import { fetchAll, remove } from "services/moodService";
import AddMood from "./AddMood";
import DeleteModal from "components/Modals/deleteModal";
import { moodDeleteMessage } from "shared/constants";
import SpinnerLoader from "components/Misc/Spinner";

function MoodsTable() {
  const pageSize = 10;
  const [moods, setMoods] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [moodModal, showMoodModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [editMoodObj, setEditMoodObj] = useState(undefined);
  const [search, setSearch] = useState("");
  const [showSpinner, setSpinner] = useState(true);

  React.useEffect(() => {
    fetchMoods({ skip: 0, take: pageSize });
  }, []);

  const fetchMoods = async (body) => {
    fetchAll(body)
      .then((data) => {
        setMoods(data.moods);
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
    fetchMoods({ skip: (pageNumber - 1) * pageSize, take: pageSize });
    setPage(pageNumber);
  };

  const handleModalClose = () => {
    fetchMoods({ skip: (currentPage - 1) * pageSize, take: pageSize });
    showMoodModal(!moodModal);
    setEditMoodObj(undefined);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchMoods({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      ...(e.target.value.trim() && { search: e.target.value.trim() }),
    });
  };

  const handleDelete = () => {
    setSpinner(true);
    remove(deleteID)
      .then(() => {
        fetchMoods({
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
        });
        handleDeleteClose();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteClose = () => {
    setDeleteID("");
    showDeleteModal(!deleteModal);
  };

  return (
    <>
      <SpinnerLoader showSpinner={showSpinner} />
      <SimpleHeader
        name="Moods"
        updateList={() =>
          fetchMoods({ skip: (currentPage - 1) * pageSize, take: pageSize })
        }
      />
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
                <Table className="dataTable align-items-center">
                  <thead className="thead-light">
                    <tr>
                      <th className="px-4 w-5" scope="col">
                        Sr#
                      </th>
                      <th className="px-0 w-45" scope="col">
                        Description
                      </th>
                      <th className="px-0 w-45" scope="col">
                        Sheet
                      </th>
                      <th className="px-0 w-5" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    {moods.map((mood, index) => (
                      <tr key={index}>
                        <td className="pl-4">
                          <div className="default-color d-flex justify-content-start align-items-center">
                            {index + 1}
                          </div>
                        </td>
                        <td className="default-color overflowStyle pl-0 pr-4">
                          {mood.title}
                        </td>
                        <td className="pl-0 pr-4 overflowStyle">
                          {mood.sheet ? mood.sheet.title : "N/A"}
                        </td>
                        <td className="px-0">
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
                                  setEditMoodObj(mood);
                                  showMoodModal(true);
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
                                  showDeleteModal(true);
                                  setDeleteID(mood._id);
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
      <AddMood
        moodModal={moodModal}
        showMoodModal={showMoodModal}
        moodObj={editMoodObj}
        handleModalClose={handleModalClose}
      />
      <DeleteModal
        open={deleteModal}
        handleClose={handleDeleteClose}
        handleDelete={handleDelete}
        message={moodDeleteMessage}
        title={"Delete Mood"}
      />
    </>
  );
}

export default MoodsTable;
