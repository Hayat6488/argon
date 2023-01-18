import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";
import {
    Badge,
    ListGroupItem,
    ListGroup,
    Progress,
    Row,
    Col
  } from "reactstrap";

function ReportsModals({ setReportModal, reportModal, reports }) {
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={reportModal}
        toggle={() => setReportModal(!reportModal)}
      >
        <div className="modal-header mt-2">
          <h2 className="modal-title" id="exampleModalLabel">
            Tradesman Reports
          </h2>
        </div>
        <div className="mt-2">
        <ListGroup>
            {
                reports.map(report => <ListGroupItem>{reports}</ListGroupItem>)
            }
        </ListGroup>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setReportModal(!reportModal)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default ReportsModals;