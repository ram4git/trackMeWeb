import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router';
import { getAllLorryDetails } from '../api/allApi.js'
import SimpleCard from '../lib/SimpleCard.js'


class Lorries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lorryDetails: {}
    }
  }

  componentDidMount() {
    getAllLorryDetails().then((data) => {
      this.setState({
        lorryDetails: data.val()
      }, console.log(this.state))
    }).catch((e) => console.log(e))
  }

  onLorryClick() {
    this.setState({lorryButtonClicked: true});
  }

  render() {
    if(this.state.lorryButtonClicked) {
      return <Redirect push to="/lorry/0" />
    }
    const pStyle = {
      float: 'right'
    };
    const lorryDetails = this.state.lorryDetails;
    let lorryDetailsArray = [];
    Object.keys(lorryDetails).forEach((lorry) => {
      let lorries = lorryDetails[lorry];
    console.log(lorries);
    let cardProps = {
      text : {
        title : lorries.vehicleNumber,
        id : lorries.vehicleNumber,
        detail : lorries.chasisNumber
      },
      onButtonClickPath : 'lorry'
    }
    lorryDetailsArray.push(<div className='card'><SimpleCard {...cardProps}/></div>)
  })
    return (
      <Fragment>
      <div style={pStyle}>
      <Button color="primary" onClick={() => this.onLorryClick()} >Add Lorry</Button>
      </div>
      {lorryDetailsArray}
      </Fragment>
    )
  }
}

export default Lorries
