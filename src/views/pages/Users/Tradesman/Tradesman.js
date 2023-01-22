import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Table,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

import { onSnapshot, collection, updateDoc, doc, query, getDocs, where } from "firebase/firestore";
import Modals from "./Modal/Modals";
import ReportsModals from "./ReportsModal/ReportsModal";
import { db } from "Firebase/firebase.config";
import NotifyContext from "context/NotifyContext";
import sendPushNotification from "utility/notification";
import Loader from "utility/Loader";

function Tradesman() {

  // States for Modals **********
  const { Notify } = React.useContext(NotifyContext);

  const [exampleModal, setExampleModal] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)


  const [reportModal, setReportModal] = React.useState(false)
  const [reports, setReports] = React.useState(null)

  const openModal = (user) => {
    setExampleModal(!exampleModal)
    setUserDetails(user);
  }


  const openreports = (reports) => {
    setReportModal(!reportModal)
    setReports(reports);
  }

  // States for Modals **********

  // Database call to read Data ***************



  const approve = "Approved";
  const disapprove = "Disapproved";
  const pending = "Pending";

  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  const collectionRef = collection(db, "/usersList/provider/children");

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
  }, [])


  // Database call to read Data ***************


  // Function to update data in database **************

  const update = async (id, status) => {
    const updated = {
      profileVerified: status
    };
    try {
      const userRef = doc(db, `/usersList/provider/children/${id}`);
      await updateDoc(userRef, updated);
      Notify("success", `Profile ${status} successfully.`, "Profile Status Update");
      await sendPushNotification();
      setSearch([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = React.useCallback(async (event) => {
    event.preventDefault();
    const id = event.target.search.value;
    try {
      setLoading(true);
      const ref = collection(db, "usersList/provider/children");
      const q = query(ref, where("email", "==", id));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setSearch(data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }

  }, []);



  if(search.length === 1){
    return (
      <>
        <>
        {loading ? <Loader></Loader> : <>
          <SimpleHeader name="Tradesman" parentName="Users" />
          <Container className="mt--6" fluid>
  
            <Card>
              <CardHeader className="border-0">
                <Row>
                  <Col xs="6">
                    <h3 className="mb-0">Tradesman</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <form onSubmit={(event) => handleSearch(event)}>
                      <div className="d-flex">
                        <Input className="w-50" type="text" name="search" bsSize="sm" id="" />
                        <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </CardHeader>
  
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Service Category</th>
                    <th>Reports</th>
                    <th>Business Location</th>
                    <th>Profile Status</th>
                    <th>Verification Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                    <tr key={search[0]?.id}>
                      <td className="table-user">
                        <img
                          alt="..."
                          className="avatar rounded-circle mr-3"
                          src={search[0]?.profilePhoto}
                        />
                        <b>{search[0]?.name}</b>
                      </td>
                      <td>
                        <span className="text-muted">{search[0]?.category}</span>
                      </td>
                      <td>
                        <button
                          aria-label="Close"
                          className="border-0 rounded-lg px-2 primary"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => openreports(search[0]?.reports)}
                        >
                          <h3 className="text-muted  fs-4">{search[0]?.reports?.length}</h3>
                        </button>
                      </td>
                      <td>
                        <span className="text-muted">{search[0]?.businessLocation}</span>
                      </td>
                      <td>
                        <Badge color={search[0]?.profileStatus === "complete" ? "success" : "warning"} className="text-muted">{search[0]?.profileStatus}</Badge>
                      </td>
                      <td>
                        <a
                          className="font-weight-bold"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <UncontrolledDropdown>
                            <DropdownToggle caret color="secondary">
                              {search[0]?.profileVerified}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(search[0]?.id, approve)}
                              >
                                Approve
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(search[0]?.id, disapprove)}
                              >
                                Disapprove
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(search[0]?.id, pending)}
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
                          onClick={() => openModal(search[0])}
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
                </tbody>
              </Table>
            </Card>
          </Container>
          {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} userDetails={userDetails}></Modals>}
          {
            reportModal && <ReportsModals setReportModal={setReportModal} reportModal={reportModal} reports={reports}></ReportsModals>
          }
        </>}
        </>
        
      </>
    );
  }
  else{
    return (
      <>
        <>
        {loading ? <Loader></Loader> : <>
          <SimpleHeader name="Tradesman" parentName="Users" />
          <Container className="mt--6" fluid>
  
            <Card>
              <CardHeader className="border-0">
                <Row>
                  <Col xs="6">
                    <h3 className="mb-0">Tradesman</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <form onSubmit={(event) => handleSearch(event)}>
                      <div className="d-flex">
                        <Input className="w-50" type="text" name="search" bsSize="sm" id="" />
                        <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                      </div>
                    </form>
                  </Col>
                </Row>
              </CardHeader>
  
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Service Category</th>
                    <th>Reports</th>
                    <th>Business Location</th>
                    <th>Profile Status</th>
                    <th>Verification Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="table-user">
                        <img
                          alt="..."
                          className="avatar rounded-circle mr-3"
                          src={user?.profilePhoto}
                        />
                        <b>{user?.name}</b>
                      </td>
                      <td>
                        <span className="text-muted">{user?.category}</span>
                      </td>
                      <td>
                        <button
                          aria-label="Close"
                          className="border-0 rounded-lg px-2 primary"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => openreports(user?.reports)}
                        >
                          <h3 className="text-muted  fs-4">{user?.reports?.length}</h3>
                        </button>
                      </td>
                      <td>
                        <span className="text-muted">{user?.businessLocation}</span>
                      </td>
                      <td>
                        <Badge color={user?.profileStatus === "complete" ? "success" : "warning"} className="text-muted">{user?.profileStatus}</Badge>
                      </td>
                      <td>
                        <a
                          className="font-weight-bold"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <UncontrolledDropdown>
                            <DropdownToggle caret color="secondary">
                              {user?.profileVerified}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(user?.id, approve)}
                              >
                                Approve
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(user?.id, disapprove)}
                              >
                                Disapprove
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => update(user?.id, pending)}
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
        </>}
        </>
        
      </>
    );
  }
}

export default Tradesman;
