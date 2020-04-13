import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ForumCategory extends Component {
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
                    <span className="breadcrumb-item active">Forum category</span>
                </nav>
                <div className="row">
                    <div className="col-12 col-xl-9">
                        <h2 className="h4 text-white bg-info mb-0 p-4 rounded-top"><Link to="/forum_category" className="text-white">Forum category</Link></h2>
                        <table className="table table-striped table-bordered table-responsive mb-xl-0">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" className="forum-col">Forum</th>
                                    <th scope="col">Topics</th>
                                    <th scope="col">Posts</th>
                                    <th scope="col" className="last-post-col">Last post</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h3 className="h5"><Link to="/topic_overview">Forum name</Link></h3>
                                        <p>Invitation to Apeireon Hacking Challenge ( Sample Example:- Codechef )</p>
                                    </td>
                                    <td>
                                        <div>5</div>
                                    </td>
                                    <td>
                                        <div>18</div>
                                    </td>
                                    <td>
                                        <h4 className="h6"><a href="#0">Post name</a></h4>
                                        <div>by <a href="#0">Author name</a></div>
                                        <div>26 March 2020, 11:00</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    ./overview-topic.html
                                        <p>Invitation to Apeireon Hacking Challenge ( Sample Example:- Codechef )</p>
                                    </td>
                                    <td>
                                        <div>5</div>
                                    </td>
                                    <td>
                                        <div>18</div>
                                    </td>
                                    <td>
                                        <h4 className="h6"><a href="#0">Post name</a></h4>
                                        <div>by <a href="#0">Author name</a></div>
                                        <div>26 March 2020, 11:00</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    ./overview-topic.html
                                        <p>Invitation to Apeireon Hacking Challenge ( Sample Example:- Codechef )</p>
                                    </td>
                                    <td>
                                        <div>5</div>
                                    </td>
                                    <td>
                                        <div>18</div>
                                    </td>
                                    <td>
                                        <h4 className="h6"><a href="#0">Post name</a></h4>
                                        <div>by <a href="#0">Author name</a></div>
                                        <div>26 March 2020, 11:00</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    ./overview-topic.html
                                        <p>Invitation to Apeireon Hacking Challenge ( Sample Example:- Codechef )</p>
                                    </td>
                                    <td>
                                        <div>5</div>
                                    </td>
                                    <td>
                                        <div>18</div>
                                    </td>
                                    <td>
                                        <h4 className="h6"><a href="#0">Post name</a></h4>
                                        <div>by <a href="#0">Author name</a></div>
                                        <div>26 March 2020, 11:00</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-xl-3">
                        <aside>
                            <div className="row">
                                <div className="col-12 col-sm-6 col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h2 className="h4 card-title">Member online</h2>
                                            <ul className="list-unstyleed">
                                                <li><a href="#0">Forum member name</a></li>
                                                <li><a href="#0">Forum member name</a></li>
                                                <li><a href="#0">Forum member name</a></li>
                                                <li><a href="#0">Forum member name</a></li>
                                                <li><a href="#0">Forum member name</a></li>
                                                <li><a href="#0">Forum member name</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-footer">
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
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-xl-12">
                                    <div className="card">
                                        <div className="card-body">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
                <Link to="/new_topic" className="btn btn-lg btn-primary">New topic</Link>
            </div> 
            </div>
        );
    }
}

export default ForumCategory;