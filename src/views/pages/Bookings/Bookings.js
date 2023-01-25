import React from "react";
// reactstrap components
import {
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Table
} from "reactstrap";
import { onSnapshot, collection, getDocs } from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";

function Bookings() {

  const userRef = collection(db, "/usersList/user/children");
  const tradesmanRef = collection(db, "/usersList/provider/children");

  const [bookings, setBookings] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [providers, setProviders] = React.useState([]);

  const [exampleModal, setExampleModal] = React.useState(false)
  const [bookingsDetails, setBookingsDetails] = React.useState(null)

  const openModal= (user) => {
    setExampleModal(!exampleModal)
    setBookingsDetails(user);
  }

  const [loading, setLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(userRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(tradesmanRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setProviders(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);


  React.useLayoutEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "bookingRequest"));
      let dataList = [];

      querySnapshot.forEach(async (x) => {
        const userId = x.data().userUid;
        const providerId = x.data().providerUid;

        const user = users?.find(user => user.uid === userId);
        const provider = providers?.find(provider => provider.uid === providerId);
        
        dataList.push({
          id: x.id,
          ...x.data(),
          ...user,
          ...{provider},
        });
      });
      setBookings(dataList);
      setLoading(false)
    };
    getData();
  }, [users, providers]);

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
                  <h3 className="mb-0">BOOKINGS DETAILS</h3>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Tradesman</th>
                  <th scope="col">Title</th>
                  <th scope="col">Starting Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  bookings.map(booking => <tr key={booking._id}>
                    <th scope="row">
                      <img className="avatar rounded-circle" alt="..." src={booking?.photURL} />
                      <span className="mb-0 ml-2 text-sm">
                        {booking?.name}
                      </span>
                    </th>
                    <td>
                      <img className="avatar rounded-circle" alt="..." src={booking?.provider?.profilePhoto} />
                      <span className="ml-2 text-sm">
                        {booking?.provider?.name}
                      </span>
                    </td>
                    <td>
                      <span>{booking?.title}</span>
                    </td>
                    <td>
                      <span>{booking?.startDate}</span>
                    </td>
                    <td>
                      <span>{booking?.endDate}</span>
                    </td>
                    <td className="table-actions">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => openModal(booking?.status)}
                      >
                        <span aria-hidden={true}><i className="fas fa-eye" /></span>
                      </button>
                    </td>
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