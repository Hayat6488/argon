import React from "react";
// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  UncontrolledTooltip
} from "reactstrap";
import { onSnapshot, collection, query, updateDoc, doc } from "firebase/firestore";
import db from "../../../../Firebase/firebase.config";
import SimpleHeader from "components/Headers/SimpleHeader.js";

  function Posts() {


      const collectionRef = collection(db, "posts");

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // const q = query();

  React.useEffect(() => {
    const unSub = onSnapshot(collectionRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ _id: doc.id, ...doc.data() });
      });
      setPosts(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, [collectionRef])

  if(loading){
    return <h1>Loading</h1>
  }

  else{
    return (
      <>
        <SimpleHeader name="Tables" parentName="Tables" />
        <Table className="align-items-center" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">POSTS</th>
              <th scope="col">Author</th>
              <th scope="col">Status</th>
              <th scope="col">Reviews</th>
              <th scope="col">Reports</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {/* <tr>
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
              <td>
                <Badge color="" className="badge-dot mr-4">
                  <i className="bg-warning" />
                  pending
                </Badge>
              </td>
              <td>
                <div className="avatar-group">
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="#pablo"
                    id="tooltip742438047"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      src={require("assets/img/theme/team-1.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip742438047"
                  >
                    Ryan Tompson
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="#pablo"
                    id="tooltip941738690"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      src={require("assets/img/theme/team-2.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip941738690"
                  >
                    Romina Hadid
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="#pablo"
                    id="tooltip804044742"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      src={require("assets/img/theme/team-3.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip804044742"
                  >
                    Alexander Smith
                  </UncontrolledTooltip>
                  <a
                    className="avatar avatar-sm rounded-circle"
                    href="#pablo"
                    id="tooltip996637554"
                    onClick={e => e.preventDefault()}
                  >
                    <img
                      alt="..."

                      src={require("assets/img/theme/team-4.jpg").default}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip996637554"
                  >
                    Jessica Doe
                  </UncontrolledTooltip>
                </div>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <span className="mr-2">60%</span>
                  <div>
                    <Progress
                      max="100"
                      value="60"
                      barClassName="bg-danger"
                    />
                  </div>
                </div>
              </td>
              <td className="text-right">
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Something else here
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr> */}
            {
              posts.map( post => <tr>
                <th scope="row">
                  <Media className="align-items-center">
                    {/* <a
                      className="avatar rounded-circle mr-3"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <img
                        alt="..."
                        src={require("assets/img/theme/bootstrap.jpg").default}
                      />
                    </a> */}
                    <Media>
                      <span className="mb-0 text-sm">
                        {post.des}
                      </span>
                    </Media>
                  </Media>
                </th>
                <td>{post.author}</td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    {post.status}
                  </Badge>
                </td>
                <td>
                  <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    {post.reports}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">60%</span>
                    <div>
                      <Progress
                        max="100"
                        value="60"
                        barClassName="bg-danger"
                      />
                    </div>
                  </div>
                </td>
                <td className="text-right">
                  <UncontrolledDropdown>
                    <DropdownToggle
                      className="btn-icon-only text-light"
                      href="#pablo"
                      role="button"
                      size="sm"
                      color=""
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else here
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr> )
            }
          </tbody>
        </Table>
      </>
    );
  }
  }

export default Posts