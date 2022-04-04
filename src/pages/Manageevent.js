import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import {NotificationManager} from 'react-notifications';
import cookie from 'react-cookies';

export default class Manageevent extends Component{

    constructor(props){

        super(props)
        this.state={
            
            todos: [],
            loadingForm:false,
            event_name:'',
            city:'',
            event_date:'',
            event_time:'',
            number_of_participants:'',
            event_distance:'',
            createdBy:cookie.load('admindata')._id


        }

        this.hanleTextChange = this.hanleTextChange.bind(this)
    }



    componentDidMount(){
        axios.get(`http://localhost:5000/api/event/list/${cookie.load('admindata')._id}`)
        .then(response=>{
           console.log(response.data.data)
            // this.setState({
            //     list:response.data.data
            // })

            
           
           
        })
    }

    hanleTextChange(e){
        // console.log(e.target.value)
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
        axios.post('http://localhost:5000/api/event/store',this.state)
        .then(response=>{
            // console.log(response)

            if(response.data.message=='valid'){
                this.setState({
                    loadingForm:false,
                    event_name:'',
                    city:'',
                    event_date:'',
                    event_time:'',
                    number_of_participants:'',
                    event_distance:'',
                    createdBy:''
                })

                NotificationManager.success('Event has been added successfully!');
                // this.props.history.push('/mangeadmin');
            }else{
                this.setState({loadingForm:false})
                NotificationManager.warning('Event Name Already Exists!');
            }
        })
    }

     render(){

        return(

            <>
             <div className="container">
             <h2>EVENT LISTS</h2>
             <table class="table">
                    <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>City</th>
                        <th>Event Date</th>
                        <th>Start Time Of Event</th>
                        <th>Number Of Participants</th>
                        <th>Distance in km(/mile?)</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    </tbody>
                </table>
                 
                    <h2>ADD EVENT</h2>
                    <form onSubmit={this.handleSubmit} loading={this.state.loadingForm}>
                    <div className="form-group">
                        <label htmlFor="event_name">Name of the organisation:</label>
                        <input type="text" className="form-control" id="event_name" placeholder="Enter Name of the Event" name="event_name"  value={this.state.event_name} onChange={this.hanleTextChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" className="form-control" id="city" placeholder="Enter City" name="city"  value={this.state.city} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="event_date">Date Of Event:</label>
                        <input type="date" className="form-control" id="event_date" placeholder="Enter Date Of Event" name="event_date"  value={this.state.event_date} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="event_time">Start Time Of Event:</label>
                        <input type="time" className="form-control" id="event_time" placeholder="Enter Event Start Time" name="event_time"  value={this.state.event_time} onChange={this.hanleTextChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="number_of_participants">Number Of Participants:</label>
                        <input type="text" className="form-control" id="number_of_participants" placeholder="Enter Number Of Participants" name="number_of_participants"  value={this.state.number_of_participants} onChange={this.hanleTextChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="event_distance">Distance in km(/mile?):</label>
                        <input type="text" className="form-control" id="event_distance" placeholder="Enter Event Start Time" name="event_distance"  value={this.state.event_distance} onChange={this.hanleTextChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">ADD</button>
                    </form>
                </div>  
            </>
        )
     }



}