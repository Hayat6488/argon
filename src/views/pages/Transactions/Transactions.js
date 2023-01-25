import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Table,
  Button
} from "reactstrap";
import { onSnapshot, collection, getDocs } from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import { db } from "Firebase/firebase.config";
import Modals from "./Modal/Modals";

function Transactions() {

  const [exampleModal, setExampleModal] = React.useState(false)
  const [transactioDetails, setTransactioDetails] = React.useState(null)
  const [amount, setAmount] = React.useState(null)

  const openModal = (transaction) => {
    setExampleModal(!exampleModal);
    setTransactioDetails(transaction);
    setAmount(transaction?.amount);
  }

  const [transactions, setTransactions] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [serviceFee, setServiceFee] = React.useState([]);

  const userRef = collection(db, "/usersList/user/children");
  const tradesmanRef = collection(db, "/usersList/provider/children");

  
  const serviceFeeRef = collection(db, "serviceFee");

  React.useLayoutEffect(() => {
      const unSub = onSnapshot(serviceFeeRef, (QuerySnapshot) => {
          const items = [];
          QuerySnapshot.forEach((doc) => {

              items.push({ id: doc.id, ...doc.data() });
          });
          setServiceFee(items);
          setLoading(false);
      });

      return () => {
          unSub();
      };
  }, [])
  

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
      const querySnapshot = await getDocs(collection(db, "transactions"));
      let dataList = [];

      querySnapshot.forEach(async (x) => {
        const userId = x.data().userUID;
        const providerId = x.data().providerUID;

        const user = users?.find(user => user.uid === userId);
        const provider = providers?.find(provider => provider.uid === providerId);
        
        dataList.push({
          id: x.id,
          ...x.data(),
          ...user,
          ...{provider},
        });
      });
      setTransactions(dataList);
      setLoading(false)
    };
    getData();
  }, [users, providers, serviceFee]);

 const time = (date) => {
  const formatDate = new Date(
    date.seconds * 1000 + date.nanoseconds / 1000000
  );
  return formatDate.toLocaleTimeString('en-us', { day: 'numeric', month: 'long', });
 }


  if (loading) {
    return <h1>Loading</h1>
  }

  else {
    return (
      <>
        <SimpleHeader name="Transactions" parentName="Transactions" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">TRANSACTIONS</h3>
                </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Tradesman</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Time</th>
                  <th scope="col">Transaction ID</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  transactions.map(transaction => <tr key={transaction?._id}>
                    <th scope="row">
                      <img className="avatar rounded-circle" alt="..." src={transaction?.photURL} />
                      <span className="mb-0 ml-2 text-sm">
                        {transaction?.name}
                      </span>
                    </th>
                    <td>
                      <img className="avatar rounded-circle" alt="..." src={transaction?.provider?.profilePhoto} />
                      <span className="ml-2 text-sm">
                        {transaction?.provider?.name}
                      </span>
                    </td>
                    <td>
                      <span color="" className="badge-dot mr-2">
                        {transaction?.amount}
                      </span>
                      <Button  
                      className="px-1"
                      color="secondary"
                      outline
                      type="button"
                      onClick={() => openModal(transaction)}>
                      <i className="fas fa-eye" />
                      </Button>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {time(transaction?.time)}
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {transaction?.trxID}
                      </Badge>
                    </td>
                  </tr>)
                }
              </tbody>
            </Table>
          </Card>
        </Container>
        {
          exampleModal && <Modals key={transactioDetails?._id} serviceFee={serviceFee} setExampleModal={setExampleModal} exampleModal={exampleModal} amount={amount}></Modals>
        }
      </>
    );
  }
}

export default Transactions