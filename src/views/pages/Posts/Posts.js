/* eslint-disable react-hooks/exhaustive-deps */
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
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import { collection, getDocs, onSnapshot} from "firebase/firestore";
import SimpleHeader from "components/Headers/SimpleHeader";
import Modals from "./Modal/Modals";
import { db } from "Firebase/firebase.config";
import Loader from "utility/Loader";

function Posts() {

  // All states and database paths ***************
  
  const [exampleModal, setExampleModal] = React.useState(false);
  const [postDetails, setPostDetails] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage, setPostsPerPage] = React.useState(10);
  const [search, setSearch] = React.useState([]);
  
  // All states and database paths ***************

  // Pagination setup******************
  
  
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFastPost = indexOfLastPost - postsPerPage;
  
  const currentPosts = posts.slice(indexOfFastPost, indexOfLastPost);
  
  const lastPageNumber = Math.ceil(posts.length / postsPerPage);
  
  
  // Pagination setup******************

  const openModal = (user) => {
    setExampleModal(!exampleModal);
    setPostDetails(user);
  }


  // Fetch Data from DB*************
  
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
  
  React.useLayoutEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "jobPosts"));
      let dataList = [];

      querySnapshot.forEach(async (x) => {
        const authorId = x.data().postedBy;
        
        const author = users?.find(user => user.uid === authorId);
        
        dataList.push({
          id: x.id,
          ...x.data(),
          ...author,
        });
      });
      setPosts(dataList);
      setLoading(false)
    };
    getData();
  }, [users]);

  const handleSearch = (event, postsData) => {
    const dataList = [];
    event.preventDefault();
    const email = event.target.search.value;
    setLoading(true);
    const data = postsData.find(post => post?.email === email);
      dataList.push(data);
      setSearch(dataList);
      setLoading(false);
  }
  
  
  // Fetch Data from DB*************
    if(search.length !== 0){
      return (
        <>
        {
          loading ? 
          <Loader></Loader>
          :
          <>
      {
        loading ? 
        <Loader></Loader>
        :
        <>
        <SimpleHeader name="Job Posts"/>
        <Container className="mt--6" fluid>
          <Card>
            <CardHeader className="border-0">
              <Row>
                <Col xs="6">
                  <h3 className="mb-0">JOB POSTS</h3>
                </Col>
                <Col className="text-right" xs="6">
                        <form onSubmit={(event) => handleSearch(event, posts)}>
                          <div className="d-flex justify-content-end">
                            <Input placeholder="Enter User Email" className="w-50" type="text" name="search" bsSize="sm" id="" />
                            <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                            <Button className="py-0" color="default" onClick={() => setSearch([])}>
                              View All
                            </Button>
                          </div>
                        </form>
                      </Col>
              </Row>
            </CardHeader>

            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">POSTED BY</th>
                  <th scope="col">address</th>
                  <th scope="col">Category</th>
                  <th scope="col">DESCRIPTION</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {
                  search.map(post => <tr key={post.id}>
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
                    <td>
                      {post?.address?.houseNumber}, {post?.address?.street}, {post?.address?.city}
                    </td>
                    <td>
                      {post?.category}
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
            <hr className="my-2" />
            <div className="d-flex px-2 w-100 justify-content-between align-items-center">
            <h4 className="text-muted">Showing {indexOfFastPost + 1} to {indexOfLastPost} from {posts.length} posts</h4>
              <Pagination>
                {
                  currentPage - 1 !== 0 && <>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        <i className="fa fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo"
                        onClick={e => {
                          e.preventDefault()
                          setCurrentPage(currentPage - 1)
                        }}
                      >
                        {currentPage - 1}
                      </PaginationLink>
                    </PaginationItem></>
                }
                <PaginationItem className="active">
                  <PaginationLink href="#pablo" onClick={e => {
                    e.preventDefault()
                    setCurrentPage(currentPage)
                  }}
                  >
                    {currentPage} <span className="sr-only">(current)</span>
                  </PaginationLink>
                </PaginationItem>
                {
                  currentPage < lastPageNumber &&
                  <>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                      }}
                      >
                        {currentPage + 1}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#pablo" onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage + 1)
                      }}
                      >
                        <i className="fa fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </>
                }
              </Pagination>
              <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                  <h4 className="mr-1 mb-0">Go to page: </h4>
                  <form  onSubmit={(event) => {
                    event.preventDefault();
                    setCurrentPage(parseInt(event.target.page.value));
                  }}>
                    <input className="py-0" style={{ width: "25%" }} type="text" name="page" id="" />
                    <Button className="py-0 px-2 ml-1" color="primary" type="submit">
                      Go
                    </Button>
                  </form>
                </div>
                <div className="d-flex align-items-center">
                  <h4>Posts per page</h4>
                  <UncontrolledDropdown className="py-2" size="sm" group>
                    <DropdownToggle caret color="secondary">
                      {postsPerPage}
                    </DropdownToggle>
                    <DropdownMenu className="py-2" >
                      <DropdownItem className="py-2" href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(10);
                        setCurrentPage(1);
                      }}>
                        10
                      </DropdownItem>
                      <DropdownItem href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(25);
                        setCurrentPage(1);
                      }}>
                        25
                      </DropdownItem>
                      <DropdownItem href="#pablo" onClick={e => {
                        e.preventDefault();
                        setPostsPerPage(50);
                        setCurrentPage(1);
                      }}>
                        50
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </div>
          </Card>
        </Container>
        {
          exampleModal && <Modals key={postDetails._id} setExampleModal={setExampleModal} exampleModal={exampleModal} postDetails={postDetails}></Modals>
        }
      </>
      }
      </>
        }
        </>
      )
    }

 else{
  return (
    <>
    {
      loading ? 
      <Loader></Loader>
      :
      <>
      <SimpleHeader name="Job Posts"/>
      <Container className="mt--6" fluid>
        <Card>
          <CardHeader className="border-0">
            <Row>
              <Col xs="6">
                <h3 className="mb-0">JOB POSTS</h3>
              </Col>
              <Col className="text-right" xs="6">
                      <form onSubmit={(event) => handleSearch(event, posts)}>
                        <div className="d-flex justify-content-end">
                          <Input placeholder="Enter User Email" className="w-50" type="text" name="search" bsSize="sm" id="" />
                          <Button className="py-0 rounded-end" color="info" type="submit">Search</Button>
                        </div>
                      </form>
                    </Col>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">POSTED BY</th>
                <th scope="col">address</th>
                <th scope="col">Category</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {
                currentPosts.map(post => <tr key={post.id}>
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
                  <td>
                    {post?.address?.houseNumber}, {post?.address?.street}, {post?.address?.city}
                  </td>
                  <td>
                    {post?.category}
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
          <hr className="my-2" />
          <div className="d-flex px-2 w-100 justify-content-between align-items-center">
          <h4 className="text-muted">Showing {indexOfFastPost + 1} to {indexOfLastPost} from {posts.length} posts</h4>
            <Pagination>
              {
                currentPage - 1 !== 0 && <>
                  <PaginationItem>
                    <PaginationLink
                      href="#pablo"
                      onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage - 1)
                      }}
                    >
                      <i className="fa fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo"
                      onClick={e => {
                        e.preventDefault()
                        setCurrentPage(currentPage - 1)
                      }}
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem></>
              }
              <PaginationItem className="active">
                <PaginationLink href="#pablo" onClick={e => {
                  e.preventDefault()
                  setCurrentPage(currentPage)
                }}
                >
                  {currentPage} <span className="sr-only">(current)</span>
                </PaginationLink>
              </PaginationItem>
              {
                currentPage < lastPageNumber &&
                <>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={e => {
                      e.preventDefault()
                      setCurrentPage(currentPage + 1)
                    }}
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={e => {
                      e.preventDefault()
                      setCurrentPage(currentPage + 1)
                    }}
                    >
                      <i className="fa fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </>
              }
            </Pagination>
            <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <h4 className="mr-1 mb-0">Go to page: </h4>
                <form  onSubmit={(event) => {
                  event.preventDefault();
                  setCurrentPage(parseInt(event.target.page.value));
                }}>
                  <input className="py-0" style={{ width: "25%" }} type="text" name="page" id="" />
                  <Button className="py-0 px-2 ml-1" color="primary" type="submit">
                    Go
                  </Button>
                </form>
              </div>
              <div className="d-flex align-items-center">
                <h4>Posts per page</h4>
                <UncontrolledDropdown className="py-2" size="sm" group>
                  <DropdownToggle caret color="secondary">
                    {postsPerPage}
                  </DropdownToggle>
                  <DropdownMenu className="py-2" >
                    <DropdownItem className="py-2" href="#pablo" onClick={e => {
                      e.preventDefault();
                      setPostsPerPage(10);
                      setCurrentPage(1);
                    }}>
                      10
                    </DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => {
                      e.preventDefault();
                      setPostsPerPage(25);
                      setCurrentPage(1);
                    }}>
                      25
                    </DropdownItem>
                    <DropdownItem href="#pablo" onClick={e => {
                      e.preventDefault();
                      setPostsPerPage(50);
                      setCurrentPage(1);
                    }}>
                      50
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </div>
          </div>
        </Card>
      </Container>
      {
        exampleModal && <Modals key={postDetails._id} setExampleModal={setExampleModal} exampleModal={exampleModal} postDetails={postDetails}></Modals>
      }
    </>
    }
    </>
  );
 }

}

export default Posts