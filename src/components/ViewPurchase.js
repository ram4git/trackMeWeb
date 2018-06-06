import React, { Component, Fragment } from 'react';
import { getPurchaseItem } from '../api/allApi.js';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import ViewPurchaseTable from '../lib/ViewPurchaseTable.js'
import Button from 'material-ui/Button';
import { Print } from 'react-easy-print';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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

  onPrintingPurchase = () => {
    const { purchaseItem, purchaseID } = this.state;
    console.log(purchaseItem);
    console.log(this.state)
    return (
      <Print name='purchase' exclusive>
      <Card>
        <CardContent>
         <Typography>
         Nithya menon
         </Typography>
        </CardContent>
      </Card>
      </Print>
    )
  }

  render() {
    const { purchaseID, purchaseItem } = this.state;

    if(!purchaseItem)
    return null;

    return (
      <Fragment>
      <Paper style={{marginLeft:'120px', width:'80%'}}>
      <h1 style={{textDecoration: 'underline', marginLeft: '320px'}}>PURCHASE ORDER</h1>
      <h1 style={{marginLeft:'200px'}}>Sri Lalitha Enterprises Industries Pvt Ltd</h1>
      <h3 style={{marginLeft:'300px'}}>Valuthimmapuram Road, Peddapuram,</h3>
      <strong><p style={{marginLeft:'270px'}}>Ph No :0884-2326661/2 Email :lalitharice@gmail.com</p></strong>
      <h3 style={{marginLeft:'320px'}}>GSTIN: 37AAKCS3233N1ZX</h3>
      <Table>
        <TableBody>
           <TableRow>
            <TableCell>Purchase Order No.</TableCell>
            <TableCell>{purchaseID}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell>{purchaseItem.createdAt}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>{purchaseItem.companyName}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>{purchaseItem.address}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>Current Owner</TableCell>
            <TableCell>{purchaseItem.currentOwner}</TableCell>
           </TableRow>
           <TableRow>
            <TableCell>STATUS</TableCell>
            <TableCell><span style={{color:"red"}}>{ purchaseItem.status || "OPEN"}</span></TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </Paper>
    <ViewPurchaseTable items={purchaseItem} purchaseID={purchaseID} />
    <div style={{marginLeft:'480px'}}>
    <Button variant='raised' color='secondary' onClick={this.onPrintingPurchase}>
    Print Purchase Order
    </Button>
    </div>
    
  </Fragment>
    )
  }
}
