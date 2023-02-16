/* eslint-disable react-hooks/exhaustive-deps */
import NotifyContext from "context/NotifyContext";
import { db } from "Firebase/firebase.config";
import { storage } from "Firebase/firebase.config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { Button, Card, CardBody, CardHeader, ListGroupItem } from "reactstrap";
import Loader from "utility/Loader";
import ReactBSAlert from "react-bootstrap-sweetalert";
import "./Accordion.css";
import EditSubServiceModals from "../Category/Modal/EditSubServiceModals";
import AddService from "../Category/Modal/AddService";
import AddSubService from "../Category/Modal/AddSubService";
import EditServiceModal from "./Modal/EditServiceModal";

const Accordion = ({ service }) => {
  const [accordion, setAccordion] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [subServices, setSubServices] = React.useState([]);
  const [serviceName, setServiceName] = React.useState(null);
  const [alert, setAlert] = React.useState(false);

  const { Notify } = React.useContext(NotifyContext);

  const [subService, setSubService] = React.useState(null);
  const [editSubServiceModal, setEditSubServiceModal] = React.useState(false);

  const openEditSubServiceModal = (subService) => {
    setEditSubServiceModal(!editSubServiceModal);
    setSubService(subService);
  };

  const [addSubServiceModal, setAddSubServiceModal] = React.useState(false);

  const openAddSubServiceModal = () => {
    setAddSubServiceModal(!addSubServiceModal);
  };

  const [serviceDetails, setServiceDetails] = React.useState(null);
  const [editServiceModal, setEditServiceModal] = React.useState(false);

  const openEditServiceModal = (service) => {
    setEditServiceModal(!editServiceModal)
    setServiceDetails(service)
  }

  React.useLayoutEffect(() => {
    const servicesRef = collection(db, `serviceCategory/${service?.id}/sub`);
    const unSub = onSnapshot(servicesRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setSubServices(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [serviceName]);

  const showSubServices = (service) => {
    setAccordion(!accordion);
    setServiceName(service);
  };

  const deleteService = (service) => {
    const id = service?.id;
    try {
      deleteDoc(doc(db, `serviceCategory/${id}`));
      Notify(
        "danger",
        `Service sub category ${service?.title} deleted successfully.`,
        "Delete service sub category"
      );
      setAlert(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCall = (service) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Warning"
        onConfirm={() => deleteService(service)}
        onCancel={() => setAlert(null)}
        showCancel
        confirmBtnBsStyle="danger"
        confirmBtnText="Yes"
        cancelBtnBsStyle="info"
        cancelBtnText="Cancel"
        btnSize=""
      >
        {`Sure you want to delete ${service?.title}?`}
      </ReactBSAlert>
    );
  };

  return (
      <div className={`category-accordion ${accordion ? "active" : ""}`}>
      {alert}
      <div className="mb-1 border rounded p-2 d-flex justify-content-between align-items-center accordion-header">
        <h4 className="mb-0">{service?.title}</h4>
        <div>
          <Button
            color="primary"
            type="button"
            onClick={() => openEditServiceModal(service)}
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteCall(service)}
            color="danger"
            type="button"
          >
            Delete
          </Button>
          <Button
            onClick={() => showSubServices(service)}
            color="secondary"
            type="button"
            className="py-1 px-2"
          >
            <i className="ni ni-bold-right arrow-icon" />
          </Button>
        </div>
      </div>
      <div className="accordion-body rounded-lg">
        {loading ? (
          <Loader></Loader>
        ) : (
          <div className="p-4">
            <Button
              color="info"
              onClick={() => openAddSubServiceModal()}
              type="button"
              className="mb-4"
            >
              Add Sub Service
            </Button>
            {subServices?.length === 0 ? (
              <div className="d-flex justify-content-center">
                <h3>No Data To Show</h3>
              </div>
            ) : (
              subServices.map((subService) => (
                <ListGroupItem
                  key={subService?.id}
                  className="list-group-item-action p-2 mb-3"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  tag="a"
                >
                  <div className="align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div className="col ml-2">
                          <h4 className="mb-0 text-sm">{subService?.key}</h4>
                        </div>
                      </div>
                      <div>
                        <Button
                          color="primary"
                          type="button"
                          onClick={() => openEditSubServiceModal(subService)}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteCall(subService)}
                          color="danger"
                          type="button"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </ListGroupItem>
              ))
            )}
            <div className="mt-1 d-flex justify-content-center"></div>
          </div>
        )}
      </div>
      {editSubServiceModal && (
        <EditSubServiceModals
          subService={subService}
          setEditSubServiceModal={setEditSubServiceModal}
          editSubServiceModal={editSubServiceModal}
          serviceName={serviceName}
        ></EditSubServiceModals>
      )}
      {addSubServiceModal && (
        <AddSubService
          addSubServiceModal={addSubServiceModal}
          setAddSubServiceModal={setAddSubServiceModal}
          service={service}
        ></AddSubService>
      )}
      {
        editServiceModal && <EditServiceModal editServiceModal={editServiceModal} serviceDetails={serviceDetails} setEditServiceModal={setEditServiceModal}></EditServiceModal>
      }
    </div>
  );
};

const Category = ({ setLoading, loading }) => {
  // All states *******************

  const { Notify } = React.useContext(NotifyContext);
  const servicesRef = collection(db, "serviceCategory");
  const [services, setServices] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [addService, setAddService] = React.useState(false);

  const openAddServiceModal = () => {
    setAddService(!addService);
  };

  // All states *******************

  // Delete any service from db function **************

  const deleteService = (service) => {
    try {
      deleteDoc(doc(db, `serviceCategory/${service?.id}`));
      Notify(
        "danger",
        `Service ${service.title} deleted successfully.`,
        "Delete Service"
      );

      setAlert(false);
    } catch (error) {}
  };

  const deleteCall = (service) => {
    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Warning"
        onConfirm={() => deleteService(service)}
        onCancel={() => setAlert(null)}
        showCancel
        confirmBtnBsStyle="danger"
        confirmBtnText="Yes"
        cancelBtnBsStyle="info"
        cancelBtnText="Cancel"
        btnSize=""
      >
        {`Sure you want to delete ${service?.title} as a admin?`}
      </ReactBSAlert>
    );
  };

  // Delete any service from db functiom **************

  // Fetch services data from db *************

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(servicesRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setServices(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // Fetch services data from db *************

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          {alert}
          <div className="">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <h3 className="mb-0">SERVICES CATEGORY</h3>
                <Button
                  onClick={() => openAddServiceModal()}
                  color="secondary"
                  type="button"
                >
                  Add Services
                </Button>
              </CardHeader>
              <CardBody>
                <div className="fixed-accordion">
                <div className="responsive-accordion">
                {services.map((service, i) => (
                  <Accordion key={i} service={service} />
                ))}
                </div>
                </div>
                {/* <ListGroup flush>
                                        {
                                            services.map(service =>
                                                <ListGroupItem key={service.id}
                                                    className="list-group-item-action"
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tag="a"
                                                >
                                                    <div className="align-items-center">
                                                        <div className='d-flex justify-content-between'>
                                                            <div className="d-flex align-items-center">

                                                                <img
                                                                    alt="..."
                                                                    className="avatar rounded-circle"
                                                                    src={service?.imageURL}
                                                                />

                                                                <div className="col ml-2">
                                                                    <h4 className="mb-0 text-sm">{service?.title}</h4>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Button color="primary" type="button"
                                                                onClick={() => openModal(service)}>
                                                                    Edit
                                                                </Button>
                                                                <Button onClick={() => deleteCall(service)} color="danger" type="button">
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroupItem>
                                            )
                                        }
                                    </ListGroup> */}
              </CardBody>
            </Card>
          </div>
        </>
      )}
      {addService && (
        <AddService
          addService={addService}
          setAddService={setAddService}
        ></AddService>
      )}
      {}
    </>
  );
};

export default Category;
