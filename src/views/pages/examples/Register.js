/* eslint-disable react-hooks/exhaustive-deps */
/*!

=========================================================
* Argon Dashboard PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
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
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import Loader from 'utility/Loader';
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "Firebase/firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "Firebase/firebase.config";
import { useHistory } from "react-router-dom";
import NotifyContext from "context/NotifyContext";

function Register() {

  const history = useHistory();

  const { Notify } = React.useContext(NotifyContext);
  const [admins, setAdmins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  const adminsRef = collection(db, "adminList");

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(adminsRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setAdmins(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  const register = async(email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(async(res) => {
        await updateProfile(auth.currentUser, {
          displayName: "Admin",
        });
        await setDoc(
          doc(db, `usersList/admin/children/${auth.currentUser.uid}`),
          {
            name: "Admin",
            email: email,
            uid: auth.currentUser.uid,
          }
        );
        history.push("/auth/login");
        Notify("success", "Singed up as a admin successful", "Sign up");
      })
    }
    catch (error) {
     console.log(error); 
    }
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const password = form.password.value;
    const email = form.email.value;
    const res = admins.some((admin) => admin?.email === email);
    if(res){
      register(email,password)
    }
    else{
      Notify("warning", "You are not eligible to be an admin", "Sign up")
    }

  };

  return (
    <>
    {
      loading ? 
      <Loader></Loader>
      :
      <>
      <AuthHeader
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardHeader className="bg-transparent pb-5">
              <div className="d-flex justify-content-center">
                <img className="w-50 rounded-circle" src="https://firebasestorage.googleapis.com/v0/b/locality-tradesmen.appspot.com/o/logo.jpg?alt=media&token=01658242-f931-4a42-b70c-149bac12dc49" alt="" />
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h2>Sign Up</h2>
                </div>
                <Form onSubmit={handleRegister}>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        required
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        name="password"
                        required
                        type="password"
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="submit">
                      Create account
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    }
    </>
  );
}

export default Register;
