import React, { Component, useState, useContext, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import { AuthContext } from '../../App';
import { Card,Input,Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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
                    setPasswordErr(data.message);
                    setEmailErr("");

                } else {
                    setEmailErr("");
                    setPasswordErr("");
                    props.loginHandler(data);
                }
            })
            .catch(err => console.error(err));


    }

    const style = {
        "border": "1px solid black",
        "margin": "2% 20%",
        "padding": "5%",
        "textAlign": "center",
        "boxSizing": "border-box",
        "maxWidth": "65%",
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
                    <Card style={style}>
                        <h3>Sign In</h3>

                        <p>
                        <label >Email address</label>
                        <Input placeholder="Enter email" name="email"
                            prefix={<UserOutlined />} 
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        </p>
                        
                      
                        {emailErr!=="" ? (<div style={invalidStyle}>{emailErr}</div>) : null}

                        <p>
                        <label >Password</label>
                        <Input.Password placeholder="Enter password" 
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                        </p>
                        


                        <p className="forgot-password text-right" style={passStyle}>
                            *Password must contain Minimum eight characters, at least one letter and one number
                    	</p>

                        {passwordErr!=="" ? (<div style={invalidStyle}>{passwordErr}</div>) : null}

                        
                        <Button type="primary" htmlType="submit" onClick={submitHandler}>Sign In</Button>

                        <p className="forgot-password text-right">
                            Don't have an account?
	                        <NavLink className='nav-NavLink' to='/signup'>Sign Up </NavLink>
                        </p>


                    </Card>
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