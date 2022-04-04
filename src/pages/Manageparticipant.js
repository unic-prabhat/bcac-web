import React, {Component} from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import cookie from 'react-cookies';

export default class Manageevent extends Component{


    constructor(props){

        super(props)
        this.state={

            loadingForm:false,
            air_registration_number:'',
            participant_name:'',
            participant_sex:'',
            participant_dob:'',
            participant_mobileno:'',
            participant_email:'',
            participant_blood_group:'',
            emergency_contact_person:'',
            ecp_telephone_number:'',
            createdBy:cookie.load('admindata')._id


        }

        this.hanleTextChange = this.hanleTextChange.bind(this)
    }


    componentDidMount(){
        console.log(cookie.load('admindata'))
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
        axios.post('http://localhost:5000/api/participant/store',this.state)
        .then(response=>{
            // console.log(response)

            if(response.data.message=='valid'){
                this.setState({
                    loadingForm:false,
                    air_registration_number:'',
                    participant_name:'',
                    participant_sex:'',
                    participant_dob:'',
                    participant_mobileno:'',
                    participant_email:'',
                    participant_blood_group:'',
                    emergency_contact_person:'',
                    ecp_telephone_number:'',
                    createdBy:''
                })

                NotificationManager.success('Participant has been added successfully!');
                // this.props.history.push('/mangeadmin');
            }else{
                this.setState({loadingForm:false})
                NotificationManager.warning('AIR registration no. Already Exists!');
            }
        })
    }

     render(){

        return(

            <>
             <div className="container">
                    <h2>ADD PARTICIPANTS</h2>
                    <form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>
                    <div className="form-group">
                        <label htmlFor="air_registration_number">AIR registration no.:</label>
                        <input type="text" className="form-control" id="air_registration_number" placeholder="Enter AIR registration no." name="air_registration_number"  value={this.state.air_registration_number} onChange={this.hanleTextChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="participants_name">Participant Name:</label>
                        <input type="text" className="form-control" id="participant_name" placeholder="Enter Name Of the Participant" name="participant_name"  value={this.state.participant_name} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="participant_sex">Sex:</label>
                        <select className="form-control" id="participant_sex"  name="participant_sex"  value={this.state.participant_sex} onChange={this.hanleTextChange}>

                            <option value="0">----Choose Sex----</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="participant_dob">DOB(Date Of Birth):</label>
                        <input type="date" className="form-control" id="participant_dob" name="participant_dob"  value={this.state.participant_dob} onChange={this.hanleTextChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="participant_mobileno">Mobile Number:</label>
                        <input type="text" className="form-control" id="participant_mobileno" placeholder="Enter Mobile Number" name="participant_mobileno"  value={this.state.participant_mobileno} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="participant_email">Email ID:</label>
                        <input type="text" className="form-control" id="participant_email" placeholder="Enter Email ID" name="participant_email"  value={this.state.participant_email} onChange={this.hanleTextChange} />
                    </div>


                    <div className="form-group">
                        <label htmlFor="participant_blood_group">Blood Group:</label>
                        <select className="form-control" id="participant_blood_group"  name="participant_blood_group"  value={this.state.participant_blood_group} onChange={this.hanleTextChange}>

                            <option value="0">----Choose Blood Group----</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="AB">AB</option>
                            <option value="O">O</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="AB+">AB+</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="emergency_contact_person">Emergency contact person:</label>
                        <input type="text" className="form-control" id="emergency_contact_person" placeholder="Enter Emergency contact person Name" name="emergency_contact_person"  value={this.state.emergency_contact_person} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ecp_telephone_number">Emergency contact person telephone number:</label>
                        <input type="text" className="form-control" id="ecp_telephone_number" placeholder="Enter Emergency contact person telephone number" name="ecp_telephone_number"  value={this.state.ecp_telephone_number} onChange={this.hanleTextChange} />
                    </div>


                    <button type="submit" className="btn btn-primary">ADD</button>
                    </form>
                </div>  
            </>
        )
     }



}