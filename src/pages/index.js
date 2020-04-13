import React, { Component } from 'react';
import { Pagination, Table, Card  } from 'antd';
import {  NavLink } from "react-router-dom";


const { Column  } = Table;

class Mainpage extends Component {
    
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

        

        return (
            <React.Fragment>
                <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <h1><NavLink to="/forum" className="navbar-brand">Forums</NavLink></h1>
                    <form className="form-inline">
                        <input type="text" className="form-control mr-3" placeholder="Search" />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
                </nav>
                <div className="container my-3">
                <nav className="breadcrumb">
                    <span className="breadcrumb-item active">Board index</span>
                </nav>
                <div className="row">
                    <div className="col-12 col-xl-9">
                        <h2 className="h4 text-white bg-info mb-0 p-4 rounded-top"><NavLink to="/topic_overview" className="text-white">Forum category</NavLink></h2>
                            <Table className="table table-striped table-bordered table-responsive-lg" dataSource = { eventList }>
                                <Column scope="col" className="topic-col" title="Topic" dataIndex="topic" key="topic" render={topic => <NavLink to="/topic">{topic}</NavLink>}/>
                                <Column scope="col" className="created-col" title="Created" dataIndex="created" key="created"/>
                                <Column scope="col" title="Statistics" dataIndex="statistics" key="statistics"/>
                                <Column scope="col" className="last-post-col" title="Last Post" dataIndex="lastpost" key="lastpost"/>
                            </Table>
                        <h2 className="h4 text-white bg-danger mb-0 p-4 rounded-top">Forum category</h2>
                            <Table className="table table-striped table-bordered table-responsive-lg" dataSource = { eventList }>
                                <Column scope="col" className="topic-col" title="Topic" dataIndex="topic" key="topic" render={topic => <NavLink to="/topic">{topic}</NavLink>}/>
                                <Column scope="col" className="created-col" title="Created" dataIndex="created" key="created"/>
                                <Column scope="col" title="Statistics" dataIndex="statistics" key="statistics"/>
                                <Column scope="col" className="last-post-col" title="Last Post" dataIndex="lastpost" key="lastpost"/>
                            </Table>
                        <h2 className="h4 text-white bg-warning mb-0 p-4 rounded-top">Forum category</h2>
                            <Table className="table table-striped table-bordered table-responsive-lg" dataSource = { eventList }>
                                <Column scope="col" className="topic-col" title="Topic" dataIndex="topic" key="topic" render={topic => <NavLink to="/topic">{topic}</NavLink>}/>
                                <Column scope="col" className="created-col" title="Created" dataIndex="created" key="created"/>
                                <Column scope="col" title="Statistics" dataIndex="statistics" key="statistics"/>
                                <Column scope="col" className="last-post-col" title="Last Post" dataIndex="lastpost" key="lastpost"/>
                            </Table>
                    </div>
                    <div className="col-12 col-xl-3">
                        <aside>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-xl-12">
                                    <Card  className="card" style={{ width: 300 }}>
                                        <h2 className="h4 card-title">Member online</h2>
                                        <ul className="list-unstyleed">
                                            <li><a href="#0">Forum member name</a></li>
                                            <li><a href="#0">Forum member name</a></li>
                                            <li><a href="#0">Forum member name</a></li>
                                            <li><a href="#0">Forum member name</a></li>
                                            <li><a href="#0">Forum member name</a></li>
                                            <li><a href="#0">Forum member name</a></li>
                                        </ul>
                                    </Card>
                                    <Card style={{ width: 300 }}>
                                        <dl className="row">
                                            <dt className="col-8">Total:</dt>
                                            <dd className="col-4">10</dd>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-8">Member:</dt>
                                            <dd className="col-4">7</dd>
                                        </dl>
                                        <dl className="row">
                                            <dt className="col-8">Guests:</dt>
                                            <dd className="col-4">3</dd>
                                        </dl>
                                    </Card>
                                </div>
                                <div className="col-12 col-sm-6 col-xl-12">
                                    <Card  className="card" style={{ width: 300 }}>
                                        <h2 className="h4 card-title">Forum stastistics</h2>
                                        <dl>
                                            <dt>Total forums:</dt>
                                            <dd>10</dd>
                                        </dl>
                                        <dl>
                                            <dt>Total Topics:</dt>
                                            <dd>7</dd>
                                        </dl>
                                        <dl>
                                            <dt>Total members:</dt>
                                            <dd>3</dd>
                                        </dl>
                                    </Card>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <NavLink to="/new_topic" className="btn btn-lg btn-primary">New topic</NavLink>
                </div>
            </React.Fragment>
        );
    }
}

export default Mainpage;