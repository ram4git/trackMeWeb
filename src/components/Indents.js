import React, { Component, Fragment } from 'react'
import TeamLogo from './TeamLogo'
import { Link } from 'react-router-dom'
import { getTeamNames } from '../api'
import Card, {CardHeader, CardText, CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography'
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import { getAllIndents } from '../api/allApi.js'
import SimpleCard from '../lib/SimpleCard.js'
import { CircularProgress } from 'material-ui/Progress';


export default class Jobcards extends Component {
  state = {
    indents: {},
    loadedData : false
  }
  componentDidMount () {
    getAllIndents().then((data) => {
         this.setState({indents : data.val(),
          loadedData : true});
         console.log(this.state.indents);
      }).catch((e) => console.log(e))
  }



  render() {

    const pStyle = {
      float: 'right'
    };

 const {indents, loadedData}  = this.state;
 window.localStorage.indents = JSON.stringify(indents);
 let indentCardsList = [];
 Object.keys(indents).forEach((indent) => {
   let indentDetails = indents[indent];
   let now = new Date().getTime()
 let cardProps = {
   text : {
     title : indentDetails.indentID,
     id : indentDetails.vehicleNumber,
     detail : now
   },
   onButtonClickPath : 'indent'
 }
 indentCardsList.push(<div className='card'><SimpleCard {...cardProps}/></div>)
})

   return (

      <Fragment>

      <div className='container'>
      <h2 style={{marginTop:'50px'}}>All open <span style={{color:'blue'}}>INDENTS</span> displayed below</h2>
      { loadedData ? indentCardsList : 
      <div style={{height:'100px', width:'200px', marginLeft : '40%', marginTop : '25%'}}>
      <CircularProgress style={{display:'inline'}} size={10} />
      </div>
      }
      </div>
      </Fragment>
    )
  }
}
