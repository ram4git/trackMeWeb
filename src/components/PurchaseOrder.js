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

  render() {
    const {items} = this.props;

    let allPurchaseItems = [];
    if(items) {
    Object.keys(items).forEach((partNumber) => {
      let item = items[partNumber];
      let mediaCardProps = {
        text : {
          mainHead : item.mainHead,
          partName : item.partName,
          partNumber : item.partNumber,
          quantityRequired: item.quantityRequired,
          screenShot : item.screenShot,
          itemInPurchase : item.itemInPurchase,
          selectedForPurchase : true,
          split : item.split
        }
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
