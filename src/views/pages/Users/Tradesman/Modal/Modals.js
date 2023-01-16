import React from "react";
// reactstrap components
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

function Modals ({exampleModal, setExampleModal, userDetails}) {
  console.log(userDetails);
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            USER DETAILS
          </h5>
        </div>
        <div className="modal-body">{userDetails.name}</div>
        <div className="modal-body">{userDetails.email}</div>
        <div className="modal-body">{userDetails.status}</div>
        <div className="modal-body">{userDetails._id}</div>
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