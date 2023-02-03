import React from "react";
// reactstrap components
import {
  Card,
  Row,
  Col,
  Button,
  CardHeader,
  CardBody,
  Form,
  Input,
  Table,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "Firebase/firebase.config";
import NotifyContext from "context/NotifyContext";
import ReactBSAlert from "react-bootstrap-sweetalert";

const Admins = () => {
  const [alert, setAlert] = React.useState(false);
  const { Notify } = React.useContext(NotifyContext);
  const [loading, setLoading] = React.useState(true);
  const [admins, setAdmins] = React.useState([]);

  const adminsRef = collection(db, "adminList");

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(adminsRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setAdmins(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  const addAdmin = async (event, admins) => {
    event.preventDefault();
    const email = event.target.service.value;
    const res = admins.some((admin) => admin?.email === email);
    if (res) {
      Notify("warning", `Email is already in the admin list.`, "Add Admin");
    } else {
      const data = {
        email: email,
      };
      try {
        const serviceRef = collection(db, "adminList");
        await addDoc(serviceRef, data);
        Notify("success", `Email added successfully.`, "Add Admin");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteEmail = (admin) => {
    try {
      deleteDoc(doc(db, `adminList/${admin?.id}`));
      Notify(
        "danger",
        `Admin ${admin.email} deleted successfully.`,
        "Delete admin"
      );
      setAlert(false)
    } catch (error) {}
  }



  const deleteService = (admin) => {
    setAlert(
      <ReactBSAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Warning"
      onConfirm={() => deleteEmail(admin)}
      onCancel={() => setAlert(null)}
      showCancel
      confirmBtnBsStyle="danger"
      confirmBtnText="Yes"
      cancelBtnBsStyle="info"
      cancelBtnText="Cancel"
      btnSize=""
      >
        {`Sure you want to delete ${admin?.email} as a admin?`}
      </ReactBSAlert>
    );
  };

  return (
    <>
    {alert}
      <SimpleHeader name="Admins List" />
      <div className="mb-4 mt-4 mx-4">
        <>
          <div className="mx-6">
            <Card>
              <CardHeader>
                <h3 className="mb-0">ADD ADMIN</h3>
              </CardHeader>
              <CardBody>
                <div className="w-100 d-flex  justify-content-center">
                  <Form
                    className="w-75"
                    onSubmit={(event) => addAdmin(event, admins)}
                  >
                    <Row className="custom-file d-flex align-items-center">
                      <Col lg="12" className="d-flex">
                        <Input
                          className="w-100 py-3 mr-2"
                          placeholder="Enter Email"
                          type="text"
                          name="service"
                          id=""
                          required
                        />
                        <Button className="py-0" color="info" type="submit">
                          ADD
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="mb-0">Admins List</h3>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Admin Email</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr>
                        <th scope="row">
                          <span className="mb-0 text-sm">{admin?.email}</span>
                        </th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Button
                            onClick={() => deleteService(admin)}
                            color="danger"
                            type="button"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </>
      </div>
    </>
  );
};

export default Admins;
