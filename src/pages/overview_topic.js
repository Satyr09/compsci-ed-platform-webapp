import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Pagination, Table } from 'antd';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
//import   EventList from './EventList/EventList';
//import eventList from './EventList/EventList';

const { Column  } = Table;

class TopicOverview extends Component {
    state = {
        events: [],
        data: {
            key:" ",
            topic:" ",
            created:" ",
            statistics:" ",
            lastpost:" ",
        },
    }

    

    componentDidMount() {
        console.log("Hello");
        fetch("http://localhost:5000/topics",{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                const e = data;
                this.setState({ events: e });
            })
            .catch(err => {
                console.log(err);
            })
    }   

    
    
    render() {
        
        const eventList = this.state.events.map(event =>{
            return (
                this.state.data = {
                    key: event._id,
                    topic: event.title,
                    created: 'Author Name',
                    statistics: '5 Reply',
                    lastpost: '10 Mach 2020',
                }
            );
        });

        console.log(eventList);
                
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
                    {/*<Link to="/forum" className="breadcrumb-item">Board index</Link>
                    <Link to="/forum_category" className="breadcrumb-item">Forum category</Link>
                    <span className="breadcrumb-item active">Forum name</span>
                                            <Breadcrumb.Item href="/forum_category">
                        <UserOutlined/>
                        <span  className="breadcrumb-item">Forum category</span>
                        </Breadcrumb.Item>*/}
                    <Breadcrumb>
                        <Breadcrumb.Item href="/forum">
                        <HomeOutlined className="breadcrumb-item"/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-item active">Forum name</Breadcrumb.Item>
                    </Breadcrumb>
                </nav>

                <div className="row">
                    <div className="col-12">
                        <h2 className="h4 text-white bg-info mb-0 p-4 rounded-top"><Link to="/forum" className="text-white">Forum category</Link></h2>
                        {/*<EventList events={this.state.events} data={this.state.data}/>*/}
                        <Table className="table table-striped table-bordered table-responsive-lg" dataSource = { eventList }>
                            <Column scope="col" className="topic-col" title="Topic" dataIndex="topic" key="topic" render={topic => <Link to="/topic">{topic}</Link>}/>
                            <Column scope="col" className="created-col" title="Created" dataIndex="created" key="created"/>
                            <Column scope="col" title="Statistics" dataIndex="statistics" key="statistics"/>
                            <Column scope="col" className="last-post-col" title="Last Post" dataIndex="lastpost" key="lastpost"/>
                        </Table>
                    </div>
                </div>
                <div className="mb-3 clearfix">
                    <nav aria-label="Navigate post pages" className="float-lg-right">
                            <Pagination defaultCurrent={1} total={50} />
                    </nav>
                    <Link to="/new_topic" className="btn btn-lg btn-primary">New topic</Link>
                </div>
            </div> 
            </div>
        );
    }
}

export default TopicOverview;