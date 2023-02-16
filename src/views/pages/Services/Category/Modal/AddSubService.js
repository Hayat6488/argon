import NotifyContext from "context/NotifyContext";
import { storage } from "Firebase/firebase.config";
import { db } from "Firebase/firebase.config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
// reactstrap components
import {
  Button,
  Modal,
} from "reactstrap";

function AddSubService({ addSubServiceModal, setAddSubServiceModal, service}) {

  const { Notify } = React.useContext(NotifyContext);

  // Edit any service from db function ***************
  

    const addSubService = async(event) => {
        event.preventDefault();
        const subService = event.target.title.value;
        const data = {
            key: subService,
            value: subService
        }
        try {
            const subServiceRef = collection(db, `/serviceCategory/${service?.id}/sub/`);
            await addDoc(subServiceRef, data);
            Notify("success", `Service sub category Added successfully.`, "Add Service sub category");
            event.target.reset()
            setAddSubServiceModal(!addSubServiceModal)
        } catch (error) {
            console.error(error);
        }
    }
  

  // Edit any service from db function ***************

  
  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={addSubServiceModal}
        toggle={() => setAddSubServiceModal(!addSubServiceModal)}
      >
        <div className="modal-header w-100 d-flex p-4">
          <form className="w-100" onSubmit={(event) => addSubService(event)}>
            <div className="d-flex flex-column align-items-center mb-3">
              <h2 className="modal-title mb-2 w-100" id="exampleModalLabel">
                Add Service:
              </h2>
              <input className="w-100" style={{height: "43px"}}type="text" name="title" required id="" />
            </div>
            <div className="d-flex py-0 justify-content-end">
            <Button className="" color="primary" type="submit">
              Add Service
            </Button>
            <Button
            className="" outlined
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setAddSubServiceModal(!addSubServiceModal)}
          >
            Close
          </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
export default AddSubService;