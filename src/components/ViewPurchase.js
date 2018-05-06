import React, { Component, Fragment } from 'react';
import { getPurchaseItem } from '../api/allApi.js';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import ViewPurchaseTable from '../lib/ViewPurchaseTable.js'



export default class ViewPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const purchaseID = this.props.match.params.id;
    getPurchaseItem(purchaseID).then((data) => {
      this.setState({
        purchaseItem: data.val(),
        purchaseID
      })
    }).catch((e) => console.log(e))
  }

  render() {

    const { purchaseID, purchaseItem } = this.state;

    if(!purchaseItem)
    return null;

    console.log(purchaseItem)
    return (
      <Fragment>
      <Paper style={{margin:'5%',marginLeft:'350px', width:'40%'}}>
      <Table>
        <TableBody>
           <TableRow>
            <TableCell>Purchase Id</TableCell>
            <TableCell>{purchaseID}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell></TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>{purchaseItem.companyName}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>{purchaseItem.address}</TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <ViewPurchaseTable items={purchaseItem} purchaseID={purchaseID} />
  </Fragment>
    )
  }
}
