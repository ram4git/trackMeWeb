import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react';

import { addLorry } from '../api/allApi.js'
import Rand from 'random-key';
import TextField from 'material-ui/TextField';


export default class AddLorry extends Component {
  state = {
    loading: true,
    navigateToHomePage : false
  }


  componentDidMount () {
  //  console.log(this.props.match.params.id)
  }

  handleDateChange = (event, object) => {
    this.setState({
      dateOfPurchase: event.target.value
    })
  }

  handleChange = (e, {name , value}) =>{
      this.setState({ [name]: value } , ()=>{console.log(this.state)});
  }

 handleSubmit = () => {
   console.log(this.state);
   let data = Object.assign({}, this.state);
   delete data['navigateToHomePage']
   delete data['loading']
  // let copy = {{} , ...this.state};
   let now = new Date();
   data.lastModifiedTime = now;
   addLorry(data).then(() => {
    alert('successfully saved');
    this.setState({
      navigateToHomePage: true
    })
   }
 ).catch((e) => console.log(e))
   this.setState({ email: '', name: '' })
 }



  render () {
    const { navigateToHomePage } = this.state;
    if(navigateToHomePage) {
      return <Redirect push to="/lorries" />
    }

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
      { key: 'ashokleyland', text: 'ASHOK LEYLAND', value: 'ASHOK LEYLAND' },
      { key: 'tata', text: 'TATA', value: 'TATA' },
      { key: 'eicher', text: 'EICHER', value: 'EICHER' },
      { key: 'bharatbenz', text: 'BHARAT BENZ', value: 'BHARAT BENZ' }
    ]

    const vehicleTypeOptions = [
    { key: 'lorry', text: 'Lorry', value: 'Lorry' },
    { key: 'truck', text: 'Truck', value: 'Truck' },
    { key: 'van', text: 'Van', value: 'Van' },
    { key: 'auto', text: 'Auto', value: 'Auto' }
    ]

    const modelOptions = [
    { key: '2214super', text: '2214 Super', value: '2214 Super' },
    { key: '1613', text: '1613', value: '1210' },
    { key: '1210', text: '1210', value: '1210' },
    { key: '1212', text: '1212', value: '1212' },
    { key: '1112', text: '1112', value: '1112' },
    { key: '3723', text: '3723', value: '3723' },
    { key: '3718', text: '3718', value: '3718' }

    ]

    const tyreOptions = [
    { key: '6', text: '6', value: '6' },
    { key: '10', text: '10', value: '10' },
    { key: '14', text: '14', value: '14' }
    ]

    const capacityOptions = [
      { key: '10', text: '10', value: '10' },
      { key: '17', text: '17', value: '17' },
      { key: '25', text: '25', value: '25' }
    ]

    const { loading, teamNames, articles } = this.state
    const { match } = this.props

    const { name, email } = this.state


    return (
      <Fragment>
        <Form style={pStyle} onSubmit={this.handleSubmit}>
        <Form.Group style={mStyle} widths={2}>
        <Form.Field width={4} control={Input} label='Vehicle Number' name="vehicleNumber" placeholder='KA12NM9999'
        onChange={this.handleChange} >
         </Form.Field>
         <Form.Field width={4} control={Input} label='Vehicle Code' name="vehicleCode" placeholder='xxxx'
         onChange={this.handleChange} >
          </Form.Field>
          <Form.Field width={4} control={Select} options={vehicleTypeOptions} label='Vehicle Type' name="vehicleType" placeholder='xxxx'
          onChange={this.handleChange} >
           </Form.Field>
       </Form.Group>

    <Form.Group style={mStyle} widths={3}>

         <Form.Select fluid label='Make' options={options}  name="make" placeholder='make' onChange={this.handleChange} />
         <Form.Select fluid label='Model' options={modelOptions}  name="model" placeholder='model' onChange={this.handleChange} />

   </Form.Group>
   <Form.Group style={mStyle} widths={3}>

        <Form.Select fluid label='Number Of Tyres' options={tyreOptions}  name="numberOfTyres" placeholder='no. of tyres' onChange={this.handleChange} />
        <Form.Select fluid label='Capacity (In tonnes)' options={capacityOptions}  name="capacity" placeholder='capacity' onChange={this.handleChange} />

  </Form.Group>
   <Form.Group style={mStyle} widths={3}>
   <Form.Field width={3} control={Input} label='VNO' name="vno" placeholder='3400'
   onChange={this.handleChange} >
    </Form.Field>
    <Form.Field width={3} control={Input} label='Engine Number' name="engineNumber" placeholder='LNH528936'
    onChange={this.handleChange} >
     </Form.Field>
     <Form.Field width={3} control={Input} label='Chasis Number' name="chasisNumber" placeholder='BNR254748'
     onChange={this.handleChange} >
      </Form.Field>
   </Form.Group>
   <form  noValidate>
     <TextField
       id="date"
       label="Date Of Purchase"
       type="date"
       onChange={this.handleDateChange}
       InputLabelProps={{
         shrink: true,
       }}
     />
   </form>
  <Form.Field style={{marginTop : '5%'}} control={Button} color='green' content='SUBMIT' width={3} />
 </Form>
</Fragment>
    )
  }
}
