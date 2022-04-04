import React, {Component} from "react";
import { NotificationManager } from "react-notifications";
import axios from 'axios';
import cookie from 'react-cookies';

export default class Superadminlogin extends Component{


    constructor(props){

        super(props)
        this.state={

            loadingForm:false,
            email:'',
            password:''
        }

        this.hanleTextChange = this.hanleTextChange.bind(this)
    }

    componentDidMount(){
        cookie.remove('admindata', { path: '/' })
        cookie.remove('adminlogin', { path: '/' })
        cookie.remove('adminid', { path: '/' })
    }

    hanleTextChange(e){
        
        this.setState({
            [e.target.name]:e.target.value
        })
    }

handleSubmit=e=>{
       
       e.preventDefault();

        this.setState({
            loadingForm:true
        })

        // console.log(this.state)
        axios.post('http://localhost:5000/api/admin/login',this.state)
        .then(response=>{
            console.log(response)

            if(response.data.response==true){
                this.setState({
                    loadingForm:false,
                    email:'',
                    password:''
                })

                cookie.remove('admindata', { path: '/' })
                cookie.remove('adminlogin', { path: '/' })
                cookie.remove('adminid', { path: '/' })

                var expires = new Date();
                expires.setSeconds(21600);
                cookie.save('admindata', response.data.data, { path: '/', expires })
                cookie.save('adminid', response.data.data._id, { path: '/', expires })
                cookie.save('adminlogin', true, { path: '/', expires })

                NotificationManager.success('Login Success');
                this.props.history.push('/manageevent');
            }else{
                this.setState({loadingForm:false})
                NotificationManager.warning(response.data.data);
            }

         
        })
    }

     render(){

        return(

            <>
                <div className="container">
                    <h2>Admin Login</h2>
                    <form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.hanleTextChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.hanleTextChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </>
        )
     }


}