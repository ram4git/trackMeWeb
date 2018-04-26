import React, { Component, Fragment } from 'react';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router';
import { getAllLorryDetails } from '../api/allApi.js'
import SimpleCard from '../lib/SimpleCard.js'
import { CircularProgress } from 'material-ui/Progress';


class Lorries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lorryDetails: {},
      loadedData : false
    }
  }

  componentDidMount() {
    getAllLorryDetails().then((data) => {
      this.setState({
        lorryDetails: data.val(),
        loadedData : true
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
    const { loadedData } = this.state;
    const lorryDetails = this.state.lorryDetails;
    let lorryDetailsArray = [];
    Object.keys(lorryDetails).forEach((lorry) => {
      let lorries = lorryDetails[lorry];
    console.log(lorries);
    let cardProps = {
      text : {
        title : lorry,
        id : lorry,
        detail : lorries.chasisNumber
      },
      onButtonClickPath : 'lorry'
    }
    lorryDetailsArray.push(<div className='card' key={lorries.vehicleCode}><SimpleCard {...cardProps}/></div>)
  })
    return (
      <Fragment>
      <div className='container'>
      <div style={pStyle}>
      <Button variant="raised" color="primary" onClick={() => this.onLorryClick()} style={{backgroundColor : "#1976d2"}}>
      Add Lorry
      </Button>
      </div>
      <h2 style={{marginTop:'50px'}}>All <span style={{color:"#1976d2"}}>LORRIES</span> displayed below</h2>
      { loadedData ? lorryDetailsArray :
      <div style={{height:'100px', width:'200px', marginLeft : '40%', marginTop : '25%'}}>
      <CircularProgress style={{display:'inline'}} size={10} />
      </div>
    }
    </div>
      </Fragment>
    )
  }
}

export default Lorries
