import React from "react";
import s from "./ForumDashboard.module.css";
import { Row, Col, Card, Tag, Select, Pagination, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { withRouter, NavLink } from "react-router-dom";


const tags = [
  <Tag color="green">Genral</Tag>,
  <Tag color="red">Contest</Tag>,
  <Tag color="volcano">Query</Tag>,

  <Tag color="orange">Announcement</Tag>,
  <Tag color="gold">Challenge</Tag>,
  <Tag color="magenta">Cook Off</Tag>,
];

const ForumDashboard = props => {
  const [posts, setPosts] = React.useState();

  React.useEffect(() => {
    console.log("FETCHING");
    fetch("http://localhost:5000/topics")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(
          data
            .map(post => {
              return {
                ...post,
                ratings: (Math.random() * (5 - 1) + 1).toFixed(1),
                date: post.date.split("T")[0],
              };
            })
            .sort((a, b) => b.ratings.localeCompare(a.ratings)),
        );
      })
      .catch(err => console.error(err));
  }, []);

  const [filterText, setFilterText] = React.useState();

  const handleFilter = e => {
    setFilterText(e.target.value);
  };

  const handleSort = value => {
    const sortedPosts = [...posts].sort((a, b) =>
      b[value].localeCompare(a[value]),
    );
    setPosts(sortedPosts);
  };

  const [Current,setCurrent] = React.useState(3);

  const onChange = page => {
      console.log(page);
      setCurrent({
        Current: page,
      });
    };  
  const { Option } = Select;
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <h1><NavLink to="/forum" className="navbar-brand">Forums</NavLink></h1>
          <form className="form-inline">
            <input type="text" className="form-control mr-3" placeholder="Search"  value={filterText || ""} onChange={e => handleFilter(e)} /> 
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </nav>
      <div className="container my-3">
        <nav className="breadcrumb">
          <span className="breadcrumb-item active">Board index</span>
        </nav>
      <div className="row">
      <div className="col-12 col-xl-9">
        <Card bodyStyle={{ padding: 15 }} className={s.bodyCard}>
          {posts &&
            posts
              .filter(post =>
                post.title
                  .toLowerCase()
                  .includes((filterText || "").toLowerCase()),
              )
              .map((post, idx) => {
                //const avatarIdx = post.id % avatars.length;
                return (
                  <div
                    className={s.postContainer}
                    onClick={e => props.history.push(`/topic?id=${post._id}`)}
                  >
                    <Row className={s.postRow}>
                    <Col
                      sm={{ span: 2, offset: 0 }}
                      xs={{ span: 24, offset: 0 }}
                    >
                      <Avatar size={64} icon={<UserOutlined />} />
                    </Col>

                      <Col
                        sm={{ span: 9, offset: 1 }}
                        xs={{ span: 24, offset: 0 }}
                      >
                        <div className={s.titleWrapper}>{post.title}</div>
                        <div
                          style={{
                            color: "#b4acac",
                            fontSize: "12px",
                            marginBottom: 5,
                          }}
                        >
                          {post.author || "Cormen Stein"}
                        </div>
                          <span style={{ fontWeight: 500 }}>Tags : </span>
                          <span>
                          <span className={s.tagSpan}>
                            {tags[(idx + 2) % tags.length]}
                        </span>
                          <span className={s.tagSpan}>{tags[idx]}</span>
                        </span>
                      </Col>

                      <Col
                        sm={{ span: 2, offset: 1 }}
                        xs={{ span: 24, offset: 0 }}
                        style={{ marginTop: 10 }}
                      >
                      <div className={s.metaDataWrapper}>
                          <div className={s.ratingsWrapper}>
                            <span >{post.author}</span>
                          </div>
                        </div>
                      </Col>

                      <Col
                        sm={{ span: 3, offset: 1 }}
                        xs={{ span: 24, offset: 0 }}
                      >
                        <div className={s.metaDataWrapper}>
                          <div className={s.ratingsWrapper}>
                            <span className={s.ratingsText}>5 Replies</span>
                          </div>
                        </div>
                      </Col>

                      <Col
                        sm={{ span: 4, offset: 1 }}
                        xs={{ span: 24, offset: 0 }}
                      >
                        <div className={s.dateWrapper}>
                          <div className={s.createdText}>Created :</div>
                          <span style={{ width: "7.5px" }}></span>
                          {post.date}
                        </div>
                      </Col>                      
                    </Row>
                  </div>
                );
              })}
        </Card><br/>
        <div className="mb-3 clearfix">
            <nav aria-label="Navigate post pages" className="float-lg-right">
              <Pagination current={Current} onChange={onChange} total={50} />
            </nav>
        </div>        
        <br/>        
        <NavLink to="/new_topic" className="btn btn-lg btn-primary">New topic</NavLink>
        </div>

        <div className="col-12 col-xl-3">
          <aside>
            <div className="row">
              <div className="col-12 col-sm-6 col-xl-12">
                <Card  className="card" title="Member online" style={{ width: 300 }}>
                  <p><a href="#0">Forum member name</a></p>
                  <p><a href="#0">Forum member name</a></p>
                  <p><a href="#0">Forum member name</a></p>
                  <p><a href="#0">Forum member name</a></p>
                </Card>
              </div>
              <div className="col-12 col-sm-6 col-xl-12">
                <Card  className="card" title="Forum stastistics" style={{ width: 300 }}>
                  <p>Total forums: 10</p>
                  <p>Total Topics: 7</p>
                  <p>Total Topics: 3</p>
                </Card>
              </div>
            </div>
          </aside>
          </div>            
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ForumDashboard);
