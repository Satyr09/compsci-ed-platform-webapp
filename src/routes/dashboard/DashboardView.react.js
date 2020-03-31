import React from "react";
import { Editor } from "react-draft-wysiwyg";
import s from "./DashboardView.module.css";
import { Row, Col, Card, Input, Badge, Select, Divider } from "antd";
import Icon, { StarFilled } from "@ant-design/icons";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Typography } from "antd";
import BookmarkIcon from "../../bookmark.png";
import avatar1 from "../../avatars/avatar1.png";
import avatar2 from "../../avatars/avatar2.png";
import avatar3 from "../../avatars/avatar3.png";
import avatar4 from "../../avatars/avatar4.png";
import avatar5 from "../../avatars/avatar5.png";
import avatar6 from "../../avatars/avatar6.png";

const { Title } = Typography;
const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
const tags = [
  "Arrays",
  "Stack",
  "Trie",

  "Dynamic Programming",
  "Sorting",
  "Segment Tree",
];
const colors = ["#f9e26e", "orange", "0a30760", "purple", "red", "brown"];
const DashboardView = props => {
  const [posts, setPosts] = React.useState();

  React.useEffect(() => {
    console.log("FETCHING");
    fetch("http://localhost:5000/article")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(
          data
            .map(post => {
              return {
                ...post,
                ratings: (Math.random() * (5 - 1) + 1).toFixed(1),
              };
            })
            .sort((a, b) => b.ratings.localeCompare(a.ratings)),
        );
      })
      .catch(err => console.error(err));
  }, []);

  const Bookmark = () => (
    <img src={BookmarkIcon} alt="bookmark" style={{ height: "30px" }} />
  );

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

  const { Option } = Select;
  return (
    <React.Fragment>
      <Card bodyStyle={{ padding: 15 }} className={s.bodyCard}>
        <div className={s.header}>Articles </div>
        <div className={s.subHeader}>
          Browse a curated catalogue of technical articles
        </div>
        <div className={`dashboardButtonsWrapper ${s.buttonsWrapper}`}>
          <Row>
            <Col sm={{ span: 10, offset: 0 }} xs={{ span: 24, offset: 0 }}>
              <div className={s.filterInput}>
                <Input
                  className={s.filterInput}
                  placeholder="Filter ..."
                  value={filterText || ""}
                  onChange={e => handleFilter(e)}
                />
              </div>
            </Col>
            <Col sm={{ span: 10, offset: 4 }} xs={{ span: 24, offset: 0 }}>
              <div style={{ float: "right" }}>
                Sort by : &nbsp;
                <Select
                  defaultValue="ratings"
                  style={{ width: 200 }}
                  onChange={handleSort}
                >
                  <Option value="ratings">Ratings</Option>
                  <Option value="title">Title</Option>
                  <Option value="date">Date Created</Option>
                </Select>
              </div>
            </Col>
          </Row>
        </div>

        {posts &&
          posts
            .filter(post =>
              post.title
                .toLowerCase()
                .includes((filterText || "").toLowerCase()),
            )
            .map(post => {
              const avatarIdx = post.id % avatars.length;
              return (
                <div
                  className={s.postContainer}
                  onClick={e => window.location.replace(`/view?id=${post._id}`)}
                >
                  <Row className={s.postRow}>
                    <Col
                      sm={{ span: 3, offset: 0 }}
                      xs={{ span: 24, offset: 0 }}
                    >
                      <div
                        style={{
                          width: 65,
                          background: "yellow",
                          height: 65,
                          borderRadius: "50%",
                          textAlign: "center",
                          alignItems: "center",
                          padding: "5%",
                        }}
                      >
                        <img
                          src={avatars[post.id % avatars.length]}
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                          alt="avatar"
                        />
                      </div>
                    </Col>

                    <Col
                      sm={{ span: 10, offset: 1 }}
                      xs={{ span: 24, offset: 0 }}
                    >
                      <div className={s.titleWrapper}>{post.title}</div>
                      <div
                        style={{
                          color: "#b4acac",
                          fontSize: "12px",
                          marginBottom: 10,
                        }}
                      >
                        {post.author || "Cormen Stein"}
                      </div>

                      <span style={{ fontWeight: 500 }}>Topics : </span>
                      <span style={{ color: "#9c9797", fontSize: 13 }}>
                        {tags[(avatarIdx + 2) % tags.length]} ,{" "}
                        {tags[avatarIdx]}
                      </span>
                    </Col>

                    <Col
                      sm={{ span: 6, offset: 1 }}
                      xs={{ span: 24, offset: 0 }}
                    >
                      <div className={s.metaDataWrapper}>
                        <div className={s.ratingsWrapper}>
                          <span className={s.ratingsText}>{post.ratings}</span>
                          <span style={{ color: "#f9e26e" }}>
                            <StarFilled />
                          </span>
                        </div>
                        <div className={s.dateWrapper}>
                          Created : <span style={{ width: "7.5px" }}></span>
                          {post.date}
                        </div>
                      </div>
                    </Col>

                    <Col
                      sm={{ span: 2, offset: 1 }}
                      xs={{ span: 24, offset: 0 }}
                      style={{ marginTop: 10 }}
                    >
                      <Icon component={Bookmark} />
                    </Col>
                  </Row>
                  <Divider />
                </div>
              );
            })}
      </Card>
    </React.Fragment>
  );
};

export default DashboardView;
