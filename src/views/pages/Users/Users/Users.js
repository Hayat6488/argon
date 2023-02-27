import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Input,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader";

import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";

import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";
import Loader from "utility/Loader";
import ReactBSAlert from "react-bootstrap-sweetalert";

function Users() {

  // All States for   **********
  
  const [exampleModal, setExampleModal] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState(null);
  const [search, setSearch] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showAll, setShowAll] = React.useState(false);
  const [rendered, setRenderer] = React.useState(1);
  
  const [alert, setAlert] = React.useState(false);
  
  // All States for   **********
  
  // Pagination setup **************
  
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(10);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFastPost = indexOfLastPost - postsPerPage;
  
  const currentUser = users.slice(indexOfFastPost, indexOfLastPost);
  
  const lastPageNumber = Math.ceil(users.length / postsPerPage);
  
  // Pagination setup **************

  const openModal = (user) => {
    setExampleModal(!exampleModal)
    setUserDetails(user);
  }

  const collectionRef = collection(db, "/usersList/user/children");

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered]);

  console.log(users);

  const handleSearch = React.useCallback(async (event) => {
    setShowAll(true);
    event.preventDefault();
    const id = event.target.search.value;
    try {
      setLoading(true);
      const ref = collection(db, "usersList/user/children");
      const q = query(ref, where("email", "==", id));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }

  }, []);

  const deleteUserFromDb = (user) => {
    try {
        deleteDoc(doc(db, `/usersList/user/children/${user?.id}`));
        setAlert(false)
    }
    catch (error) { 
    }
}

  const deleteUser = (user) => {
    setAlert(
      <ReactBSAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Warning"
      onConfirm={() => deleteUserFromDb(user)}
      onCancel={() => setAlert(null)}
      showCancel
      confirmBtnBsStyle="danger"
      confirmBtnText="Yes"
      cancelBtnBsStyle="info"
      cancelBtnText="Cancel"
      btnSize=""
      >
        {`Sure you want to delete ${user?.name}?`}
      </ReactBSAlert>
    );
  };

    return (
      <>
      {alert}
        {loading ?
          <Loader></Loader> :
          <>
            <SimpleHeader name="users" parentName="Users" />
            <Container className="mt--6" fluid>
              <Card>
                <CardHeader className="border-0">
                  <Row>
                    <Col xs="6">
                      <h3 className="mb-0">Users</h3>
                    </Col>
                    <Col className="text-right" xs="6">
                      <form onSubmit={(event) => handleSearch(event)}>
                        <div className="d-flex justify-content-end">
                          <Input placeholder="Enter Email" className="w-50" type="text" name="search" bsSize="sm" id="" />
                          <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                          {showAll && (
                          <Button
                            className="py-0"
                            color="default"
                            onClick={() => {
                              // window.location.reload(false);
                              setShowAll(false);
                              setRenderer(2);
                            }}
                          >
                            View All
                          </Button>
                        )}
                        </div>
                      </form>

                    </Col>
                  </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Location</th>
                      <th />
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {currentUser.map((user) => (
                      <tr key={user?.id}>
                        <td className="table-user">
                          <img
                            alt="..."
                            className="avatar rounded-circle mr-3"
                            src={user?.photoURL}
                          />
                          <b>{user?.name}</b>
                        </td>
                        <td>
                          <span className="">{user?.email}</span>
                        </td>
                        <td>
                          <span>{user?.location?.houseNumber}, {user?.location?.street}, {user?.location?.city}</span>
                        </td>
                        <td><Button
                         onClick={() => deleteUser(user)}
                         color="warning" type="button">
                          DELETE
                        </Button></td>
                        <td className="table-actions">
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => openModal(user)}
                          >
                            <span aria-hidden={true}><i className="fas fa-eye" /></span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <hr className="my-2" />
            <div className="d-flex px-2 w-100 justify-content-between align-items-center">
            <h4 className="text-muted">Showing {indexOfFastPost + 1} to {indexOfLastPost} from {users.length} posts</h4>
              <Pagination>
                {
                  currentPage - 1 !== 0 && <>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem></>
                }
                <PaginationItem className="active">
                  <PaginationLink href="#pablo" onClick={e => {
                    e.preventDefault()
                    setCurrentPage(currentPage)
                  }}
                  >
                    {currentPage} <span className="sr-only">(current)</span>
                  </PaginationLink>
                </PaginationItem>
                {
                  currentPage < lastPageNumber &&
                  <>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                      }}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                      }}
                      >
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </>
                }
              </Pagination>
              <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                  <h4 className="mr-1 mb-0 text-muted">Go to page: </h4>
                  <form  onSubmit={(event) => {
                    event.preventDefault();
                    setCurrentPage(parseInt(event.target.page.value));
                  }}>
                    <input className="py-0" style={{ width: "25%" }} type="text" name="page" id="" />
                    <Button className="py-0 px-2 ml-1" color="primary" type="submit">
                      Go
                    </Button>
                  </form>
                </div>
                <div className="d-flex align-items-center">
                  <h4 className="text-muted">Posts per page</h4>
                  <UncontrolledDropdown className="py-2" size="sm" group>
                    <DropdownToggle caret color="secondary">
                      {postsPerPage}
                    </DropdownToggle>
                    <DropdownMenu className="py-2" >
                      <DropdownItem className="py-2" href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(10);
                        setCurrentPage(1);
                      }}>
                        10
                      </DropdownItem>
                      <DropdownItem href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(25);
                        setCurrentPage(1);
                      }}>
                        25
                      </DropdownItem>
                      <DropdownItem href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(50);
                        setCurrentPage(1);
                      }}>
                        50
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </div>
              </Card>
            </Container>
            {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} userDetails={userDetails}></Modals>}
          </>
        }
      </>
    );
  }

export default Users;
