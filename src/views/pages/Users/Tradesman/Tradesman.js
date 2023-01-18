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

import db from "../../../../Firebase/firebase.config";
import Modals from "./Modal/Modals";
import ReportsModals from "./ReportsModal/ReportsModal";

function Tradesman() {

  // States for Modals **********

  const [exampleModal, setExampleModal] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)


  const [reportModal, setReportModal] = React.useState(false)
  const [reports, setReports] = React.useState(null)

  const openModal= (user) => {
    setExampleModal(!exampleModal)
    setUserDetails(user);
  }


  const openreports = (reports) => {
    setReportModal(!reportModal)
    setReports(reports);
  }

  // States for Modals **********

  // Database call to read Data ***************

  const collectionRef = collection(db, "users");

  const approve = "Approved";
  const disapprove = "Disapproved";
  const pending = "pending";

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  React.useEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ _id: doc.id, ...doc.data() });
      });
      console.log(items)
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [collectionRef])

  // Database call to read Data ***************


  // Function to update data in database **************

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

  // Function to update data in database **************

  // Loader to show Loading ***********

  if (loading) {
    return <h1>Loading</h1>;
  }


  // Loader to show Loading ***********

  else {
    return (
      <>
        <SimpleHeader name="Tradesman" parentName="Users" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">Tradesman</h3>
                </Col>
                {/* <Col className="text-right" xs="6">
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
                </Col> */}
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Reports</th>
                  <th>Status</th>
                  <th />
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
                    <td>
                    <button
                        aria-label="Close"
                        className="border-0 rounded-lg px-2 primary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => openreports(user.reports)}
                      >
                        <h3 className="text-muted  fs-4">{user.reports.length}</h3>
                      </button>
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
        {
          reportModal && <ReportsModals setReportModal={setReportModal} reportModal={reportModal} reports={reports}></ReportsModals>
        }
      </>
    );
  }
}

export default Tradesman;
