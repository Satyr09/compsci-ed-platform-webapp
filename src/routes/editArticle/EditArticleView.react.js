import React from "react";
import { Editor } from "react-draft-wysiwyg";
import s from "./EditArticle.module.css";
import { Card, Button, Input, Divider } from "antd";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Typography } from "antd";
import draftToHtml from "draftjs-to-html";

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

  React.useEffect(() => {
    console.log("whoosh");
  }, []);

  return (
    <Card className={s.wrapper} bodyStyle={{ padding: 45 }}>
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
