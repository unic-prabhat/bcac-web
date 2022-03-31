import React, {Component} from "react";
import { NotificationManager } from "react-notifications";
import axios from 'axios';

export default class Manageadmin extends Component{

    constructor(props){

        super(props)
        this.state={

            loadingForm:false,
            organisation_name:'',
            authorised_person_name:'',
            mobile_number:'',
            username:'',
            password:'',
            createdBy:'SuperAdmin'


        }

        this.hanleTextChange = this.hanleTextChange.bind(this)
    }

    hanleTextChange(e){
        console.log(e.target.value)
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
        axios.post('http://localhost:5000/api/admin/store',this.state)
        .then(response=>{
            // console.log(response)

            if(response.data.message=='valid'){
                this.setState({
                    loadingForm:false,
                    organisation_name:'',
                    authorised_person_name:'',
                    mobile_number:'',
                    username:'',
                    password:'',
                    createdBy:''
                })

                NotificationManager.success('Admin has been added successfully!');
                // this.props.history.push('/mangeadmin');
            }else{
                this.setState({loadingForm:false})
                NotificationManager.warning('Username Already Exists!');
            }
        })
    }


    render(){


        return(

            <>
            <div className="container">
                    <h2>ORGANISER REGISTRATION</h2>
                    <form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>
                    <div className="form-group">
                        <label htmlFor="organisation_name">Name of the organisation:</label>
                        <input type="text" className="form-control" id="organisation_name" placeholder="Enter Name of the organisation" name="organisation_name"  value={this.state.organisation_name} onChange={this.hanleTextChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="authorised_person_name">Authorised person name:</label>
                        <input type="text" className="form-control" id="authorised_person_name" placeholder="Enter Authorised person name" name="authorised_person_name"  value={this.state.authorised_person_name} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobile_number">Mobile Number:</label>
                        <input type="text" className="form-control" id="mobile_number" placeholder="Enter Mobile Number" name="mobile_number"  value={this.state.mobile_number} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email ID:</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter Email ID" name="username"  value={this.state.username} onChange={this.hanleTextChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" name="password"  value={this.state.password} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group form-check">
                        <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="terms_condition" id="terms_condition" /> I agree Terms & Condition
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">ADD</button>
                    </form>
                </div>   
         
            </>
        )
    }
}