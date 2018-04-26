import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react';

import {createJobCard} from '../api/allApi.js'
import Rand from 'random-key';
import { getLorryDetail }  from '../api/allApi';


export default class CreateJobCard extends Component {
  state = {
    loading: true,
    lorryObj : {}
  }


  componentDidMount () {
  //  console.log(this.props.match.params.id)
  }

  handleVehicleChange = (e, {name, value}) => {
    let vehicleValue = value.toUpperCase();
    //we should not fire this call for every character change..do it on submit of lens icon
    getLorryDetail(vehicleValue).then((data) => {
      let lorryObj = data.val() || {};
      this.setState({
        lorryObj,
        vehicleNumber : vehicleValue
      })
    }).catch((e) => console.log(e))
  }

  handleChange = (e, {name , value}) =>{
    console.log(value);
      this.setState({ [name]: value } , ()=>{console.log(this.state)});
  }

 handleSubmit = () => {
   console.log(this.state);
   let data = Object.assign({}, this.state);
  // let copy = {{} , ...this.state};
   let now = new Date();
   data.date = now.toString();
   data.id = this.generateOrderID(data.vehicleNumber , now)
   createJobCard(data).then(() => {
     alert('Successfully saved jobcard');
     this.setState({ navigateBack: true })
   }).catch((e) => {
     console.log(e);
   })
 }

 generateOrderID(vehicleNumber , now){
   if(!vehicleNumber)
   return null
   let monthsText=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
   let year = now.getFullYear();
   let mathRandom = Rand.generateBase30(2);
   let jobCardId= (now.getDate()).toString()  + (now.getMonth()+1)  +
   vehicleNumber.toUpperCase() + '-' + mathRandom;
   return jobCardId;
 }

  render () {

    const pStyle = {
      marginLeft: '40px',
      marginRight:'40px'
    };

    const mStyle = {
      marginTop: '40px'
    };

    const durationOptions = [
      { key: '1', text: '1 day', value: '1' },
      { key: '2', text: '2 days', value: '2' },
      { key: '3', text: '3 days', value: '3' },
      { key: '4', text: '4 days', value: '4' },
      { key: '5', text: '5 days', value: '5' },
      { key: '6', text: '6 days', value: '6' },
      { key: '7', text: '1 week', value: '7' },
      { key: '8', text: '1.5 week', value: '10' },
      { key: '9', text: '2 weeks', value: '14' },
      { key: '10', text: '3 weeks', value: '21' },
      { key: '11', text: '1 month', value: '30' }
    ];
        const options = [
      { key: 'angular', text: 'Angular', value: 'angular' },
      { key: 'css', text: 'CSS', value: 'css' },
      { key: 'design', text: 'Graphic Design', value: 'design' },
      { key: 'ember', text: 'Ember', value: 'ember' },
      { key: 'html', text: 'HTML', value: 'html' },
      { key: 'ia', text: 'Information Architecture', value: 'ia' },
      { key: 'javascript', text: 'Javascript', value: 'javascript' },
      { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
      { key: 'meteor', text: 'Meteor', value: 'meteor' },
      { key: 'node', text: 'NodeJS', value: 'node' },
      { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
      { key: 'python', text: 'Python', value: 'python' },
      { key: 'rails', text: 'Rails', value: 'rails' },
      { key: 'react', text: 'React', value: 'react' },
      { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
      { key: 'ruby', text: 'Ruby', value: 'ruby' },
      { key: 'ui', text: 'UI Design', value: 'ui' },
      { key: 'ux', text: 'User Experience', value: 'ux' },
    ];

    const complaintTypeOptions = [
      { key: 'electrical', text: 'Electrical', value: 'Electrical' },
      { key: 'mechanical', text: 'Mechanical', value: 'Mechanical' },
      { key: 'other', text: 'Other', value: 'Other' }
    ];

    const categoryOptions = [
      { key: 'engine', text: 'Engine', value: 'Engine' },
      { key: 'gearbox', text: 'Gear Box', value: 'Gear Box' },
      { key: 'battery', text: 'Battery', value: 'Battery' },
      { key: 'other', text: 'Other', value: 'Other' }
    ];

    const checkedByOptions = [
      { key: 'Raju', text: 'Raju', value: 'Raju' },
      { key: 'Venkat', text: 'Venkat', value: 'Venkat' },
      { key: 'Rakesh', text: 'Rakesh', value: 'Rakesh' },
      { key: 'Prashant', text: 'Prashant', value: 'Prashant' },
      { key: 'Kumar', text: 'Kumar', value: 'Kumar' }
    ];

    const { loading, teamNames, articles,name, email, lorryObj , navigateBack=false } = this.state
    const { match } = this.props


    if(navigateBack) {
      const url = "/jobcards";
      return <Redirect push to={url}/>
    }


    return (
      <div>
        <Form style={pStyle} onSubmit={this.handleSubmit}>
          <Form.Field  inline={true} control={Input}
          label={<Label color="teal" size="large">Vehicle Number</Label>}
           >
          <Input size="large"
          placeholder='Search...' name="vehicleNumber" onChange={this.handleVehicleChange}
          icon={{ name: 'search', circular: true, link: true }}
          />
          </Form.Field>

          <Grid style={mStyle} divided='vertically'>
    <Grid.Row columns={3}>
      <Grid.Column>
      <Table celled striped>
      <Table.Body>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Make
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
      {lorryObj.make}
      </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Number of Tyres
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
      {lorryObj.numberOfTyres}
      </Table.Cell>
      </Table.Row>

      </Table.Body>
      </Table>
      </Grid.Column>
      <Grid.Column>
      <Table celled striped>
      <Table.Body>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Model Number
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
        {lorryObj.model}
      </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Driver Name
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
        {lorryObj.driverName || 'Not Available'}
      </Table.Cell>
      </Table.Row>

      </Table.Body>
      </Table>
      </Grid.Column>
    </Grid.Row>
    </Grid>
    <Form.Group style={mStyle} widths={3}>
         <Form.Field control={Dropdown} fluid label='Complaint Type'
             placeholder='Electrical' fluid multiple selection options={complaintTypeOptions} name="complaintType"  onChange={this.handleChange}>
          </Form.Field>
         <Form.Select fluid label='Category' options={categoryOptions}  name="complaintCategory"  onChange={this.handleChange} />
         <Form.Select fluid label='Checked by' options={checkedByOptions}  name="checkedBy"  onChange={this.handleChange} />

   </Form.Group>
   <Form.Group style={mStyle} widths={3}>
   <Form.Field width={3} control={Input} label='Previous Meter Reading' name="previousMeterReading" placeholder='3400'
   onChange={this.handleChange} >
    </Form.Field>
    <Form.Field width={2} control={Input} label='Present Reading' name="presentReading" placeholder='4300'
    onChange={this.handleChange} >
     </Form.Field><Form.Field width={2} control={Input} label='ODOMeter Reading(KM)' name="odometerReading" placeholder='12000'
     onChange={this.handleChange} >
      </Form.Field>

  </Form.Group>
   <Form.Group style={mStyle} widths={2}>
          <Dropdown
           button
           width={3}
           className='icon'
           floating
           labeled
           icon='time'
           name="duration"
           options={durationOptions}
           defaultValue="1"
           search
           selection
           onChange={this.handleChange}
         />

         <Form.Select fluid label='Mechanic Alloted' name="mechanicAllotted" options={checkedByOptions} placeholder='Raju' onChange={this.handleChange}/>


  </Form.Group>
  <Form.Field label='Complaint description' control={TextArea} name="description" rows='3' width={6} onChange={this.handleChange}/>
            <Form.Field control={Button} color='green' content='SUBMIT' width={3} />
       </Form>
      </div>
    )
  }
}
