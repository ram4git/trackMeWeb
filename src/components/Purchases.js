import React , { Component, Fragment } from 'react';
import { getAllPurchases } from '../api/allApi.js';
import SimpleCard from '../lib/SimpleCard.js';
import { CircularProgress } from 'material-ui/Progress';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';


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
  redirect() {
    this.setState({redirect: true});
  }

  render() {
    const { purchaseDetails={}, loadedData } = this.state;
    console.log(purchaseDetails);

    const pStyle = {
      float: 'right'
    };


    if (this.state.redirect) {
        return <Redirect push to="/createPurchase" />;
     }

    let purchaseItemsList = [];
    if(purchaseDetails) {
      Object.keys(purchaseDetails).forEach((item, index) => {
      let purchaseItem = purchaseDetails[item];
          let cardProps = {
              text: {
                  id: item,
                  detail: purchaseItem['createdAt'] || new Date().toString()
                },
                onButtonClickPath : 'purchase'
              }
              purchaseItemsList.push(<div className='card'><SimpleCard {...cardProps} /></div>);
          });
    }



    return (
      <Fragment>
        <div className='container'>
          <div style={pStyle}>
          <Button variant="raised" color="primary" style={{backgroundColor : "#1976d2"}}onClick={() => this.redirect()} >
          Create Purchase
          </Button>
          </div>
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
