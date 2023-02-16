import React from "react";
// reactstrap components
import {
    Card,
    Row,
    Col,
    CardBody,
    Container
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Category from "./Category/Category";

const Services = () => {

    const [loading, setLoading] = React.useState(true);

    return (
        <>
            <SimpleHeader name="Services" />
            <Container  className="mt--6" fluid>
            <Card>
                <CardBody className="py-2">
            <Row className="mt-4">
            <Col lg="12">
                <Category loading={loading} setLoading={setLoading}></Category>
            </Col>
            </Row>
                </CardBody>
            </Card>
            </Container>
        </>
    );
}

export default Services;