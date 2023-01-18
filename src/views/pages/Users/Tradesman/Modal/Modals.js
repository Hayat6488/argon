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

function Modals({ exampleModal, setExampleModal, userDetails }) {
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <div className="modal-header mt-2">
          <h2 className="modal-title" id="exampleModalLabel">
            TRADESMAN DETAILS
          </h2>
        </div>
        <div className="mt-2">
          <div className="d-flex justify-content-center">
            <img src={userDetails.pic} alt="" />
          </div>
          <div>
            <div className="modal- mb-2 ml-3"><h2>Name: {userDetails.name}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>email: {userDetails.email}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Location: {userDetails.loca}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Contact: {userDetails.contact}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Business Type: {userDetails.type}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Skills: {userDetails.skill}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Service Type: {userDetails.serviceType}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Work Experience: {userDetails.pastWork}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Work Category: {userDetails.pastCategory}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Work Description: {userDetails.des}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>External Links: {userDetails.link}</h2></div>
            <div className="modal- mb-2 ml-3"><h2>Photo ID: <a href={userDetails.photoId} target="_blank">See Photo Id</a></h2></div>
            <div className="modal- mb-2 ml-3"><h2>Trade ID: <a href={userDetails.tradeId} target="_blank">See Trade Id</a></h2></div>
            <div className="modal- mb-2 ml-3"><h2>Training Certificate: <a href={userDetails.certificate} target="_blank">See Training Certificate</a></h2></div>
          </div>
        </div>
        {/* <div className="mt-2">
          <div className="d-flex justify-content-center">
            <img src={userDetails.pic} alt="" />
          </div>
          <div className="modal-body">{userDetails.name}</div>
          <div className="modal-body">{userDetails.email}</div>
          <div className="modal-body">{userDetails.loca}</div>
          <div className="modal-body">{userDetails.contact}</div>
          <div className="modal-body">{userDetails.type}</div>
          <div className="modal-body">{userDetails.skill}</div>
          <div className="modal-body">{userDetails.serviceType}</div>
          <div className="modal-body">{userDetails.pastWork}</div>
          <div className="modal-body">{userDetails.pastCategory}</div>
          <div className="modal-body">{userDetails.des}</div>
          <div className="modal-body">{userDetails.link}</div>
          <div>
            <img src={userDetails.photoId} alt="" />
          </div>
          <div>
            <img src={userDetails.certificate} alt="" />
          </div>
          <div>
            <img src={userDetails.tradeId} alt="" />
          </div>
        </div> */}
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