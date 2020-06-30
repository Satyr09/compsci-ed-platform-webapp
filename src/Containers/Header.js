import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FaAngleDown } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import { Menu, Dropdown } from 'antd';
//import {BsDot} from 'react-icons/bs';

class Header extends React.Component {
    state={
        show: false,
    }
     menu = (
        <Menu onClick={()=>this.props.logoutHandler("refreshToken")}>
          <Menu.Item>
            <div >Logout</div>
          </Menu.Item>
        </Menu>
      );
      menu1 = (
        <Menu onClick={()=>window.location.reload(true)}>
          <Menu.Item>
            <div >Login</div>
          </Menu.Item>
        </Menu>
      );
    render(){
        return (
            <div style={{position:"absolute", width:"100%", top:"0",zIndex:"9999"}}>
                <nav className="navbar navbar-expand-lg bg-info navbar-dark indigo"> 
                <ul className='navbar-nav ml-auto'>
                    {this.props.userData!== "" ?
                        (
                        <React.Fragment>
                            <li className='nav-item'>
                                {console.log(this.props.userData)}
                                <div>
                                    <FiUser/>{' '}
                                    {this.props.userData}{' '}
                                </div>
                                
                            </li>
                            <li className='nav-item'>
                                <Dropdown overlay={this.menu}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <FaAngleDown />
                                    </a>
                                </Dropdown>
                            </li>
                        </React.Fragment>) : 
                        <li className='nav-item'>
                            <Dropdown overlay={this.menu1}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <FaAngleDown />
                                    </a>
                                </Dropdown>
                        </li>}
                            
                    </ul >
                </nav>
            </div>
        )
    }
}

export default Header;