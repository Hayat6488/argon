import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader";

import { collection, getDocs } from "firebase/firestore";

import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";

function Users() {

  // States for Modals **********

  const [exampleModal, setExampleModal] = React.useState(false)
  const [userDetails, setUserDetails] = React.useState(null)

  const openModal = (user) => {
    setExampleModal(!exampleModal)
    setUserDetails(user);
  }

  // States for Modals **********

  // Database call to read Data ***************


  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);


  React.useLayoutEffect(() => {
    const getData = async () => {
      const ref = collection(db, "usersList/user/children");

      const querySnapshot = await getDocs(ref);
      let data = [];

      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setUsers(data);
      setLoading(false);
    };
    getData();
  }, []);

  console.log(users);

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
                  <th>Location</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
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
                      <span>{user?.location}</span>
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
      </>
    );
  }
}

export default Users;
