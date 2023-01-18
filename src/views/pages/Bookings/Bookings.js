import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Button,
  Media,
  Progress,
  UncontrolledTooltip,
  Table
} from "reactstrap";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../../../Firebase/firebase.config";
import SimpleHeader from "components/Headers/SimpleHeader";
import Modals from "./Modal/Modals";

function Bookings() {

  const [exampleModal, setExampleModal] = React.useState(false)
  const [bookingsDetails, setBookingsDetails] = React.useState(null)

  const openModal= (user) => {
    setExampleModal(!exampleModal)
    setBookingsDetails(user);
  }

  const collectionRef = collection(db, "bookings");

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  React.useEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ _id: doc.id, ...doc.data() });
      });
      setPosts(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [collectionRef])


  // const Delete = (id) => {
  //   console.log(id);
  // }

  if (loading) {
    return <h1>Loading</h1>
  }

  else {
    return (
      <>
        <SimpleHeader name="Job Posts" parentName="Job Posts" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">JOB POSTS</h3>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Tradesman</th>
                  <th scope="col">Title</th>
                  <th scope="col">Amount</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  posts.map(post => <tr key={post._id}>
                    <th scope="row">
                    <img className="avatar rounded-circle" alt="..." src={post.userPic} />
                      <span className="ml-2">{post.user}</span>
                    </th>
                    <td>
                      <img className="avatar rounded-circle" alt="..." src={post.tradesmanPic} />
                      <span className="ml-2">{post.tradesman}</span>
                    </td>
                    <td>
                      <span>{post.time}</span>
                    </td>
                    <td>
                      <span>{post.amount}</span>
                    </td>
                    <td className="table-actions">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => openModal(post.timeline)}
                      >
                        <span aria-hidden={true}><i className="fas fa-eye" /></span>
                      </button>
                    </td>
                    {/* <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else here
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td> */}
                  </tr>)
                }
              </tbody>
            </Table>
          </Card>
        </Container>
        {exampleModal && <Modals setExampleModal={setExampleModal} exampleModal={exampleModal} bookingsDetails={bookingsDetails}></Modals>}
      </>
    );
  }
}

export default Bookings