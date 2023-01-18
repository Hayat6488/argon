import React from "react";
// reactstrap components

import {
  Badge,
  Container,
} from "reactstrap";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, bookingsDetails }) {

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Booking Timeline</h3>
              </CardHeader>
              <CardBody>
                <div
                  className="timeline timeline-one-side"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  {
                    bookingsDetails.map(step => <div className="timeline-block">
                    <span className="timeline-step badge-success">
                      <i className="ni ni-bell-55" />
                    </span>
                    <div className="timeline-content">
                      <small className="text-muted font-weight-bold">
                        10:30 AM
                      </small>
                      <h5 className="mt-3 mb-0">{step}</h5>
                    </div>
                  </div>)
                  }
                  {/* <div className="timeline-block">
                    <span className="timeline-step badge-success">
                      <i className="ni ni-bell-55" />
                    </span>
                    <div className="timeline-content">
                      <small className="text-muted font-weight-bold">
                        10:30 AM
                      </small>
                      <h5 className="mt-3 mb-0">New message</h5>
                       {
                        bookingsDetails.map(step => <p className="text-sm mt-1 mb-0">
                          {step}
                        </p>)
                       }
                    </div>
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setExampleModal(!exampleModal)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default Modals;