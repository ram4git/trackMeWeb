import React, { Component, Fragment } from 'react'
import TeamLogo from './TeamLogo'
import { Link } from 'react-router-dom'
import { getTeamNames } from '../api'
import Card, {CardHeader, CardText, CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography'
import { browserHistory } from 'react-router';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import { getAllActiveJobCards } from '../api/allApi.js'
import SimpleCard from '../lib/SimpleCard.js'
import { CircularProgress } from 'material-ui/Progress';



export default class Jobcards extends Component {
  state = {
    jobCards: {},
    loadedData : false
  }
  componentDidMount () {
    getAllActiveJobCards().then((data) => {
         this.setState({jobCards : data.val(),
          loadedData : true});
         console.log(this.state.jobCards);
      }).catch((e) => console.log(e))
  }

  redirect() {
    this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
    return <Redirect push to="/jobcard/0" />;
   }

    const pStyle = {
      float: 'right'
    };

 const { jobCards , loadedData } = this.state;
 window.localStorage.jobCards = JSON.stringify(jobCards);
 let jobCardsList = [];
 Object.keys(jobCards).forEach((jobCardNumber) => {
   let jobCardDetails = jobCards[jobCardNumber];
   var allIndents = 'Indents : ';
   if(jobCardDetails.indents) {
     jobCardDetails.indents.map((indent,index) => allIndents=allIndents + indent.id + '    ');
   }
    let cardProps = {
       text : {
         title : jobCardDetails.vehicleNumber,
         id : jobCardNumber,
         detail : allIndents
       },
       onButtonClickPath : 'jobcard'
     }
     jobCardsList.push(<div className='card'><SimpleCard {...cardProps} /></div>)

   })

   return (
      <Fragment>
        <div className='container'>
          <div style={pStyle}>
          <Button variant="raised" color="primary" style={{backgroundColor : "#1976d2"}}onClick={() => this.redirect()} >Create Job Card</Button>
          </div>
          <h2 style={{marginTop:'50px'}}>All open <span style={{color:"#1976d2"}}>JOBCARDS</span> displayed below</h2>
          { loadedData ? jobCardsList : 
          <div style={{height:'100px', width:'200px', marginLeft : '40%', marginTop : '25%'}}>
          <CircularProgress style={{display:'inline'}} size={10} />
          </div>
          }
        }
      </div>
      </Fragment>
    )
  }
}
