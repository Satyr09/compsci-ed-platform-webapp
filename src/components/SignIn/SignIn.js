import React,{Component} from 'react';
import {BrowserRouter,Switch,Route,NavLink} from 'react-router-dom';
import SignUp from '../SignUp/SignUp';

class SignIn extends Component{
	state={
		email:"",
		password:"",
		designation:"",
		emailErr:"",
		passwordErr:"",
		designationErr:""
	}
	inputHandler=(event)=>{
        const target=event.target;
        const name=target.name;
        const value=target.value;
        this.setState({
            [name]:value
        });
    }
    validate=()=>{
    	let emailErr="";
        let passwordErr="";
        let designationErr="";

        const regex={
        	email:new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
            password:new RegExp('^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{8,}$')
        };

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

        if(this.state.designation!=="Teacher" && this.state.designation!=="Student"){
            designationErr="Please choose one of the options";
        }


        this.setState({
            designationErr:designationErr
        });

        if(!emailErr && !passwordErr && !designationErr){
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
        //console.log(this.state);

        /*const obj={
        	email:this.state.email,
        	password:this.state.password
        };*/

        const email=this.state.email;
        const password=this.state.password;

        if(this.state.designation==="Student"){
        	fetch("http://localhost:5000/student/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.statusCode===404){ 
                        this.setState({
                            emailErr:data.message,
                            passwordErr:""
                        });
                        //this.signupError="email_id already registered";
                        //console.log(this.signupError);
                    }else if(data.statusCode===450){
                        this.setState({
                            emailErr:"",
                            passwordErr:data.message
                        });   
                    }else if(data.statusCode===200){
                        this.setState({
                            emailErr:"",
                            passwordErr:""
                        }); 
                        console.log(data.message);
                    }
                })
                .catch(err => console.error(err));
        }else if(this.state.designation==="Teacher"){
        	fetch("http://localhost:5000/tutor/signin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.statusCode===404){ 
                        this.setState({
                            emailErr:data.message,
                            passwordErr:""
                        });
                        //this.signupError="email_id already registered";
                        //console.log(this.signupError);
                    }else if(data.statusCode===450){
                        this.setState({
                            emailErr:"",
                            passwordErr:data.message
                        });   
                    }else if(data.statusCode===200){
                        this.setState({
                            emailErr:"",
                            passwordErr:""
                        }); 
                        console.log(data.message);
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
            "border":"2px solid gold",
            "color":"red",
            "fontWeight":"bold"
        };
		return (
			<div>
				<form style={style}>
		                <h3>Sign In</h3>

		                <div className="form-group">
		                    <label >Email address</label>
		                    <input type="email" 
		                    className="form-control" 
		                    name="email"
		                    placeholder="Enter email"
		                    value={this.state.email}		  
                        	onChange={this.inputHandler} />
		                </div>

		                <div style={invalidStyle}>{this.state.emailErr}</div>

		                <div className="form-group">
		                    <label >Password</label>
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

		                <div style={invalidStyle}>{this.state.passwordErr}</div>

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

	                    <div style={invalidStyle}>{this.state.designationErr}</div>

		                <button type="submit" className="btn btn-primary" onClick={this.submitHandler}>Submit</button>

		                <p className="forgot-password text-right">
	                        Don't have an account? 
	                        <NavLink className='nav-NavLink' to='/signup'>Sign Up </NavLink>
	                    </p>
		                
		                
		        </form>
		        <BrowserRouter>
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <Switch>
                                <Route path='/signup' component={SignUp} />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
	        </div>
		);
	}
}

export default SignIn;