import React, { Component, Fragment } from 'react';
import SimpleExpansionPanel from '../lib/SimpleExpansionPanel.js';
import { getAllIndents, createPurchase , getAllItemsForIndentAndUpdate } from '../api/allApi.js';
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
import { Print } from 'react-easy-print';
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
      open: false,
      submitPurchaseClicked: false
    }
}


componentDidMount() {
  let filteredIndents = {};
  getAllIndents().then((data) => {
    let allIndents = data.val();
    Object.keys(allIndents).map(indent => {
      if(allIndents[indent].status === "OPEN" && allIndents[indent].currentOwner === 'PURCHASE'){
        filteredIndents[indent] = allIndents[indent];
      }
    })
    this.setState({
      indents: filteredIndents
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

 onIndentItemRemovedForPurchase = (indentItem) => {
  const { indents, itemsInPurchaseOrder } =  this.state;
  const indentID = indentItem['indentID'];
  const partNumber = indentItem['partNumber'];

  const indentDetails = indents[indentID];

  indentDetails.items.forEach((item) => {
    if(item.partNumber === partNumber) {
       item.selectedForPurchase = false;
       delete itemsInPurchaseOrder['parts'][partNumber];
    }
  });
  this.setState({
    indents
  })
}




 aggregateItems(purchaseItems) {
   let { itemsInPurchaseOrder = {} } = this.state ;

   if(!itemsInPurchaseOrder.parts) {
      itemsInPurchaseOrder.parts = {}
   }

   Object.keys(purchaseItems).forEach((indentID) => {
     let itemsOfIndent = purchaseItems[indentID];

     Object.keys(itemsOfIndent).forEach((partNumber) => {
       const it = itemsInPurchaseOrder['parts'][partNumber];
       if(it == null) {
         const ob = itemsOfIndent[partNumber];
         const qty = ob['quantityPurchase'];
         ob['split'] = {};
         ob['split'][indentID] = qty;
         ob['itemInPurchase'] = true;
         itemsInPurchaseOrder['parts'][partNumber] = ob ;
       }else {
         let quanty = itemsOfIndent[partNumber]['quantityPurchase'];
         it['split'][indentID] = quanty;
         it['quantityRequired'] = (Number(it['quantityPurchase']) +  Number(quanty)).toString();
         it['quantityPurchase'] = (Number(it['quantityPurchase']) +  Number(quanty)).toString();

       }
     })
   });

 this.setState({
   itemsInPurchaseOrder
 });
 }

onPurchaseOrderClick = () => {
  const { itemsInPurchaseOrder,
          description,
          uom,
          quantity,
          rate,
          gross,
          disc,
          discAmount,
          netValue,
          gst,
          payment,
          transport,
          delivery,
          pf,
          otherTerms,
          companyName,
          address
        } = this.state;
  itemsInPurchaseOrder['description'] = description;
  itemsInPurchaseOrder['uom'] = uom;
  itemsInPurchaseOrder['quantity'] = quantity;
  itemsInPurchaseOrder['rate'] = rate;
  itemsInPurchaseOrder['gross'] = gross;
  itemsInPurchaseOrder['disc'] = disc;
  itemsInPurchaseOrder['discAmount'] = discAmount;
  itemsInPurchaseOrder['netValue'] = netValue;
  itemsInPurchaseOrder['gst'] = gst;
  itemsInPurchaseOrder['payment'] = payment;
  itemsInPurchaseOrder['transport'] = transport;
  itemsInPurchaseOrder['delivery'] = delivery;
  itemsInPurchaseOrder['pf'] = pf;
  itemsInPurchaseOrder['otherTerms'] = otherTerms;
  itemsInPurchaseOrder['companyName'] = companyName;
  itemsInPurchaseOrder['address'] = address;

  console.log(itemsInPurchaseOrder)
  let now = new Date();
  let monthsText=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  let year = now.getFullYear();
  let mathRandom = Math.floor((Math.random())*1000);
  let orderId= (now.getDate()).toString()  + monthsText[now.getMonth()] + (now.getFullYear()%100).toString() + '-'+
                 mathRandom.toString();


  createPurchase(orderId, itemsInPurchaseOrder).then(() => {
    alert('Successfully saved purchase items');
  }).catch((e) => console.log(e))
  this.setState({
    submitPurchaseClicked: true,
    orderId
  })
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
  }

  onViewingPurchaseOrder = () => {
    this.setState({
      submitPurchaseClicked: false
    })
    window.location.href='/createPurchase';
  }


  render() {

    console.log(this.state)
    const { classes } = this.props;

    const { indents,
            purchaseItems,
            itemsInPurchaseOrder = {},
            submitPurchaseClicked,
            orderId } = this.state;

let path = '/purchase/' + orderId
    if(submitPurchaseClicked && orderId) {
      let path = '/purchase/'+orderId;
      return (
        <Dialog
        open={this.state.submitPurchaseClicked}
          onClose={this.handleClose}>
          <DialogTitle>Successfully Created Purchase Order.</DialogTitle>
          <DialogContent>
            <DialogContentText>
               You can view the purchase order here <a href={path}>{orderId}</a>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onViewingPurchaseOrder} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      )
    }
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
    <PurchaseOrder items={itemsInPurchaseOrder} onIndentItemRemovedForPurchase={this.onIndentItemRemovedForPurchase} />
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
          <Table style={{marginTop : '80px'}} items={itemsInPurchaseOrder.parts}/>
          <div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Description" onChange={this.handleChange('description')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="UOM" onChange={this.handleChange('uom')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Qty" onChange={this.handleChange('quantity')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="RATE" onChange={this.handleChange('rate')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Gross" onChange={this.handleChange('gross')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Disc" onChange={this.handleChange('disc')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Disc Amt" onChange={this.handleChange('discAmount')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="Net Value" onChange={this.handleChange('netValue')} />
          </div>
          </div>
          <div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="GST" onChange={this.handleChange('gst')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="PAYMENT" onChange={this.handleChange('payment')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="TRANSPORT" onChange={this.handleChange('transport')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="DELIVERY" onChange={this.handleChange('delivery')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="P&F" onChange={this.handleChange('pf')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="OTHER TERMS" onChange={this.handleChange('otherTerms')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="COMPANY NAME" onChange={this.handleChange('companyName')} />
          </div>
          <div style={{marginTop:'20px', marginLeft:'450px'}}>
          <TextField label="ADDRESS" onChange={this.handleChange('address')} />
          </div>
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
