import React from "react";
// reactstrap components
import {
    Card,
    Row,
    Col,
    CardBody,
    Container,
    Button
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";

const Services = () => {

    const [loading, setLoading] = React.useState(true);

    const [toggle, setToggle] = React.useState(true);

    return (
        <>
            <SimpleHeader name="Services" />
            <Container  className="mt--6" fluid>
            <Card>
                <CardBody className="py-2">
                <Row className="mx-4">
            <Col lg="6">
                    <Button color={toggle ? "primary" : ""} onClick={() => setToggle(true)} className="card-stats text-center mb-0 my-1 py-1 w-100">
                                <h2 className={toggle ? "my-1 text-white" : "my-1"}>Categories</h2>
                    </Button>
                </Col>
                <Col lg="6">
                    <Button color={!toggle ? "primary" : ""} onClick={() => setToggle(false)} className="card-stats text-center mb-0 my-1 py-1 w-100">
                                <h2 className={!toggle ? "my-1 text-white" : "my-1"}>SubCategories</h2>
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
            <Col lg="12">
            {
                toggle && <Category loading={loading} setLoading={setLoading}></Category>
            }

            {
                !toggle && <SubCategory setLoading={setLoading}></SubCategory>
            }
            </Col>
            </Row>
                </CardBody>
            </Card>
            </Container>
        </>
    );
}

export default Services;