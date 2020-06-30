import React, { Component, useState, useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import { AuthContext } from '../../App';

const SignIn = (props) => {
    //static authData = AuthContext;

    // componentDidMount(){
    //     const authData = this.context
    //     console.log(authData)
    // }

    const authData = useContext(AuthContext)


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [designation, setDesignation] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");


    const validate = () => {
        let emailErr = "";
        let passwordErr = "";

        const regex = {
            email: new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
            //password:new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$')
        };

        if (!(email !== "" && regex.email.test(email))) {
            emailErr = "Enter your email in the form character@character.domain";
        }

        setEmailErr(emailErr)


        if (!(password !== "")) {
            passwordErr = "Enter your password as stated ";
        }

        setPasswordErr(passwordErr)

        if (!emailErr && !passwordErr) {
            return true;
        } else {
            return false;
        }

    }
    const submitHandler = (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        fetch("http://localhost:5000/user/signin", {
            method: "POST",
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {

                if (data.statusCode === 404) {
                    setEmailErr(data.message);
                    setPasswordErr("");
                    //this.signupError="email_id already registered";
                    //console.log(this.signupError);
                } else if (data.statusCode === 450) {
                    setEmailErr(data.message);
                    setPasswordErr("");

                } else {
                    setEmailErr("");
                    setPasswordErr("");
                    props.loginHandler(data);
                }
                .then(res => res.json())
                .then(data => {

                    if (data.statusCode === 404) {
                        setEmailErr(data.message);
                        setPasswordErr("");
                        //this.signupError="email_id already registered";
                        //console.log(this.signupError);
                    } else if (data.statusCode === 450) {
                        setEmailErr(data.message);
                        setPasswordErr("");

                    } else {
                        setEmailErr("");
                        setPasswordErr("");
                        props.loginHandler(data);
                    }
                })
                .catch(err => console.error(err));
        } else if (designation === "Teacher") {
            fetch("http://localhost:5000/tutor/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })

                .then(res => res.json())
                .then(data => {

                    if (data.statusCode === 404) {
                        setEmailErr(data.message);
                        setPasswordErr("");
                        //this.signupError="email_id already registered";
                        //console.log(this.signupError);
                    } else if (data.statusCode === 450) {
                        setPasswordErr(data.message);
                        setEmailErr("");

                    } else {
                        setEmailErr("");
                        setPasswordErr("");
                        props.loginHandler(data);
                    }
                })
                .catch(err => console.error(err));
        } else if (designation === "Teacher") {
            fetch("http://localhost:5000/tutor/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .catch(err => console.error(err));


    }

    const style = {
        "border": "1px solid black",
        "margin": "2% 20%",
        "padding": "5%",
        "textAlign": "center",
        "boxSizing": "border-box",
        "backgroundColor": "lightgrey"
    };
    const passStyle = {
        "fontSize": "12px"
    };
    const invalidStyle = {
        "border": "2px solid red",
        "color": "red",
        "fontWeight": "bold"
    };
    return (
        // authData && authData.accessToken? <Redirect to = "/dashboard"/>
        // :
        authData && authData.accessToken && !authData.isLoading ? <Redirect to="/dashboard" />
            : authData.isLoading ? <div /> :
                <div>
                    <form style={style}>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div style={invalidStyle}>{emailErr}</div>

                        <div className="form-group">
                            <label >Password</label>
                            <input type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        <p className="forgot-password text-right" style={passStyle}>
                            *Password must contain Minimum eight characters, at least one letter and one number
        authData && authData.accessToken && !authData.isLoading?<Redirect to="/dashboard"/>
        :authData.isLoading?<div/>:
        <div>
            <form style={style}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label >Email address</label>
                    <input type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)} />
                </div>

                <div style={invalidStyle}>{emailErr}</div>

                <div className="form-group">
                    <label >Password</label>
                    <input type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)} />
                </div>

                <p className="forgot-password text-right" style={passStyle}>
                    *Password must contain Minimum eight characters, at least one letter and one number
        authData && authData.accessToken && !authData.isLoading?<Redirect to="/dashboard"/>
        :authData.isLoading?<div/>:
        <div>
            <form style={style}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label >Email address</label>
                    <input type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)} />
                </div>

                {emailErr!=="" ? (<div style={invalidStyle}>{emailErr}</div>) : null}

                <div className="form-group">
                    <label >Password</label>
                    <input type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)} />
                </div>

                <p className="forgot-password text-right" style={passStyle}>
                    *Password must contain Minimum eight characters, at least one letter and one number
                    	</p>


                        <div style={invalidStyle}>{passwordErr}</div>

                <div style={invalidStyle}>{passwordErr}</div>

                <p>Enter your designation</p>
                <div className="radio">
                    <input type="radio"
                        name="designation"
                        value="Teacher"
                        onClick={e=>setDesignation("Teacher")}
                    />
                    <label>Teacher</label>
                    <br />
                    <input
                        type="radio"
                        name="designation"
                        value="Student"
                        onClick={e=>setDesignation("Student")}
                    />
                    <label>Student</label>
                </div>

                {passwordErr!=="" ? (<div style={invalidStyle}>{passwordErr}</div>) : null}

                <p>Enter your designation</p>
                <div className="radio">
                    <input type="radio"
                        name="designation"
                        value="Teacher"
                        onClick={e=>setDesignation("Teacher")}
                    />
                    <label>Teacher</label>
                    <br />
                    <input
                        type="radio"
                        name="designation"
                        value="Student"
                        onClick={e=>setDesignation("Student")}
                    />
                    <label>Student</label>
                </div>

                <div style={invalidStyle}>{designationErr}</div>

                {designationErr!=="" ? (<div style={invalidStyle}>{designationErr}</div>) : null}


                        <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>

                        <p className="forgot-password text-right">
                            Don't have an account?
	                        <NavLink className='nav-NavLink' to='/signup'>Sign Up </NavLink>
                        </p>


                    </form>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route path='/signup' component={SignUp} />
                            </Switch>
                        </div>
                    </div>

                </div>
    );
}


export default SignIn;