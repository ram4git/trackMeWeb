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
    Object.keys(items).forEach((id) => {
      let indentItems = items[id];
       Object.keys(indentItems).forEach((part, index) => {
      let item = indentItems[part];
      let mediaCardProps = {
        text : {
          mainHead : item.mainHead,
          partName : item.partName,
          partNumber : item.partNumber,
          quantityRequired: item.quantityRequired,
          screenShot : item.screenShot
        }
      }
      allPurchaseItems.push(<div key={item.partNumber}><PurchaseItemCard {...mediaCardProps} /></div>);
    })})
  }


    return (
      <div >
        {allPurchaseItems}
     </div>
    )
  }
}
