import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Switch,Route,NavLink} from 'react-router-dom';
import SignIn from '../components/SignIn/SignIn';
import SignUp from '../components/SignUp/SignUp';

const form =()=>(
	<BrowserRouter>
      <div >
        <div className='container'>
          <nav className='navbar navbar-expand-sm bg-dark navbar-light fixed-top'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <NavLink className='nav-NavLink' to='/signup'>Sign Up </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink className='nav-NavLink' to='/signin'>Sign In </NavLink>
                </li>
              </ul>
          </nav>
        </div>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={SignIn} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
);

export default form;