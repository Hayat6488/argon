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

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from "../../../Firebase/firebase.config";


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
import { NavLink, useHistory } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import NotifyContext from "context/NotifyContext";





// Handle Login

const Login = () => {
  
  const [admins, setAdmins] = React.useState([]);
  const { Notify } = React.useContext(NotifyContext);
  const [loading, setLoading] = React.useState(true);
  const history = useHistory();
  // const [user, setUser] = React.useState(null);
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

  const handleLogIn = async (event) => {
    event.preventDefault();
      const form = event.target;
      const password = form.password.value;
      const email = form.email.value;

    const res = admins.some((admin) => admin?.email === email);
    if(res){
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("user", auth.currentUser?.displayName);
        const docRef = doc(
          db,
          `usersList/admin/children/${auth.currentUser.uid}`
        );
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          history.push("/admin/dashboard");
          Notify("success", "Log in successful", "Log In")
        } else {
  
        Notify("error", "User Don't Exist", "Log In")
        }
      } catch (error) {
        Notify("error", error.message, "Log In")
      }
    }
    else{
      Notify("danger", "You are not a admin", "Log In")
    }
  }


  return (
    <>
      <AuthHeader
        title="Welcome!"
        // lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="d-flex justify-content-center">
                <img className="w-50 rounded-circle" src="https://firebasestorage.googleapis.com/v0/b/locality-tradesmen.appspot.com/o/logo.jpg?alt=media&token=01658242-f931-4a42-b70c-149bac12dc49" alt="" />
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h2>Sign in</h2>
                </div>
                <Form onSubmit={handleLogIn}>
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name='email'
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
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
                        type="password"
                        name='password'
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div> */}
                  <div className="text-center">
                    <Button className="my-4" color="info" type="submit">
                      Sign in
                    </Button>
                  </div>
                </Form>
                <span>Register as a <NavLink to="/auth/register">Admin</NavLink></span>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
