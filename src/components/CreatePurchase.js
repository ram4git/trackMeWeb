import React, { Component, Fragment } from 'react';
import SimpleExpansionPanel from '../lib/SimpleExpansionPanel.js';
import { getAllIndents, createPurchase } from '../api/allApi.js';
import PurchaseOrder from './PurchaseOrder';
import Button from 'material-ui/Button';


export default class CreatePurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indents: {}
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
  const { itemsInPurchaseOrder } = this.state;
  let now = new Date();
  let monthsText=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  let year = now.getFullYear();
  let mathRandom = Math.floor((Math.random())*1000);
  let orderId= (now.getDate()).toString()  + monthsText[now.getMonth()] + (now.getFullYear()%100).toString() + '-'+
                '-'+ mathRandom.toString();
  createPurchase(orderId, itemsInPurchaseOrder).then(() => {
    alert('Successfully saved purchase items')
  }).catch((e) => console.log(e))

}

render() {
  const { indents, purchaseItems, itemsInPurchaseOrder } = this.state;

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
          items: indentVal.items
        },
        onIndentItemSelectedForPurchase : this.onIndentItemSelectedForPurchase

      }
      indentItemsArr.push(<div key={indent}><SimpleExpansionPanel {...expansionPanelProps} /></div>)
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
    <Button variant='raised' color='primary' onClick={this.onPurchaseOrderClick}>
    GENERATE PURCHASE ORDER
    </Button>
    </div>
    </Fragment>
  )
 }
}
