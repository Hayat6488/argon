import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

import {
  Table
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
          <div className="d-flex mb-1 justify-content-center">
            <img className="avatar avatar-xl rounded-circle" src={userDetails.profilePhoto} alt="" />
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
              <td>{userDetails?.name}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Contact:
                </span>
              </th>
              <td>{userDetails?.contactInfo}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Email:
                </span>
              </th>
              <td>{userDetails?.email}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Location:
                </span>
              </th>
              <td>{userDetails?.businessLocation}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Business Type:
                </span>
              </th>
              <td>{userDetails?.businessType}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Job Category:
                </span>
              </th>
              <td>{userDetails?.category}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Skills:
                </span>
              </th>
              <td>{userDetails?.specialty}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Past Job Experience:
                </span>
              </th>
              <td>{userDetails?.workTitle}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Past Work Details:
                </span>
              </th>
              <td>{userDetails?.description}</td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  External Link About
                </span>
              </th>
              <td><a href={userDetails?.workLink} target="_blank">{userDetails?.workLink}</a></td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Photo ID:
                </span>
              </th>
              {/* <td><a href={userDetails.photoId} target="_blank">See Photo Id</a></td> */}
              <td><a href={userDetails?.photoID} target="_blank"><img className="w-50" src={userDetails?.photoID} alt="" /></a></td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Provincial/Federal Trade Certificate:
                </span>
              </th>
              {/* <td><a href={userDetails.tradeId} target="_blank">See Trade Id</a></td> */}
              <td><a href={userDetails?.authorizingProof} target="_blank"><img className="w-50" src={userDetails?.authorizingProof} alt="" /></a></td>
            </tr>
            <tr>
              <th scope="row">
                <span className="mb-0 text-sm">
                  Provincial/Federal Training Certificate:
                </span>
              </th>
              {/* <td><a href={userDetails.certificate} target="_blank">See Training Certificate</a></td> */}
              <td><a href={userDetails?.certificate} target="_blank"><img className="w-50" src={userDetails?.certificate} alt="" /></a></td>
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



{/* <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Project</th>
              <th scope="col">Budget</th>
              <th scope="col">Status</th>
              <th scope="col">Users</th>
              <th scope="col">Completion</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <a
                    className="avatar rounded-circle mr-3"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."
                      src={require("assets/img/theme/bootstrap.jpg").default}
                    />
                  </a>
                  <Media>
                    <span className="mb-0 text-sm">
                      Argon Design System
                    </span>
                  </Media>
                </Media>
              </th>
              <td>$2,500 USD</td>
            </tr>
          </tbody>
        </Table> */}