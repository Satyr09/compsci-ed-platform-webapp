import React from "react";
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

const ViewArticleView = props => {
  const onSubmit = async () => {
    console.log(codeValue);

    try {
      console.log("Posting code");
      const response = await fetch("http://localhost:8080/compile", {
        method: "POST",
        body: JSON.stringify({ code: codeValue }),
      });

      const data = await response.text();
      console.log(data);

      document.getElementById("outputArea").innerHTML = data;

      const finalResponse = await fetch("http://localhost:8080/run");
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
  // const articleArea = document.getElementById("articleContent");
  // const firstArticle = articles ? articles[0] : {};

  const [article, setArticle] = React.useState({});
  // React.useEffect(() => {
  //   const article = articles[0];
  //   const convertor = new showdown.Converter();

  //   const html = convertor.makeHtml(sampleMarkdownText);
  //   console.log(article);
  //   console.log(html);

  //   fetch(sampleMarkdownText)
  //     .then(response => {
  //       return response.text();
  //     })
  //     .then(text => {
  //       setArticle({
  //         ...article,
  //         markdown: marked(text),
  //       });
  //     });

  //   setArticle({
  //     title: article.title,
  //     author: article.author,
  //     date: article.date,
  //   });
  // }, [articleArea, firstArticle]);

  React.useEffect(() => {
    const qParams = queryString.parse(props.location.search);
    fetch(`http://localhost:5000/article/${qParams.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setArticle(data);
        document.getElementById("articleContent").innerHTML = draftToHtml(
          article.content,
        );
      })
      .catch(err => console.error(err));
  }, [article.content, article.markdown, props.location.search]);

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
