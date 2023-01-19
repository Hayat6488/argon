import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

import {
  Table
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, postDetails }) {

  console.log(postDetails)

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
          <div className="d-flex mb-1 justify-content-center">
            {/* <img src={userDetails.pic} alt="" /> */}
          </div>
        </div>
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Name: 
                    </span>
              </th>
              {/* <td>{userDetails.name}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Contact: 
                    </span>
              </th>
              {/* <td>{userDetails.contact}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    email: 
                    </span>
              </th>
              {/* <td>{userDetails.email}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Location: 
                    </span>
              </th>
              {/* <td>{userDetails.loca}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Business Type: 
                    </span>
              </th>
              {/* <td>{userDetails.type}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Skills
                    </span>
              </th>
              {/* <td>{userDetails.skill}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Service Type:
                    </span>
              </th>
              {/* <td>{userDetails.serviceType}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Past Job:
                    </span>
              </th>
              {/* <td>{userDetails.pastWork}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Past Job Category:
                    </span>
              </th>
              {/* <td>{userDetails.pastCategory}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Past Work Details:
                    </span>
              </th>
              {/* <td>{userDetails.des}</td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      External Link About
                    </span>
              </th>
              {/* <td><a href={userDetails.link}  target="_blank">Last Job</a></td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Photo ID: 
                    </span>
              </th>
              {/* <td><a href={userDetails.photoId} target="_blank">See Photo Id</a></td> */}
              {/* <td><a href={userDetails.photoId} target="_blank"><img className="w-50" src={userDetails.photoId} alt="" /></a></td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                      Trade ID:
                    </span>
              </th>
              {/* <td><a href={userDetails.tradeId} target="_blank">See Trade Id</a></td> */}
              {/* <td><a href={userDetails.tradeId} target="_blank"><img className="w-50" src={userDetails.tradeId} alt="" /></a></td> */}
            </tr>
            <tr>
              <th scope="row">
                    <span className="mb-0 text-sm">
                    Training Certificate: 
                    </span>
              </th>
              {/* <td><a href={userDetails.certificate} target="_blank">See Training Certificate</a></td> */}
              {/* <td><a href={userDetails.certificate} target="_blank"><img className="w-50" src={userDetails.certificate} alt="" /></a></td> */}
            </tr>
          </tbody>
        </Table>
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