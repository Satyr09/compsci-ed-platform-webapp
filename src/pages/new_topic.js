import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Popconfirm, notification, Alert } from 'antd';
import { QuestionCircleOutlined, RadiusUpleftOutlined } from '@ant-design/icons';

class NewTopic extends Component {

    state = {
        redirect: false,
        formRef : React.createRef(),
        Err:"",
    }

    constructor(props) {
        super(props);
        this.topicElRef = React.createRef();
        this.contentElRef = React.createRef();
    }
    

    topicHandler = (props) => {
        props.preventDefault();
        const topic = this.topicElRef.current.value;
        const content = this.contentElRef.current.value;
        
        let Err="";

        if(topic.trim().length === 0 || content.trim().length === 0){
            Err = <Alert message="The Above field cannot be left empty" type="warning" closable showIcon />;
        }

        this.setState({
            Err
        })

        if(this.state.Err){
            return;
        }
        
        const events = {topic, content};
        console.log(events);
        
        fetch("http://localhost:5000/topics", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            title: topic,
            content,
            author: "Jackson"
        })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));
        
    };

    onConfirm= () => {
        if(this.state.Err){
            return;
        }
        window.location.assign("/forum");
    }

    openNotification = placement => {
        notification.info({
          message: `Notification ${placement}`,
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          placement,
        });
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
                    <Link to="/topic_overview" className="breadcrumb-item">Forum name</Link>
                    <span className="breadcrumb-item active">Create new topic</span>
                </nav>
                <div className="row">
                    <div className="col-12">
                        <h2 className="h4 text-white bg-info mb-3 p-4 rounded">Create new topic</h2>
                    </div>
                </div>
                    <form className="mb-3">
                        <div className="form-group">
                            <label htmlFor="topic">Topic</label>
                            <input type="text" className="form-control" id="topic" ref={this.topicElRef} placeholder="Give your topic a title." required />
                            <div>{this.state.Err}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content:</label>
                            <textarea className="form-control" id="content" rows="10" placeholder="Write your content here." ref={this.contentElRef} required />
                            <div>{this.state.Err}</div>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" id="checkbox" value="notification" />
                                Notify me on repllies.
                            </label>
                        </div>
                        
                        <Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={this.onConfirm}>
                        <button type="submit" className="btn btn-primary" onClick={this.topicHandler} >Reply</button>
                        </Popconfirm>
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default NewTopic;