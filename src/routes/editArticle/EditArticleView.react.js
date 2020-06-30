import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import s from "./EditArticle.module.css";
import { Card, Button, Input, Divider, Select } from "antd";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Typography } from "antd";
import draftToHtml from "draftjs-to-html";
import writeIcon from "../../images/write.svg";

import { convertFromRaw } from "draft-js";

const { Title } = Typography;

const EditArticleView = props => {
  const fakeContent = {
    entityMap: {},
    blocks: [
      {
        key: "637gr",
        text: "Initialized from content state.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };

  const [contentState, setContentState] = React.useState();
  const [title, setTitle] = React.useState();
  const [tags, setTags] = useState(null);

  const handleArticleSubmit = e => {
    console.log("POSTING.....");
    fetch("http://localhost:5000/article", {
      method: "POST",
      body: JSON.stringify({
        title,
        content: contentState,
        author: "Lambda Phi",
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        window.location.reload();
      })
      .catch(err => console.error(err));

    console.log(draftToHtml(contentState));
  };
  const contentStateChangeHandler = contentState => {
    setContentState(contentState);
  };
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };
  const handleTagChange = e => {
    setTags(tags);
  }
  const { Option } = Select;
  React.useEffect(() => {
    console.log("whoosh");
  }, []);

  return (
    <Card className={s.wrapper} bodyStyle={{ padding: 45 }}>
       <div style={{ position: "absolute", top: "-100px", left: "-50px" }}>
          <img style={{ height: "250px", width: "250px" }} src={writeIcon} />
        </div>
      <div className={s.cardHeader}>Create or edit articles</div>
      <div className={s.cardSubHeader}>
        Use this editor to crate your new masterpiece.It will be visible to the
        public
      </div>

      <Input
        onChange={handleTitleChange}
        value={title}
        placeholder="Title..."
      />

      <Divider />
      <Editor
        wrapperClassName={s.editorWrapper}
        editorClassName={s.textAreaWrapper}
        onContentStateChange={contentStateChangeHandler}
        defaultContentState={fakeContent}
      />
      <Select
        mode="multiple"
        placeholder="Add tags (optional)"
        defaultValue={[]}
        style={{ width: "100%",margin:"30px auto" }}
        onChange={handleTagChange}
      >
        <Option value="dynamicProgramming">Dynamic Programming</Option>
        <Option value="dfs">DFS</Option>
        <Option value="bfs" >
          BFS
      </Option>
        <Option value="linkedList">Linked List</Option>
        <Option value="stack">Stack</Option>
        <Option value="queue">Queue</Option>
        <Option value="binarySearch">Binary Search</Option>
        <Option value="dsa">Data Structures And Algorithms</Option>
        <Option value="development">Development</Option>

      </Select>
      <Button
        style={{ float: "right", marginTop: "20px" }}
        size="large"
        type="primary"
        onClick={handleArticleSubmit}
      >
        Submit article
      </Button>
    </Card>
  );
};

export default EditArticleView;
