import React, {Component} from 'react';
import {Link} from 'react-router-dom';




export default class Body extends Component{

    render(){


        return (

            <>

            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
             <a class="navbar-brand" exact to="/">Logo</a>
                <ul class="navbar-nav">
                   <li class="nav-item">
                    <Link class="nav-link" exact to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link" exact to="/mangeadmin">Manage Admin</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link" exact to="/adminlogin">Admin Login</Link>
                    </li>
                    <li class="nav-item">
                    <Link class="nav-link" exact to="/manageevent">Manage Events</Link>
                    </li>
                </ul>
                </nav>

                <div class="container-fluid">
                 {this.props.children}
                </div>
            </>
        )

      
        
    }


}