import React,{Component} from 'react';
import {BrowserRouter,Switch,Route,NavLink,Redirect} from 'react-router-dom';
import SignIn from '../SignIn/SignIn';

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
        qualification:"",
        firstNameErr:"",
        lastNameErr:"",
        emailErr:"",
        passwordErr:"",
        rePasswordErr:"",
        designationErr:"",
        universityErr:"",
        yearErr:"",
        qualificationErr:"",
	};
    inputHandler=(event)=>{
        const target=event.target;
        const name=target.name;
        const value=target.value;
        const year="year";
        const qualification="qualification";
        if(name==='designation'){
            if(value==='Teacher'){
                this.setState({
                    [year]:""
                });
            }else{
                this.setState({
                    [qualification]:""
                });
            }
        }
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
        let designationErr="";
        let universityErr="";
        let yearErr="";
        let qualificationErr="";

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


        if(this.state.designation!=="Teacher" && this.state.designation!=="Student"){
            designationErr="Please choose one of the options";
        }


        this.setState({
            designationErr:designationErr
        });


        if(this.state.designation==="Teacher"){

            if(!(this.state.university!=="" && regex.alphaSpace.test(this.state.university))){
                universityErr="Enter your university correctly";
            }

            if(!(this.state.qualification!=="" && regex.quali.test(this.state.qualification))){
                qualificationErr="Enter your highest degree of qualification";
            }
        }else if(this.state.designation==="Student"){

            if(!(this.state.university!=="" && regex.alphaSpace.test(this.state.university))){
                universityErr="Enter your university correctly";
            }

            if(!(this.state.year!=="" && regex.year.test(this.state.year))){
                yearErr="Enter the year of your graduation correctly";
            }
        }


        this.setState({
            universityErr:universityErr
        });



        this.setState({
            yearErr:yearErr
        });



        this.setState({
            qualificationErr:qualificationErr
        });

        if(!firstNameErr && !lastNameErr && !emailErr && !passwordErr && !rePasswordErr && !designationErr){
            if(this.state.designation==="Teacher"){
                if(!universityErr && !qualificationErr){
                    return true;
                }else{
                    return false;
                }
            }else if(this.state.designation==="Student"){
                if(!universityErr && !yearErr){
                    return true;
                }else{
                    return false;
                }
            }
        }else{
            return false;
        }

    }

    submitHandler=(event)=>{
        event.preventDefault();
        if(!this.validate()){
            return;
        }
        //console.log(this.state);

        const obj={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            designation:this.state.designation,
            university:this.state.university,
            qualification:this.state.qualification,
            year:this.state.year
        };
        if(this.state.designation==="Student"){
            fetch("http://localhost:5000/student/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    firstName:obj.firstName,
                    lastName:obj.lastName,
                    email:obj.email,
                    password:obj.password,
                    designation:obj.designation,
                    university:obj.university,
                    qualification:obj.qualification,
                    year:obj.year
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
        }else if(this.state.designation==="Teacher"){
            fetch("http://localhost:5000/tutor/signup", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    firstName:obj.firstName,
                    lastName:obj.lastName,
                    email:obj.email,
                    password:obj.password,
                    designation:obj.designation,
                    university:obj.university,
                    qualification:obj.qualification,
                    year:obj.year
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
            
        
        
    }
	render(){
		const style={
			"border":"1px solid black",
			"margin":"2% 20%",
			"padding":"5%",
			"textAlign":"center",
			"boxSizing":"border-box",
			"backgroundColor":"lightgrey"
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
        if(this.state.designation==='Teacher'){
            extraInfo=(
                    <div>
                        <div className="form-group">
                            <label>University</label>
                            <input type="text" 
                            className="form-control" 
                            name="university"
                            placeholder="Enter the University you are teaching in" 
                            value={this.state.university}
                            onChange={this.inputHandler}/>
                        </div>

                        {this.state.universityErr!=="" ? (<div style={invalidStyle}>{this.state.universityErr}</div>) : null}
                        
                        <div className="form-group">
                            <label>Qualifications</label>
                            <input type="text" 
                            className="form-control" 
                            name="qualification"
                            placeholder="Enter your highest degree of qualification" 
                            value={this.state.qualification}
                            onChange={this.inputHandler}/>
                        </div>

                        {this.state.qualificationErr!=="" ? (<div style={invalidStyle}>{this.state.qualificationErr}</div>) : null}
                        
                    </div>
                );
        }else if(this.state.designation==='Student'){
            extraInfo=(
                    <div>
                        <div className="form-group">
                            <label>University</label>
                            <input type="text" 
                            className="form-control" 
                            name="university"
                            placeholder="Enter the University you are studying in" 
                            value={this.state.university}
                            onChange={this.inputHandler}/>
                        </div>

                        {this.state.universityErr!=="" ? (<div style={invalidStyle}>{this.state.universityErr}</div>) : null}
                        
                        <div className="form-group">
                            <label>Year of Graduation</label>
                            <input type="number" 
                            className="form-control" 
                            name="year"
                            placeholder="Enter your year of graduation" 
                            value={this.state.year}
                            onChange={this.inputHandler}/>
                        </div>

                        {this.state.yearErr!=="" ? (<div style={invalidStyle}>{this.state.yearErr}</div>) : null}
                        
                    </div>
                );
        }

		return (
            <div>
                <form style={style}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" 
                        className="form-control" 
                        name="firstName"
                        placeholder="First name" 
                        value={this.state.firstName}
                        onChange={this.inputHandler}/>
                    </div>

                        {this.state.firstNameErr!=="" ? (<div style={invalidStyle}>{this.state.firstNameErr}</div>) : null}

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" 
                        className="form-control" 
                        name="lastName"
                        placeholder="Last name" 
                        value={this.state.lastName}
                        onChange={this.inputHandler}/>
                    </div>

                    {this.state.lastNameErr!=="" ? (<div style={invalidStyle}>{this.state.lastNameErr}</div>) : null}

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" 
                        className="form-control" 
                        name="email"
                        placeholder="Enter email" 
                        value={this.state.email}
                        onChange={this.inputHandler}/>
                    </div>

                    {this.state.emailErr!=="" ? (<div style={invalidStyle}>{this.state.emailErr}</div>) : null}

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                        className="form-control" 
                        name="password"
                        placeholder="Enter password" 
                        value={this.state.password}
                        onChange={this.inputHandler}/>
                    </div>

                    <p className="forgot-password text-right" style={passStyle}>
                        *Password must contain Minimum eight characters, at least one letter and one number
                    </p>

                    {this.state.passwordErr!=="" ? (<div style={invalidStyle}>{this.state.passwordErr}</div>) : null}

                    <div className="form-group">
                        <label>Re-Enter Password</label>
                        <input type="password" 
                        className="form-control" 
                        name="rePassword"
                        placeholder="Re-Enter password" 
                        value={this.state.rePassword}
                        onChange={this.inputHandler}/>
                    </div>

                    {this.state.rePasswordErr!=="" ? (<div style={invalidStyle}>{this.state.rePasswordErr}</div>) : null}

                    <p>Enter your designation</p>
                    <div className="radio">
                        <input type="radio" 
                        name="designation" 
                        value="Teacher" 
                        onClick={this.inputHandler}
                        />
                        <label>Teacher</label>
                        <br/>
                        <input 
                        type="radio" 
                        name="designation" 
                        value="Student" 
                        onClick={this.inputHandler}
                        />
                        <label>Student</label>
                    </div>

                    {this.state.designationErr!=="" ? (<div style={invalidStyle}>{this.state.designationErr}</div>) : null}

                    {extraInfo}

                    <button type="submit" className="btn btn-primary " onClick={this.submitHandler}>Sign Up</button>

                    <p className="forgot-password text-right">
                        Already have an account? 
                        <NavLink className='nav-NavLink' to='/signin'>Sign In </NavLink>
                    </p>
                    
                </form>
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