import React from "react";
// reactstrap components
import {
    Card,
    Row,
    Col,
    CardBody
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
            {/* <Row className="mb-4 mt--6 mx-4">
            <Col lg="6">
                    <Card color="primary text-white" onClick={() => setToggle(true)} className="card-stats text-center">
                                <h2 className="my-2">Categories</h2>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card onClick={() => setToggle(false)} className="card-stats text-center">
                                <h2 className="my-2">SubCategories</h2>
                    </Card>
                </Col>
            </Row> */}
            <Card className="mt-6">
                <CardBody className="py-2">
                <Row className="mx-4">
            <Col lg="6">
                    <Card color={toggle ? "info" : ""} onClick={() => setToggle(true)} className="card-stats text-center mb-0 my-1">
                                <h2 className="my-1">Categories</h2>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card color={!toggle ? "info" : ""} onClick={() => setToggle(false)} className="card-stats text-center mb-0 my-1">
                                <h2 className="my-1">SubCategories</h2>
                    </Card>
                </Col>
            </Row>
                </CardBody>
            </Card>
            {
                toggle && <Category loading={loading} setLoading={setLoading}></Category>
            }

            {
                !toggle && <SubCategory setLoading={setLoading}></SubCategory>
            }
        </>
    );
}

export default Services;