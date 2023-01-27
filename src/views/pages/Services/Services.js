import React from "react";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardImg,
    CardImgOverlay,
    CardTitle,
    CardText,
    ListGroupItem,
    ListGroup,
    Row,
    Col
} from "reactstrap";
import SimpleHeader from "components/Headers/SimpleHeader";
import Category from "./Category/Category";
import SubCategory from "./SubCategory/SubCategory";

const Services = () => {

    const [toggle, setToggle] = React.useState(true);

    return (
        <>
            <SimpleHeader name="Services" />
            <Row className="mb-4 mt--6 mx-4">
            <Col lg="6">
                    <Card onClick={() => setToggle(true)} className="card-stats text-center">
                                <h2 className="my-2">Categories</h2>
                    </Card>
                </Col>
                <Col lg="6">
                    <Card onClick={() => setToggle(false)} className="card-stats text-center">
                                <h2 className="my-2">SubCategories</h2>
                    </Card>
                </Col>
            </Row>
            {
                toggle && <Category></Category>
            }

            {
                !toggle && <SubCategory></SubCategory>
            }
        </>
    );
}

export default Services;