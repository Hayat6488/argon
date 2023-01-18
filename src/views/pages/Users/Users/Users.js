import React from "react";
// reactstrap components
import {
  Badge,
  Button,
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
import SimpleHeader from "components/Headers/SimpleHeader";

import { onSnapshot, collection, query, updateDoc, doc } from "firebase/firestore";

import db from "../../../../Firebase/firebase.config";
import Modals from "./Modal/Modals";

function Users() {

  // States for Modals **********

  const [exampleModal, setExampleModal] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)

  const openModal= (user) => {
    setExampleModal(!exampleModal)
    setUserDetails(user);
  }

  // States for Modals **********

  // Database call to read Data ***************

  const collectionRef = collection(db, "users");

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  React.useEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ _id: doc.id, ...doc.data() });
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [collectionRef])

  // Database call to read Data ***************

  // Loader to show Loading ***********

  if (loading) {
    return <h1>Loading</h1>;
  }


  // Loader to show Loading ***********

  else {
    return (
      <>
        <SimpleHeader name="users" parentName="Users" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">Users</h3>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="table-user">
                      {/* <img
                        alt="..."
                        className="avatar rounded-circle mr-3"
                        src={require("assets/img/theme/team-1.jpg").default}
                      /> */}
                      <b>{user.name}</b>
                    </td>
                    <td>
                      <span className="text-muted">{user.email}</span>
                    </td>
                    {/* <td>
                      <a
                        className="font-weight-bold"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <UncontrolledDropdown>
                          <DropdownToggle caret color="secondary">
                            {user.status}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              href="#pablo"
                              onClick={() => update(user._id, approve)}
                            >
                              Approve
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={() => update(user._id, disapprove)}
                            >
                              Disapprove
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={() => update(user._id, pending)}
                            >
                              Pending
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </a>
                    </td> */}
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
                      {/* <a
                        className="table-action"
                        href="#pablo"
                        id="tooltip564981685"
                        onClick={() => (!exampleModal)}
                      >
                        <i className="fas fa-eye" />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip564981685">
                        Edit product
                      </UncontrolledTooltip> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Container>
        {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} userDetails={userDetails}></Modals>}
      </>
    );
  }
}

export default Users;
