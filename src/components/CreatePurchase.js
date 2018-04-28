import React, { Component, Fragment } from 'react';
import SimpleExpansionPanel from '../lib/SimpleExpansionPanel.js';
import { getAllIndents } from '../api/allApi.js';
import PurchaseOrder from './PurchaseOrder'


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

render() {
  const { indents } = this.state

  console.log(this.props)
  let indentItemsArr = []
  Object.keys(indents).map((indent) => {
    const indentVal = indents[indent];
        const expansionPanelProps = {
          text : {
          header: indent,
          items: indentVal.items
        }
      }
      indentItemsArr.push(<div key={indent}><SimpleExpansionPanel {...expansionPanelProps} /></div>)
})
  console.log(indents)
  return (
    <Fragment>
    <div style={{width: '100%'}}>
    <div style={{float:'left', width: '50%'}}>
    {indentItemsArr}
    </div>
    <div style={{float: 'right'}}>
    <PurchaseOrder />
    </div>
    </div>
    </Fragment>
  )
 }
}
