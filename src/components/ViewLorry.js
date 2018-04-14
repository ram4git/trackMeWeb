import React, { Component, Fragment } from 'react';
import SimpleCard from '../lib/SimpleCard.js'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { getLorryDetail } from '../api/allApi.js';


class ViewLorry extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { lorryNumber } = this.props;
    getLorryDetail(lorryNumber).then((data) => {
      this.setState({
        lorryDetails: data.val(),
        id: lorryNumber
      })
      console.log(this.state)
    }).catch((e) => console.log(e))
  }

  render() {
    const { id, lorryDetails } = this.state;
    if(!lorryDetails)
      return null;

    console.log(lorryDetails)
    return (
      <Fragment>
      <Paper>
      <Table>
        <TableBody>
           <TableRow>
            <TableCell>Vehicle Number</TableCell>
            <TableCell>{id}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Vehicle Code</TableCell>
            <TableCell>{lorryDetails.vehicleCode}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Chasis Number</TableCell>
            <TableCell>{lorryDetails.chasisNumber}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Engine Number</TableCell>
            <TableCell>{lorryDetails.date}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Number Of Tyres</TableCell>
            <TableCell>{lorryDetails.numberOfTyres}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Capacity</TableCell>
            <TableCell>{lorryDetails.capacity}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>{lorryDetails.model}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Make</TableCell>
            <TableCell>{lorryDetails.make}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>VNO</TableCell>
            <TableCell>{lorryDetails.vno}</TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </Paper>
    </Fragment>
    )
  }
}

export default ViewLorry
