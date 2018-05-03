import React , { Component, Fragment } from 'react';
import { getAllPurchases } from '../api/allApi.js';
import SimpleCard from '../lib/SimpleCard.js';
import { CircularProgress } from 'material-ui/Progress';


export default class Purchases extends Component {
  state = {
      purchaseDetails: {},
      loadedData : false
    }

  componentDidMount() {
    getAllPurchases().then((data) => {
      this.setState({
        purchaseDetails: data.val(),
        loadedData: true
      })
    }).catch((e) => console.log(e))
  }


  render() {
    const { purchaseDetails, loadedData } = this.state;
    console.log(purchaseDetails);

    let purchaseItemsList = [];
    Object.keys(purchaseDetails).forEach((item, index) => {
    let purchaseItem = purchaseDetails[item];
    Object.keys(purchaseItem).forEach((key) => {
        let itemForPurchase = purchaseItem[key];
        console.log(itemForPurchase);
        let cardProps = {
            text: {
                id: item,
                detail: new Date().toString()
              },
              onButtonClickPath : 'purchase'
            }
            purchaseItemsList.push(<div className='card'><SimpleCard {...cardProps} /></div>);
          })
        });

    return (
      <Fragment>
        <div className='container'>
          <h2 style={{marginTop:'50px'}}>All open <span style={{color:"#1976d2"}}>PURCHASE ITEMS</span> displayed below</h2>
          { loadedData ? purchaseItemsList :
          <div style={{height:'100px', width:'200px', marginLeft : '40%', marginTop : '25%'}}>
          <CircularProgress style={{display:'inline'}} size={10} />
          </div> }
      </div>
      </Fragment>
    )
  }
}
