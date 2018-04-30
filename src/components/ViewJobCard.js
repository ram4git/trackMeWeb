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
           this.setState({jobCard : data.val()});
        }).catch((e) => console.log(e))
    }
    this.setState({
      id : jobCardID,
      jobCard
    })
  }

  redirect() {
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
    return <Redirect push to={{pathname: '/indent/0',
    params: {jobCardID: this.state.id,
             vehicleNumber : this.state.jobCard.vehicleNumber,
             modelNumber : this.state.jobCard.modelNumber }
           }}/>;
         }

   const pStyle = {
     float: 'right',
     margin: '3%'
   };
  const { jobCard } = this.state;
  if(!jobCard) {
   return null;
 }
 let returnObj = [];
 let jobCardIndents = jobCard.indents;
 if(jobCardIndents) {
   jobCardIndents.map((indent) => {
   let cardProps = {
     text : {
       title : indent.indentID,
       id : indent.indentID,
       detail : indent.status
     },
     onButtonClickPath : 'indent'
   }
     returnObj.push(<div style = {{width :'70%', marginLeft:'5%'}} key={indent.indentID} className='card'>
                     <SimpleCard {...cardProps} />
                    </div>)
   })
 }

    return (
      <Fragment>
      <div style={pStyle}>
      <Button color="primary" variant="raised" onClick={() => this.redirect()} >Create Indent</Button>
      </div>
      <Paper style={{margin:'5%', width:'30%'}}>
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
            <TableCell>Mechanic Allotted</TableCell>
            <TableCell>{jobCard.mechanicAllotted}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Odometer Reading</TableCell>
            <TableCell>{jobCard.odometerReading}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Present Reading</TableCell>
            <TableCell>{jobCard.presentReading}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Previous Meter Reading</TableCell>
            <TableCell>{jobCard.previousMeterReading}</TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <h2 style={{ marginLeft :'5%'}} >Indents for job : </h2>
      {returnObj}
    </Fragment>
    )
  }
}
