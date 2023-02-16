import NotifyContext from "context/NotifyContext";
import { storage } from "Firebase/firebase.config";
import { db } from "Firebase/firebase.config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";

function AddService({ addService, setAddService }) {
  const { Notify } = React.useContext(NotifyContext);

  // Edit any service from db function ***************

  const addDataToFireStore = async (service, url) => {
    const data = {
      title: service,
      imageURL: url,
    };
    try {
      const serviceRef = collection(db, "serviceCategory");
      await addDoc(serviceRef, data);
      Notify("success", `Service added successfully.`, "Add Service");
    } catch (error) {
      console.error(error);
    }
  };

  const AddService = async (event) => {
    event.preventDefault();
    const service = event.target.title.value;
    const image = event.target.image.files[0];
    try {
      const imageRef = ref(storage, `services/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDataToFireStore(service, url);
        });
      });
      event.target.reset();
      setAddService(!addService);
    } catch (error) {
      console.error(error);
    }
  };

  // Edit any service from db function ***************

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={addService}
        toggle={() => setAddService(!addService)}
      >
        <div className="modal-header w-100 d-flex p-4">
          <form className="w-100" onSubmit={(event) => AddService(event)}>
            <div className="d-flex flex-column align-items-center mb-3">
              <h2 className="modal-title mb-2 w-100" id="exampleModalLabel">
                Add Service:
              </h2>
              <input
                className="w-100 mb-2 pl-2"
                style={{ height: "43px" }}
                type="text"
                name="title"
                required
                id=""
              />
              <h2 className="modal-title mt-2 mb-2 w-100" id="exampleModalLabel">
                Upload Image:
              </h2>
              <div className="w-100 py-0 input-div">
              <i className="ni ni-image arrow-icon mr-1 input-icon" />
              <input
                className="custom-file-input w-100 m-0"
                style={{ height: "43px" }}
                id="customFileLang"
                type="file"
                name="image"
                lang="en"
                accept="image/*"
                required
              />
              </div>
              {/* <label for="image">
              <i className="ni ni-image arrow-icon mr-2" />
                Choose Photo
              </label> */}
            </div>
            <div className="d-flex py-0 justify-content-end">
              <Button className="w-100" color="primary" type="submit">
                Add Service
              </Button>
              <Button
                className="w-100"
                outlined
                color="secondary"
                data-dismiss="modal"
                type="button"
                onClick={() => setAddService(!addService)}
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
export default AddService;
