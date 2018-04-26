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
      
    let returnObj = [];
    let lorryJobCards = lorryDetails.jobCards;
    if(lorryJobCards) {
      lorryJobCards.map((jobCard) => {
      let cardProps = {
        text : {
          title : jobCard.jobCardID,
          id : jobCard.jobCardID,
          detail : jobCard.createdDate
        },
        onButtonClickPath : 'jobcard'
      }
        returnObj.push(<div style = {{width :'70%', marginLeft:'5%'}} key={jobCard.jobCardID} className='card'>
                        <SimpleCard {...cardProps} />
                       </div>)
      })
    }


    console.log(lorryDetails)
    return (
      <Fragment>
      <Paper style={{margin:'5%', width:'30%'}}>
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
            <TableCell>Vehicle Type</TableCell>
            <TableCell>{lorryDetails.vehicleType}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Make</TableCell>
            <TableCell>{lorryDetails.make}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Model</TableCell>
            <TableCell>{lorryDetails.model}</TableCell>
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
            <TableCell>VNO</TableCell>
            <TableCell>{lorryDetails.vno}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Engine Number</TableCell>
            <TableCell>{lorryDetails.engineNumber}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Chasis Number</TableCell>
            <TableCell>{lorryDetails.chasisNumber}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Date of Purchase</TableCell>
            <TableCell>{lorryDetails.dateOfPurchase}</TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <h2 style={{ marginLeft :'5%'}} >All jobcards for this vehicle : </h2>
      {returnObj}
    </Fragment>
    )
  }
}

export default ViewLorry
