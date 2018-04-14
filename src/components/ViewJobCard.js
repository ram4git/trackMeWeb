import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { getJobCardDetail } from '../api/allApi.js'
import Button from 'material-ui/Button';
import SimpleCard from '../lib/SimpleCard.js'

export default class ViewJobCard extends Component {

  constructor() {
    super();
    this.state = {}
  }


  componentDidMount () {
    const { jobCardID } = this.props;
    let jobCard;
    if(window.localStorage.jobCards) {
    let jobCards = JSON.parse(window.localStorage.jobCards);
    let jobCard =  jobCards[jobCardID];
}
    if(!jobCard){
      getJobCardDetail(jobCardID).then((data) => {
        console.log(data.val())
           this.setState({jobCard : data.val()});
        }).catch((e) => console.log(e))
    }
    this.setState({
      id : jobCardID,
      jobCard
    })
      console.log(this.props);
  }

  redirect() {
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
    return <Redirect push to={{pathname: '/indent/0',
    params: {jobCardID: this.state.id,
             vehicleNumber : this.state.jobCard.vehicleNumber,
             modelNumber : this.state.jobCard.modelNumber || 'MK1312'}
           }}/>;
         }

   const pStyle = {
     float: 'right'
   };
  const { jobCard } = this.state;
  console.log(jobCard);
  if(!jobCard) {
   return null;
 }
 let returnObj = [];
 let jobCardIndents = jobCard.indents;
 let allIndents = '';
 if(jobCardIndents) {
   jobCardIndents.map((indent) => {
     allIndents+=indent.id
   let cardProps = {
     text : {
       title : indent.id,
       id : indent.id,
       detail : indent.status
     },
     onButtonClickPath : 'indents'
   }
     returnObj.push(<div className='card'><SimpleCard {...cardProps} /></div>)
   })
 }

    return (
      <Fragment>
      <div style={pStyle}>
      <Button color="secondary" variant="raised" onClick={() => this.redirect()} >Create Indent</Button>
      </div>
      <Paper>
      <Table>
        <TableBody>
           <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{jobCard.id}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Vehicle Number</TableCell>
            <TableCell>{jobCard.vehicleNumber}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Checked By</TableCell>
            <TableCell>{jobCard.checkedBy}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Complaint Category</TableCell>
            <TableCell>{jobCard.complaintCategory}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Complaint Type</TableCell>
            <TableCell>{jobCard.complaintType}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>{jobCard.date}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{jobCard.description}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Duration</TableCell>
            <TableCell>{jobCard.duration}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Loading</TableCell>
            <TableCell>{jobCard.loading}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Mechanic Allotted</TableCell>
            <TableCell>{jobCard.mechanicAllotted}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Odometer Reading</TableCell>
            <TableCell>{jobCard.odometerReading}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Preset Reading</TableCell>
            <TableCell>{jobCard.presetReading}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Previous Meter Reading</TableCell>
            <TableCell>{jobCard.previousMeterReading}</TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </Paper>
      {this.returnObj}
    </Fragment>
    )
  }
}
