import React from "react";
import { Editor } from "react-draft-wysiwyg";
import s from "./EditArticle.module.css";
import { Card, Button } from "antd";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Typography } from "antd";

const { Title } = Typography;

const EditorComponent = () => (
  <Editor
    wrapperClassName={s.editorWrapper}
    editorClassName={s.textAreaWrapper}
  />
);

const EditArticleView = props => {
  return (
    <Card className={s.wrapper} bodyStyle={{ padding: 45 }}>
      <div className={s.cardHeader}>Create or edit articles</div>
      <div className={s.cardSubHeader}>
        Use this editor to crate your new masterpiece.It will be visible to the
        public
      </div>

      <EditorComponent />

      <Button
        style={{ float: "right", marginTop: "20px" }}
        size="large"
        type="primary"
      >
        Submit article
      </Button>
    </Card>
  );
};

export default EditArticleView;
