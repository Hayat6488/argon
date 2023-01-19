import React from "react";
// reactstrap components
import {
  Badge,
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Media,
  Progress,
  Table
} from "reactstrap";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";

function Posts() {

  const [exampleModal, setExampleModal] = React.useState(false)
  const [postDetails, setPostDetails] = React.useState(null)

  const openModal = (user) => {
    setExampleModal(!exampleModal);
    setPostDetails(user);
  }

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "jobPosts"));
      let dataList = [];

      querySnapshot.forEach(async (x) => {
        const authorId = x.data().uid;

        const docRef = doc(db, `usersList/user/children/${authorId}`);
        const docSnap = await getDoc(docRef);
        const list = {
          id: x.id,
          ...x.data(),
          ...docSnap.data(),
        };
        dataList.push({
          id: x.id,
          ...x.data(),
          ...docSnap.data(),
        });
      });
      setPosts(dataList);
      setLoading(false)
    };
    getData();
  }, []);

  console.log(posts)

  if (loading) {
    return <h1>Loading</h1>
  }

  else {
    return (
      <>
        <SimpleHeader name="Job Posts" parentName="Job Posts" />
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">JOB POSTS</h3>
                </Col>
                {/* <Col className="text-right" xs="6">
                  <Button
                    className="btn-neutral btn-round btn-icon"
                    color="default"
                    href="#pablo"
                    id="tooltip969372949"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-user-edit" />
                    </span>
                    <span className="btn-inner--text">Export</span>
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip969372949">
                    Edit product
                  </UncontrolledTooltip>
                </Col> */}
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">address</th>
                  <th scope="col">Category</th>
                  <th scope="col">DESCRIPTION</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  posts.map(post => <tr key={post.id}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            {post?.title}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>
                      {

                      }
                    </td>
                    {/* <td>
                    <img className="avatar rounded-circle" alt="..." src={require("assets/img/theme/team-4.jpg").default} />
                      {post.author}
                    </td> */}
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        {post.category}
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
                    <td className="table-actions">
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => openModal(post)}
                      >
                        <span aria-hidden={true}><i className="fas fa-eye" /></span>
                      </button>
                    </td>
                    {/* <td className="text-right">
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
                </td> */}
                  </tr>)
                }
              </tbody>
            </Table>
          </Card>
        </Container>
        {
          exampleModal && <Modals key={postDetails._id} setExampleModal={setExampleModal} exampleModal={exampleModal} postDetails={postDetails}></Modals>
        }
      </>
    );
  }
}

export default Posts