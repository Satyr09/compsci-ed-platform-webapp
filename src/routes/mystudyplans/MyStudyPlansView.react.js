import React, { useContext, useState, useEffect, useMemo } from "react";
import s from "./MyStudyPlan.module.css";
import { Card, Button, Input, Divider, Avatar, List } from "antd";
import { Typography } from "antd";
import { AuthContext } from "../../App";
import { PlusCircleOutlined } from "@ant-design/icons";


const { Title } = Typography;

const MyStudyPlanView = props => {

    const authData = useContext(AuthContext);
    const [studyPlans, setStudyPlans] = useState([]);
    const [searchText, setSearchText] = useState("");


    const hadnleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const filteredItems = useMemo(() => {
        if (!searchText) return studyPlans;
        return studyPlans.filter(e => e.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
    }, [searchText, studyPlans])

    useEffect(() => {
        if (authData && authData.user)
            fetch(`http://localhost:5000/studyplan/user/${authData.user.email}`, {
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `JWT ${authData.accessToken}`
                },
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => { console.log(data); setStudyPlans(data) })
    }, [authData])

    return (
        studyPlans && studyPlans.length ?
            <Card>
                <div className={s.header}>Your Study Plans</div>
                <div className={s.subHeader}>Find all study plans that you created or were added to.</div>
                <br />
                <div className={s.newItemInput} style={{ width: "30%", margin: "10px auto" }}>
                    <Input placeholder="Search for a study plan" onChange={hadnleSearchTextChange} value={searchText} />
                </div>
                <br />
                <br />
                <div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", width: "100%" }}>

                        {
                            studyPlans && filteredItems.map(
                                item => {
                                    return (
                                        <Card hoverable={true} style={{ width: "500px", height: "250px", margin: "15px" }}>
                                            <Card.Meta
                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={<a href={`/studyplan?id=${item._id}`} target="_blank">{item.title}</a>}
                                                description={
                                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                        <div className={s.smallerText} style={{ textAlign: "left !important" }}>
                                                            Created by : {item.createdBy}
                                                        </div>
                                                        <div>
                                                            {item.description}
                                                        </div>
                                                    </div>}
                                            />
                                        </Card>
                                    )
                                }
                            )
                        }
                        <Button type="dashed" style={{ width: "500px", height: "250px", margin: "15px", background:"#f8f9fb" }}>
                            <div style={{ fontSize: "32px", color: "rgb(94, 147, 173)" }}>
                                <PlusCircleOutlined />
                            </div>
                            <br/>
                            <div className={s.smallerHeader}>
                                Add a new Study Plan
                            </div>
                        </Button>
                    </div>
                </div>
            </Card>
            :
            <div>
                Nothing found
        </div>
    )
}
export default MyStudyPlanView;