import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class NewTopic extends Component {

    state = {
        redirect: false
    }

    constructor(props) {
        super(props);
        this.topicElRef = React.createRef();
        this.commentElRef = React.createRef();
    }



    topicHandler = (props) => {
        props.preventDefault();
        const topic = this.topicElRef.current.value;
        const comment = this.commentElRef.current.value;
        
        if(topic.trim().length === 0 || comment.trim().length === 0){
            return window.location.assign("/forum");
        }

        const events = {topic, comment};
        console.log(events);
        
        fetch("http://localhost:5000/topics", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            title: topic,
            comment,
            author: "Jackson"
        })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));
        
        window.location.assign("/forum");
    };



    render() {

        return (
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
                    <Link to="/forum" className="breadcrumb-item">Board index</Link>
                    <Link to="/forum_category" className="breadcrumb-item">Forum category</Link>
                    <Link to="/topic_overview" className="breadcrumb-item">Forum name</Link>
                    <span className="breadcrumb-item active">Create new topic</span>
                </nav>
                <div className="row">
                    <div className="col-12">
                        <h2 className="h4 text-white bg-info mb-3 p-4 rounded">Create new topic</h2>
                    </div>
                    {/*<Demo />*/}
                </div>
                    <form className="mb-3">
                        <div className="form-group">
                            <label htmlFor="topic">Topic</label>
                            <input type="text" className="form-control" id="topic" ref={this.topicElRef} placeholder="Give your topic a title." required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="comment">Comment:</label>
                            <textarea className="form-control" id="comment" rows="10" placeholder="Write your comment here." ref={this.commentElRef} required />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" id="checkbox" value="notification" />
                                Notify me on repllies.
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.topicHandler} >Reply</button>
                        <button type="reset" className="btn btn-danger">Reset</button>
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default NewTopic;