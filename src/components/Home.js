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


export default class Home extends Component {
  state = {
    jobCards: {}
  }
  componentDidMount () {
    getAllActiveJobCards().then((data) => {
         this.setState({jobCards : data.val()});
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

 const jobCards = this.state.jobCards;
 window.localStorage.jobCards = JSON.stringify(jobCards);
 let jobCardsList = [];
 Object.keys(jobCards).forEach((jobCardNumber) => {
   let jobCardDetails = jobCards[jobCardNumber];
   var allIndents = '';
  jobCardDetails.indents.map((indent,index) => allIndents+=indent.id);
   console.log(allIndents);
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
        <Button color="primary" onClick={() => this.redirect()} >Create Job Card</Button>
        </div>
      {jobCardsList}
      </div>

      </Fragment>
    )
  }
}
