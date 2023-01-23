import React from "react";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Input,
    ListGroup,
    ListGroupItem,
    Row,
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Loader from "utility/Loader";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "Firebase/firebase.config";
import NotifyContext from "context/NotifyContext";

function Services() {
    const { Notify } = React.useContext(NotifyContext);

    const [subServicesField, setSubServicesField] = React.useState(false);
    const [serviceField, setServiceField] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [services, setServices] = React.useState([]);
    const [subServices, setSubServices] = React.useState([]);

    const servicesRef = collection(db, "serviceCategory");

    const AddService = async (event) => {
        event.preventDefault();
        const service = event.target.service.value;
        const data = {
            title: service
        }
        try {
            const serviceRef = collection(db, "serviceCategory");
            await addDoc(serviceRef, data);
            Notify("success", `Service Added successfully.`, "Add Service");

        } catch (error) {
            console.error(error);
        }
    }

    const addSubServices = (service) => {
        setSubServicesField(true);
        setServiceField(service);
    }

    React.useLayoutEffect(() => {
        const unSub = onSnapshot(servicesRef, (QuerySnapshot) => {
            const items = [];
            QuerySnapshot.forEach((doc) => {

                items.push({ id: doc.id, ...doc.data() });
            });
            setServices(items);
            setLoading(false);
        });

        return () => {
            unSub();
        };
    }, [])

    const AddSubService = async (event) => {
        event.preventDefault();
        const subService = event.target.subService.value;
        const data = {
            key: subService,
            value: subService
        }
        try {
            const subServiceRef = collection(db, `/serviceCategory/${serviceField.id}/sub/`);
            await addDoc(subServiceRef, data);
            Notify("success", `Service Added successfully.`, "Add Service");

        } catch (error) {
            console.error(error);
        }
    }


    React.useLayoutEffect(() => {
        const servicesRef = collection(db, `serviceCategory/${serviceField.id}/sub`);
        const unSub = onSnapshot(servicesRef, (QuerySnapshot) => {
            const items = [];
            QuerySnapshot.forEach((doc) => {

                items.push({ id: doc.id, ...doc.data() });
            });
            setSubServices(items);
            setLoading(false);
        });

        return () => {
            unSub();
        };
    }, [serviceField])
    console.log(subServices);

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

                                <CardBody className="w-100">
                                    <Row className="w-100">
                                        <Card className="w-100">
                                            <CardBody>
                                                <div className="w-100">
                                                    <CardTitle className="text-uppercase text-muted mb-0 w-100">
                                                        <h1>Add Service</h1>
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
                                    <Row className="w-100">
                                        <Card className="w-100">
                                            <CardBody>
                                                <div className="">
                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                        <h1>Service Category</h1>
                                                    </CardTitle>
                                                    <ListGroup>
                                                        {
                                                            services.map(service => <ListGroupItem key={service?.id} onClick={() => addSubServices(service)} className="p-0 mb-2"><Button color="info" className="w-100">{service?.title}</Button></ListGroupItem>)
                                                        }
                                                    </ListGroup>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        {
                            subServicesField && <Col lg="6">
                            <Card className="card-stats">

                                <CardBody className="w-100">
                                <Row className="w-100">
                                        <Card className="w-100">
                                            <CardBody>
                                                <div className="w-100">
                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                        <h1>Add Service To {serviceField.title} Sub Category</h1>
                                                    </CardTitle>
                                                    <form onSubmit={(event) => AddSubService(event)}>
                                                        <div className="d-flex">
                                                            <Input className="w-100" required placeholder="" type="text" name="subService" bsSize="sm" id="" />
                                                            <Button className="py-0 rounded-end" color="danger" type="submit">ADD</Button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                    {
                                        subServices !== 0 && <Row>
                                        <Card className="w-100">
                                            <CardBody>
                                                <div className="w-100">
                                                    <CardTitle className="text-uppercase text-muted mb-0">
                                                        <h1>Service Sub Category</h1>
                                                    </CardTitle>
                                                    <ListGroup>
                                                        {
                                                            subServices.map(subService => <ListGroupItem key={subServices?.id} className="p-0 mb-2"><div className="w-100 bg-danger text-white text-center font-weight-bold py-2 rounded-sm" disabled>{subService?.value}</div></ListGroupItem>)
                                                        }
                                                    </ListGroup>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                        }
                    </Row>
                </Container>
            </>
        );
    }
}

export default Services