import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { getJobCardDetail } from '../api/allApi.js'

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

  render() {
  const { jobCard } = this.state;
  if(!jobCard) {
   return null;
 }
    return (
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
            <TableCell>Indents</TableCell>
            <TableCell>{jobCard.indents}</TableCell>
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
    )
  }
}
