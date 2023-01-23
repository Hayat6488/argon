import React from "react";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Container,
    Input,
    Row,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Loader from "utility/Loader";
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "Firebase/firebase.config";
import NotifyContext from "context/NotifyContext";

function Services() {
    const { Notify } = React.useContext(NotifyContext);

    // const [update, setUpdate] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    // const [serviceFee, setServiceFee] = React.useState([]);

    // const collectionRef = collection(db, "serviceFee");

    // React.useLayoutEffect(() => {
    //     const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
    //         const items = [];
    //         QuerySnapshot.forEach((doc) => {

    //             items.push({ id: doc.id, ...doc.data() });
    //         });
    //         setServiceFee(items);
    //         setLoading(false);
    //     });

    //     return () => {
    //         unSub();
    //     };
    // }, [])

    const AddService = async (event) => {
        event.preventDefault();
        const service = event.target.service.value;
        const data = {
            title: service
        }
        console.log(service);
        try {
            const serviceRef = collection(db, "serviceCategory");
            // await addDoc(serviceRef, data);
            await addDoc(serviceRef, data);
            // setUpdate(!update);
            Notify("success", `Service Added successfully.`, "Service Add");

        } catch (error) {
            console.error(error);
        }
    }

    // console.log(update);

    if (loading) {
        return <Container>
            <Loader></Loader>
        </Container>
    }


    else {
        return (
            <>
                <SimpleHeader name="Services" />
                <Container className="mt--6" fluid>
                    <Row className="mb-4">
                        <Col lg="6">
                            <Card className="card-stats">

                                <CardBody>
                                    <Row>
                                        <Card>
                                            <CardBody>
                                                    <div className="">
                                                        <CardTitle className="text-uppercase text-muted mb-0">
                                                            Add Service Category
                                                        </CardTitle>
                                                        <form onSubmit={(event) => AddService(event)}>
                                                            <div className="d-flex">
                                                                <Input className="w-100" required placeholder="" type="text" name="service" bsSize="sm" id="" />
                                                                <Button className="py-0 rounded-end" color="info" type="submit">ADD</Button>
                                                            </div>
                                                        </form>
                                                    </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="6">
                            <Card className="card-stats">

                                <CardBody>
                                    <Row>
                                        <div className="col">
                                            <CardTitle className="text-uppercase text-muted mb-0">
                                                New users
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0">2,356</span>
                                        </div>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-orange text-white rounded-circle shadow">
                                                <i className="ni ni-chart-pie-35" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2">
                                            <i className="fa fa-arrow-up" />
                                            3.48%
                                        </span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Services