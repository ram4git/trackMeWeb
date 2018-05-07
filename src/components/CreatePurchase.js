import React, { Component, Fragment } from 'react';
import SimpleExpansionPanel from '../lib/SimpleExpansionPanel.js';
import { getAllIndents, createPurchase } from '../api/allApi.js';
import PurchaseOrder from './PurchaseOrder';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from 'material-ui/transitions/Slide';
import Table from '../lib/Table.js';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions,
                 DialogContent,
                 DialogContentText,
                 DialogTitle
               } from 'material-ui/Dialog';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class CreatePurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indents: {},
      open: false
    }
}


componentDidMount() {
  getAllIndents().then((data) => {
    this.setState({
      indents: data.val()
    })
  }).catch((e) => console.log(e))
}

  onIndentItemSelectedForPurchase = (indentItem) => {
   const { purchaseItems={} , indents } =  this.state;
   const indentID = indentItem['indentID'];
   const partNumber = indentItem['partNumber'];

   const indentDetails = indents[indentID];

   indentDetails.items.forEach((item) => {
     if(item.partNumber === partNumber) {
        const itemsOfIndent =  purchaseItems[indentID] || {}
        itemsOfIndent[partNumber] = Object.assign({}, item);
        item.selectedForPurchase = true;
        purchaseItems[indentID] = itemsOfIndent;
         this.aggregateItems(purchaseItems);
     }
   })
 }


 aggregateItems(purchaseItems) {
   let { itemsInPurchaseOrder = {} } = this.state ;
   Object.keys(purchaseItems).forEach((indentID) => {
     let itemsOfIndent = purchaseItems[indentID];

     Object.keys(itemsOfIndent).forEach((partNumber) => {
       const it = itemsInPurchaseOrder[partNumber];
       if(it == null) {
         const ob = itemsOfIndent[partNumber];
         const qty = ob['quantityRequired'];
         ob['split'] = {};
         ob['split'][indentID] = qty;
         ob['itemInPurchase'] = true;
         itemsInPurchaseOrder[partNumber] = ob ;
       }else {
         let qty = itemsOfIndent[partNumber]['quantityRequired'];
         it['split'][indentID] = qty;
         it['quantityRequired'] = (Number(it['quantityRequired']) +  Number(qty)).toString();
       }
     })
   });

 this.setState({
   itemsInPurchaseOrder
 });
 }

onPurchaseOrderClick = () => {
  const { itemsInPurchaseOrder, companyName, address } = this.state;

  if(!companyName || !address) {
  return <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
}
  else {
  itemsInPurchaseOrder['companyName'] = companyName;
  itemsInPurchaseOrder['address'] = address;
  let now = new Date();
  let monthsText=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  let year = now.getFullYear();
  let mathRandom = Math.floor((Math.random())*1000);
  let orderId= (now.getDate()).toString()  + monthsText[now.getMonth()] + (now.getFullYear()%100).toString() + '-'+
                 mathRandom.toString();
  createPurchase(orderId, itemsInPurchaseOrder).then(() => {
    alert('Successfully saved purchase items');
    setTimeout(function() {
       this.setState({open: false});
       const localStorage = window.localStorage;
       window.location.href='/purchases';
      try {
          localStorage.removeItem('keys');
          localStorage.removeItem('blabla');
        }catch(e) {

        }
     }.bind(this), 3000);
  }).catch((e) => console.log(e))
}
}

  onClickOfPurchaseOrder = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;

    const { indents, purchaseItems, itemsInPurchaseOrder, companyName, address } = this.state;

    console.log(companyName);
    console.log(address);

    const btnStyle = {
      position: 'fixed',
      bottom:'1px',
      right: '5px'
    }

  let indentItemsArr = []

  Object.keys(indents).map((indent) => {
    const indentVal = indents[indent];
        const expansionPanelProps = {
          text : {
          header: indent,
          items: indentVal.items,
          numOfItems: indentVal.items.length,
        },
        onIndentItemSelectedForPurchase : this.onIndentItemSelectedForPurchase

      }
      indentItemsArr.push(<div key={indent} style={{
         marginLeft : '20px' , marginBottom : '50px' }} ><SimpleExpansionPanel {...expansionPanelProps} /></div>)
})
  return (
    <Fragment>
    <div style={{width: '100%'}}>
    <div style={{float:'left', width: '50%'}}>
    {indentItemsArr}
    </div>
    <div style={{float: 'right', width: '50%'}}>
    <PurchaseOrder items={itemsInPurchaseOrder} />
    </div>
    </div>
    <div style={btnStyle}>
    <Button variant='raised' color='primary' onClick={this.onClickOfPurchaseOrder}>
    GENERATE PURCHASE ORDER
    </Button>
    </div>
    <div>
    <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          transition={Transition}>
          <AppBar>
            <Toolbar style={{float:'right'}}>
              <IconButton color="inherit"  aria-label="Close" onClick={this.handleClose} >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Table items={itemsInPurchaseOrder}/>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Company Name" onChange={this.handleChange('companyName')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Address" onChange={this.handleChange('address')} />
          </div>
          <div style={{marginTop:'40px', marginLeft:'480px'}}>
          <Button variant='raised' color='primary' onClick={this.onPurchaseOrderClick}>
          SUBMIT
          </Button>
          </div>
        </Dialog>
        </div>
    </Fragment>
  )
 }
}
