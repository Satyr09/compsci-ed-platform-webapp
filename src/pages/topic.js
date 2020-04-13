import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Table } from 'antd';

const { Column  } = Table;

class Topic extends Component {

    constructor(props){
        super(props);

    }

    
    render() {

        const data = [
            {
                key: '1',
                author: 'Author Name',
                message: 'Invitation to Apeireon Hacking Challenge'
            },
            {
                key: '1',
                author: '',
                message: 'Invitation to Apeireon Hacking Challenge'
            },
        ];



        return(
            
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
                    <span className="breadcrumb-item active">Invitation to Apeireon Hacking Challenge</span>
                </nav>
                <div className="row">
                    <div className="col-12">
                        <h2 className="h4 text-white bg-info mb-0 p-4 rounded-top">Invitation to Apeireon Hacking Challenge</h2>
                        <Table className="table table-striped table-bordered table-responsive-lg" dataSource = { data }>
                        <Column scope="col" className="thead-light" title="Author" dataIndex="author" key="author"/>
                        <Column scope="col" className="thead-light" title="message" dataIndex="message" key="message"/>
                        </Table>
                    </div>
                </div>

                <form className="mb-3">
                    <div className="form-group">
                        <label htmlFor="comment">Reply to this post:</label>
                        <textarea className="form-control" id="comment" rows="10" ref={this.commentElref} placeholder="Write your comment here." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.topicHandler}>Reply</button>
                    <button type="reset" className="btn btn-danger">Reset</button>
                </form>
            </div> 
            </div>
        );
    }
}

export default Topic;