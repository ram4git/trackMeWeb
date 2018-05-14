import React, { Component } from 'react';
import PurchaseItemCard from '../lib/PurchaseItemCard.js'



export default class PurchaseOrder extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const items = this.props.items;
    this.setState({
      items
    })
  }

  onPurchaseRemove = (indentID, partNumber) => {
    let purchaseObj = {};
    purchaseObj['indentID']=indentID;
    purchaseObj['partNumber']=partNumber;
    this.props.onIndentItemRemovedForPurchase(purchaseObj);
  }

  render() {
    const {items = {}} = this.props;

    let allPurchaseItems = [];
    if(items.parts) {
      let parts = items.parts;
    Object.keys(items.parts).forEach((partNumber) => {
      let item = parts[partNumber];
      let mediaCardProps = {
        text : {
          mainHead : item.mainHead,
          partName : item.partName,
          partNumber : item.partNumber,
          quantityRequired: item.quantityPurchase,
          screenShot : item.referenceImage,
          itemInPurchase : item.itemInPurchase,
          selectedForPurchase : true,
          right : true,
          split : item.split
        },
        onPurchaseRemove : this.onPurchaseRemove
      }
      allPurchaseItems.push(<div key={item.partNumber}><PurchaseItemCard {...mediaCardProps} /></div>);
    })
  }


    return (
      <div >
        {allPurchaseItems}
     </div>
    )
  }
}
