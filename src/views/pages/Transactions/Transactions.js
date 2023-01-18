import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Media,
  Progress,
  Table
} from "reactstrap";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../../../Firebase/firebase.config";
import SimpleHeader from "components/Headers/SimpleHeader";

function Transactions() {


  const collectionRef = collection(db, "transactions");

  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  React.useEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ _id: doc.id, ...doc.data() });
      });
      setTransactions(items);
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
        <SimpleHeader name="Transactions" parentName="Transactions" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">POSTS</h3>
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
                  transactions.map(transaction => <tr>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            {transaction.user}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{transaction.tradesman}</td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {/* <i className="bg-warning" /> */}
                        {transaction.amount}
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {transaction.time}
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        {transaction.trxID}
                      </Badge>
                    </td>
                    <td className="table-actions">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
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
      </>
    );
  }
}

export default Transactions