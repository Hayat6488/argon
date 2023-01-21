import React from "react";
// reactstrap components
import {
  Card,
  Container,
  CardHeader,
  Row,
  Col,
  Media,
  Table,
  Spinner
} from "reactstrap";
import { collection, getDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";
import Loader from "utility/Loader";

function Posts() {

  const [exampleModal, setExampleModal] = React.useState(false)
  const [postDetails, setPostDetails] = React.useState(null)

  const openModal = (user) => {
    setExampleModal(!exampleModal);
    setPostDetails(user);
  }

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  const userRef = collection(db, "/usersList/user/children");

  React.useLayoutEffect(() => {
    const unSub = onSnapshot(userRef, (QuerySnapshot) => {
      const items = [];
      QuerySnapshot.forEach((doc) => {

        items.push({ uid: doc.id, ...doc.data() });
      });
      setUsers(items);
      setLoading(false);
    });

    return () => {
      unSub();
    };
  }, []);

  // console.log(users);

  React.useLayoutEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "jobPosts"));
      let dataList = [];

      querySnapshot.forEach(async (x) => {
        const authorId = x.data().uid;

        // console.log(authorId);

        const author = users?.find(user => user.uid === authorId);
        console.log(author);
        
        // const list = {
        //   id: x.id,
        //   ...x.data(),
        //   ...docSnap.data(),
        // };
        dataList.push({
          id: x.id,
          ...x.data(),
          ...author,
        });
        // console.log(dataList);
      });
      setPosts(dataList);
      setLoading(false)
    };
    getData();
  }, [users]);

  console.log(posts)

  if (loading) {
    return <Container>
      <Loader></Loader>
    </Container>
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
              </Row>
            </CardHeader>
            <h1>{posts?.length}</h1>

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
                        post?.name
                      }
                    </td>
                    {/* <td>
                    <img className="avatar rounded-circle" alt="..." src={require("assets/img/theme/team-4.jpg").default} />
                      {post.author}
                    </td> */}
                    <td>
                      {post?.address?.houseNumber}, {post?.address?.street}, {post?.address?.city}
                    </td>
                    <td>
                      {post?.notificationToken}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">{post?.description}</span>
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