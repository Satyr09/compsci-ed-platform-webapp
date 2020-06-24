import React from 'react';
import {  withRouter, NavLink, Link } from "react-router-dom";
import c from "./Contest.module.css";
import { Row, Col, Card, Tag, Breadcrumb } from 'antd';

//start: con.start.split("T")[0],
//end: con.end.split("T")[0],
const Contest = props => {
    const [posts, setPosts] = React.useState();
    const [contests, setContests] = React.useState();

    const epochCalculation = (start, end) => {
        const startDate = new Date(start + "Z");
        const startEpoch = startDate.getTime();
      
        const endDate = new Date(end + "Z");
        const endEpoch = endDate.getTime();
      
        const presentDate = new Date();
        const presentEpoch = presentDate.getTime();
      
        return {
          startEpoch,
          endEpoch,
          presentEpoch,
          startDate,
          endDate,
          presentDate
        };
      };

      const tempObj = {
        live: [],
        past: [],
        future: [],
      };
    const segregateContests = allContests => {
          for (let i = 0; i < allContests.length; i++) {
            const { end, start } = allContests[i];
            const { startEpoch, endEpoch, presentEpoch } = epochCalculation(
              start,
              end
            );
      
            if (presentEpoch < startEpoch) tempObj["future"].push(allContests[i]);
            else if (presentEpoch <= endEpoch) tempObj["live"].push(allContests[i]);
            else tempObj["past"].push(allContests[i]);
          }
          console.log(tempObj.live);
          return tempObj;
    }

    React.useEffect(() => {
        let x= null;
        let y=null, z =null;
        console.log('Fetching...');
        const qParams = 1;
        fetch("http://localhost:5000/data/2")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            x=data.objects;
            let obj = segregateContests(x);
            console.log(obj.live);
            y = obj.live;
            z = obj.future;
            setPosts(y.map(post => {
               return { 
                   ...post,
                   start: post.start.split("T")[0],
                   end: post.end.split("T")[0],
            };
            }))
            setContests(z.map(post => {
                return { 
                    ...post,
                    start: post.start.split("T")[0],
                    end: post.end.split("T")[0],
            };
            }))
        })
        .catch(err => console.error(err));
    },[]);

    /*const addDays = (date, days) => {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const left_limit = addDays(Date(), -90);
    const left_arr = [
      left_limit.getFullYear(),
      left_limit.getMonth() + 1,
      (left_limit.getDay() % 26) + 1,
    ];
    
    const left_date = left_arr.join("-");
    console.log(left_date);*/

    

    const [filterText, setFilterText] = React.useState();

    const handleFilter = e => {
      setFilterText(e.target.value);
    };

    const siteSeclect = (e) => {
        let x= null;
        let y=null, z =null;
        console.log('Fetching...');
        console.log(e);
        const qParams = e;
        fetch(`http://localhost:5000/data/${qParams}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            x=data.objects;
            let obj = segregateContests(x);
            console.log(obj.live);
            y = obj.live;
            z = obj.future;
            setPosts(y.map(post => {
               return { 
                   ...post,
                   start: post.start.split("T")[0],
                   end: post.end.split("T")[0],
            };
            }))
            setContests(z.map(post => {
                return { 
                    ...post,
                    start: post.start.split("T")[0],
                    end: post.end.split("T")[0],
            };
            }))
        })
        .catch(err => console.error(err));
    }

    return(
        <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
            <h1><NavLink to="/contest" className="navbar-brand">Compete</NavLink></h1>
            <form className="form-inline">
                <input type="text" className="form-control mr-3" placeholder="Search"  value={filterText || ""} onChange={e => handleFilter(e)} /> 
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            </div>
        </nav>
        <nav className="navbar navbar-dark bg-warning">
            <div className="container">
                <h1 className="navbar-brand text-secondary"><Link onClick={e => siteSeclect(2)}>Codechef</Link></h1>
                <h1 className="navbar-brand" ><Link onClick={e => siteSeclect(1)}>Codeforces</Link></h1>
                <h1 className="navbar-brand"><Link onClick={e => siteSeclect(73)}>HackerEarth</Link></h1>
                <h1 className="navbar-brand"><Link onClick={e => siteSeclect(12)}>Topcoder</Link></h1>
            </div>
        </nav>
        <Breadcrumb className="breadcrumb bg-alert">
            <Breadcrumb.Item>Active Contests</Breadcrumb.Item>
            <Breadcrumb.Item>Upcoming Contests</Breadcrumb.Item>
        </Breadcrumb>
        <Card bodyStyle={{ padding: 15 }} className={c.bodyCard}>
        <div className="container my-3">
        <div className="row">
        <div className="col-12 col-xl">
        <h1 className="navbar-brand"><Tag color="lime" className="font-size-20px">Active Contests</Tag></h1>
                {posts &&
                  posts
                    .map((con) => {
                        return (
                            <div className={c.postContainer}
                                onClick= {e => window.location.assign(con.href)}
                            >
                                <Row className={c.postRow}>
                                <Col
                                    sm={{ span: 10, offset: 0 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                  
                                  <div className={c.titleWrapper}>{con.event}</div>
                                </Col>
                                <Col
                                    sm={{ span: 4, offset: 1 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                    <div className={c.dateWrapper}>
                                    <div className={c.createdText}>Starts :</div>
                                    <span style={{ width: "7.5px" }}></span>
                                    {con.start}
                                    </div>                                    
                                </Col>
                                <Col
                                    sm={{ span: 4, offset: 1 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                    <div className={c.dateWrapper}>
                                    <div className={c.createdText}>Ends :</div>
                                    <span style={{ width: "7.5px" }}></span>
                                    {con.end}
                                    </div>                                    
                                </Col>                                
                                <Col
                                    sm={{ span: 3, offset: 1 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                    <Tag color="gold">{con.resource.name}</Tag>
                                </Col>           
                                </Row>
                            </div> 
                        );
                    })
                }
                <h1 className="navbar-brand"><Tag color="lime">Upcoming Contests</Tag></h1>
                {contests &&
                  contests
                    .map((con) => {
                        return (
                            <div className={c.postContainer}
                                onClick= {e => window.location.assign(con.href)}
                            >
                                <Row className={c.postRow}>
                                <Col
                                    sm={{ span: 10, offset: 0 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                  
                                  <div className={c.titleWrapper}>{con.event}</div>
                                </Col>
                                <Col
                                    sm={{ span: 4, offset: 1 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                    <div className={c.dateWrapper}>
                                    <div className={c.createdText}>Starts :</div>
                                    <span style={{ width: "7.5px" }}></span>
                                    {con.start}
                                    </div>                                    
                                </Col>
                                <Col
                                    sm={{ span: 4, offset: 1 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                    <div className={c.dateWrapper}>
                                    <div className={c.createdText}>Ends :</div>
                                    <span style={{ width: "7.5px" }}></span>
                                    {con.end}
                                    </div>                                    
                                </Col>                                
                                <Col
                                    sm={{ span: 3, offset: 1 }}
                                    xs={{ span: 24, offset: 0 }}
                                >
                                    <Tag color="gold">{con.resource.name}</Tag>
                                </Col>           
                                </Row>
                            </div> 
                        );
                    })
                }
                              
        </div>
        </div> 
        </div>
        </Card>
        </React.Fragment>
    ); 
}
export default Contest;