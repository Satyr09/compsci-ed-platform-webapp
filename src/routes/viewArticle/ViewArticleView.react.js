import React, { useContext, useEffect } from "react";
import Editor from "../../components/Editor";
import s from "./ViewArticleView.module.css";
import { articles } from "../../testArticles";
import showdown from "showdown";
import { Divider, Card } from "antd";
import marked from "marked";
import { withRouter } from "react-router-dom";
import sampleMarkdownText from "../../testArticles/sampleMarkDown.md";
import queryString from "query-string";
import draftToHtml from "draftjs-to-html";
import { AuthContext } from "../../App";

const ViewArticleView = props => {
  const authData = useContext(AuthContext);

  const onSubmit = async () => {
    try {
      console.log("Posting code");
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        body: JSON.stringify({ code: codeValue }),
      });

      const data = await response.text();
      console.log(data);

      document.getElementById("outputArea").innerHTML = data;

      const finalResponse = await fetch("http://localhost:5000/run");
      const answer = await finalResponse.text();
      console.log(answer, " ", finalResponse);
      document.getElementById("outputArea").innerHTML = answer;
    } catch (e) {
      console.error(e);
    }
  };
  const [codeValue, setCode] = React.useState("");
  const memoizedEditor = React.useMemo(() => {
    return (
      <Editor
        onChange={value => setCode(value)}
        containerId={"editorWrapper"}
      />
    );
  }, []);
  const [article, setArticle] = React.useState({});

  React.useEffect(() => {
    const qParams = queryString.parse(props.location.search);
    if (authData && authData.accessToken) {
      fetch(`http://localhost:5000/article/${qParams.id}`, {
        method: "GET",
        withCredentials: true,
        mode: "cors",
        credentials: "include",
        headers: {
          "Authorization": `JWT ${authData.accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setArticle(data);        
        })
        .catch(err => console.error(err));
    }
  },[]);

  useEffect(()=>{
    if(article && article.content)
      document.getElementById("articleContent").innerHTML = draftToHtml(
        article.content,
      );
  },[article])
  return (
    <Card bodyStyle={{ padding: "25px" }} style={{ borderRadius: "5px" }}>
      <div className={s.pageWrapper}>
        <div className={s.resultsWrapper}>
          <div className={s.articleWrapper}>
            <div className={s.articleHeader}>{article.title}</div>
            <div className={s.articleMetadata}>
              <div className={s.articleAuthor}>{article.author}</div>
              <div className={s.articleDate}>{article.date}</div>
            </div>
            <Divider />

            <div className={s.articleContent} id="articleContent"></div>
          </div>
          <div className={s.submitButton} onClick={onSubmit}>
            {" "}
            Run Code{" "}
          </div>
          <div className={s.outputArea} id="outputArea"></div>
        </div>

        <div className={s.editorWrapper} id="editorWrapper">
          {memoizedEditor}
        </div>
      </div>
    </Card>
  );
};
export default withRouter(ViewArticleView);
