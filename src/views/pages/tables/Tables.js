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
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { onSnapshot, collection, query, updateDoc, doc } from "firebase/firestore";

import db from "../../../Firebase/firebase.config";

function Tables() {
  const collectionRef = collection(db, "users");

  const approve = "Approved";
  const disapprove = "Disapproved";
  const pending = "pending";

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  React.useEffect(()=>{
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
  
        items.push({_id: doc.id, ...doc.data()});
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  },[collectionRef])

  const update = (id, status) => {
    console.log({ id });
    const updated = {
      status: status
    };
    try {
      const userRef = doc(db, `users/${id}`); 
      updateDoc(userRef, updated);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
        <SimpleHeader name="Tables" parentName="Tables" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">Inline actions</h3>
                </Col>
                <Col className="text-right" xs="6">
                  <Button
                    className="btn-neutral btn-round btn-icon"
                    color="default"
                    href="#pablo"
                    id="tooltip969372949"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-user-edit" />
                    </span>
                    <span className="btn-inner--text">Export</span>
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip969372949">
                    Edit product
                  </UncontrolledTooltip>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td className="table-user">
                    <img
                      alt="..."
                      className="avatar rounded-circle mr-3"
                      src={require("assets/img/theme/team-1.jpg").default}
                    />
                    <b>John Michael</b>
                  </td>
                  <td>
                    <span className="text-muted">
                      10/09/{new Date().getFullYear()}
                    </span>
                  </td>
                  <td>
                    <a
                      className="font-weight-bold"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Argon Dashboard PRO
                    </a>
                  </td>
                  <td className="table-actions">
                    <a
                      className="table-action"
                      href="#pablo"
                      id="tooltip564981685"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-user-edit" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip564981685">
                      Edit product
                    </UncontrolledTooltip>
                    <a
                      className="table-action table-action-delete"
                      href="#pablo"
                      id="tooltip601065234"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fas fa-trash" />
                    </a>
                    <UncontrolledTooltip delay={0} target="tooltip601065234">
                      Delete product
                    </UncontrolledTooltip>
                  </td>
                </tr> */}
                {users.map((user) => (
                  <tr>
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
                    <td>
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
                    </td>
                    <td className="table-actions">
                      <a
                        className="table-action"
                        href="#pablo"
                        id="tooltip564981685"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-eye" />
                      </a>
                      <UncontrolledTooltip delay={0} target="tooltip564981685">
                        Edit product
                      </UncontrolledTooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Container>
      </>
    );
  }
}

export default Tables;
