import React,{Component} from 'react';
import {BrowserRouter,Switch,Route,NavLink,Redirect} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import { Card,Input,Button,Checkbox,DatePicker } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class SignUp extends Component{
	state={
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        rePassword:"",
		designation:"",
        university:"",
        year:"",
        educatorStatus:"",
        firstNameErr:"",
        lastNameErr:"",
        emailErr:"",
        passwordErr:"",
        rePasswordErr:"",
        universityErr:"",
        yearErr:"",
	};
    inputHandler=(event)=>{
        const target=event.target;
        const name=target.name;
        const value=target.value;
        const year="year";
        const qualification="qualification";
        this.setState({
            [name]:value
        });
    }
    
    validate=()=>{
        let firstNameErr="";
        let lastNameErr="";
        let emailErr="";
        let passwordErr="";
        let rePasswordErr="";
        let universityErr="";
        let yearErr="";

        const regex={
            alphabet:new RegExp('[A-Za-z]+'),
            alphaSpace:new RegExp('[A-Za-z ]+'),
            quali:new RegExp('[A-Za-z]+.?[A-Za-z]+'),
            email:new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
            password:new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$'),
            year:new RegExp('^[0-9]{4}$')
        };

        if(!(this.state.firstName!=="" && regex.alphabet.test(this.state.firstName))){
            firstNameErr="Enter your first name correctly";
        }

        this.setState({
            firstNameErr:firstNameErr
        });
        

        if(!(this.state.lastName!=="" && regex.alphabet.test(this.state.lastName))){
            lastNameErr="Enter your last name correctly";
        }

        this.setState({
            lastNameErr:lastNameErr
        });


        if(!(this.state.email!=="" && regex.email.test(this.state.email))){
            emailErr="Enter your email in the form character@character.domain";
        }


        this.setState({
            emailErr:emailErr
        });


        if(!(this.state.password!=="" && regex.password.test(this.state.password))){
            passwordErr="Enter your password as stated ";
        }


        this.setState({
            passwordErr:passwordErr
        });


        if(!(this.state.rePassword===this.state.password)){
            rePasswordErr="Password mismatch";
        }


        this.setState({
            rePasswordErr:rePasswordErr
        });



        if(!(this.state.university!=="" && regex.alphaSpace.test(this.state.university))){
            universityErr="Enter your university correctly";
        }

        if(!(this.state.year!=="" && regex.year.test(this.state.year))){
            yearErr="Enter the year of your graduation correctly";
        }



        this.setState({
            universityErr:universityErr
        });



        this.setState({
            yearErr:yearErr
        });


        if(!firstNameErr && !lastNameErr && !emailErr && !passwordErr && !rePasswordErr && !universityErr && !yearErr){
            return true;
        }else{
            return false;
        }

    }

    submitHandler=(event)=>{
        event.preventDefault();
        if(!this.validate()){
            return;
        }
        console.log(this.state);

        const obj={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            designation:this.state.designation,
            university:this.state.university,
            year:this.state.year,
            educatorStatus:this.state.educatorStatus,
        };
            fetch("http://localhost:5000/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    firstName:obj.firstName,
                    lastName:obj.lastName,
                    email:obj.email,
                    password:obj.password,
                    designation:"student",
                    university:obj.university,
                    qualification:obj.qualification,
                    year:obj.year,
                    educatorStatus:obj.educatorStatus,
                    qualification:"B.E.",
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if(data.statusCode===800){
                        this.setState({
                            emailErr:data.message
                        });
                        //this.signupError="email_id already registered";
                        //console.log(this.signupError);
                    }else if(data.statusCode===220){
                        this.setState({
                            emailErr:""
                        });
                        console.log(data.message);
                        alert('Successfully Registered');
                        this.props.history.push('/signin');
                    }
                })
                .catch(err => console.error(err));
        
            
        
        
    }
    handleCheckboxChange(e) {
        console.log(e.target.checked);
        this.setState({
            ...this.state,
            educatorStatus: e.target.checked ? "pending" : "",
        })
      }
    yearHandler=(date, dateString)=>{
        console.log(dateString);
        this.setState({
            ...this.state,
            year:dateString,
        })
    }
	render(){
		const style={
            "border": "1px solid black",
            "margin": "2% 20%",
            "padding": "5%",
            "textAlign": "center",
            "boxSizing": "border-box",
            "maxWidth": "65%",
		};
        const passStyle={
            "fontSize":"12px"
        };
        const invalidStyle={
            "border":"2px solid red",
            "color":"red",
            "fontWeight":"bold"
        };
        let extraInfo=null;

		return (
            <div>
                <Card style={style}>
                    <h3>Sign Up</h3>

                    <p>
                    <label>First name</label>
                    <Input name="firstName"
                        placeholder="First name" 
                        value={this.state.firstName}
                        onChange={this.inputHandler}/>
                    </p>
                    

                    {this.state.firstNameErr!=="" ? (<div style={invalidStyle}>{this.state.firstNameErr}</div>) : null}

                    <p>
                    <label>Last name</label>
                    <Input name="lastName"
                        placeholder="Last name" 
                        value={this.state.lastName}
                        onChange={this.inputHandler}/>
                    </p>
                    

                    {this.state.lastNameErr!=="" ? (<div style={invalidStyle}>{this.state.lastNameErr}</div>) : null}

                    <p>
                    <label >Email address</label>
                    <Input placeholder="Enter email" name="email"
                        prefix={<UserOutlined />} 
                        value={this.state.email}
                        onChange={this.inputHandler}/>
                    </p>
                    

                    {this.state.emailErr!=="" ? (<div style={invalidStyle}>{this.state.emailErr}</div>) : null}

                    <p>
                    <label >Password</label>
                    <Input.Password placeholder="Enter password" 
                        name="password"
                        value={this.state.password}
                        onChange={this.inputHandler}/>
                    </p>
                    
                    
                    <p className="forgot-password text-right" style={passStyle}>
                        *Password must contain Minimum eight characters, at least one letter and one number
                    </p>

                    {this.state.passwordErr!=="" ? (<div style={invalidStyle}>{this.state.passwordErr}</div>) : null}

                    <p>
                    <label >Re-Enter Password</label>
                    <Input.Password placeholder="Re-Enter password" 
                        name="rePassword"
                        value={this.state.rePassword}
                        onChange={this.inputHandler}/>
                    </p>
                    

                    {this.state.rePasswordErr!=="" ? (<div style={invalidStyle}>{this.state.rePasswordErr}</div>) : null}

                    <p>
                    <Checkbox onChange={this.handleCheckboxChange.bind(this)}>I want to apply as an educator</Checkbox>
                    </p>
                    

                    <p>
                    <label>University</label>
                    <Input name="university"
                        placeholder="Enter your University" 
                        value={this.state.university}
                        onChange={this.inputHandler}/>
                    </p>
                    

                        {this.state.universityErr!=="" ? (<div style={invalidStyle}>{this.state.universityErr}</div>) : null}
                        
                        <label>Year of Graduation</label>
                        <p>
                        <DatePicker picker="year" 
                        onChange={this.yearHandler}/>
                        </p>
                        

                        {this.state.yearErr!=="" ? (<div style={invalidStyle}>{this.state.yearErr}</div>) : null}
                        
    
                    <Button type="primary" htmlType="submit" onClick={this.submitHandler}>Sign Up</Button>

                    <p className="forgot-password text-right">
                        Already have an account? 
                        <NavLink className='nav-NavLink' to='/signin'>Sign In </NavLink>
                    </p>
                    
                </Card>
                <BrowserRouter>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route path='/signin' component={SignIn} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
		);
	}
}

export default SignUp;