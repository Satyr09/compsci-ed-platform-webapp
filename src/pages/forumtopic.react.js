import React from 'react';
import { Link } from 'react-router-dom';
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { Table, Button } from 'antd';

const { Column  } = Table;

const Forumtopic = props => {

    const [Topic, setTopic] = React.useState({});

        React.useEffect(() => {
            const qParams = queryString.parse(props.location.search);
            fetch(`http://localhost:5000/topics/${qParams.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTopic(data);
                //document.getElementById("TopicContent").innerHTML = Topic.content;
            })
            .catch(err => console.error(err));
        }, []);

        const data = [
            {
                key: '1',
                author: Topic.author,
                message: Topic.title,
            },
            {
                key: Topic.id,
                author: Topic.date,
                message: Topic.content
            },
        ];

        return(
            <React.Fragment>
            <div>
               <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h1><Link to="/forum" className="navbar-brand">Forums</Link></h1>
                    <form className="form-inline">
                        <input type="text" className="form-control mr-3" placeholder="Search" />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
            </nav>
            <div className="container my-3">
                <nav className="breadcrumb">
                    <Link to="/forum" className="breadcrumb-item text-secondary">Board index</Link>
                    <span className="breadcrumb-item active">{Topic.title}</span>
                </nav>
                <div className="row bg-light">
                    <div className="col-12">
                        <h2 className="h4 text-white bg-secondary mb-0 p-4 rounded-top">{Topic.title}</h2>
                        <Table className="table table-striped table-bordered table-responsive-lg" dataSource = { data }>
                        <Column scope="col" className="thead-light" title="Author" dataIndex="author" key="author"/>
                        <Column scope="col" className="thead-light" title="message" dataIndex="message" key="message"/>
                        </Table>
                    </div>
                </div>

                <form className="mb-3">
                    <div className="form-group">
                        <label htmlFor="comment">Reply to this post:</label>
                        <textarea className="form-control" id="comment" rows="10"  placeholder="Write your comment here." required></textarea>
                    </div>
                    <Button className="btn btn-primary" >Reply</Button>
                    <button type="reset" className="btn btn-danger">Reset</button>
                </form>

            </div> 
            </div>
            </React.Fragment>
        );

}

export default withRouter(Forumtopic);