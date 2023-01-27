import NotifyContext from "context/NotifyContext";
import { db } from "Firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

import {
  Table
} from "reactstrap";

function Modals({ exampleModal, setExampleModal, serviceDetails }) {

  const { Notify } = React.useContext(NotifyContext);

  const editService = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    console.log(title);
    const updated = {
      title: title
    };
    const id = serviceDetails.id;
    try {
      const serviceRef = doc(db, `serviceCategory/${id}`);
      await updateDoc(serviceRef, updated);
      Notify("success", `Service title updated successfully.`, "Service Title Update");
      setExampleModal(!exampleModal);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => setExampleModal(!exampleModal)}
      >
        <div className="modal-header mt-2 d-flex px-4 pt-5">
          <form onSubmit={(event) => editService(event)}>
            <div className="d-flex align-items-center mb-2">
              <h2 className="modal-title mr-4" id="exampleModalLabel">
                Edit Service Title:
              </h2>
              <input type="text" name="title" required id="" />
            </div>
            <div className="d-flex justify-content-end">
            <Button color="info" type="submit">
              Update
            </Button>
            </div>
          </form>
        </div>

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