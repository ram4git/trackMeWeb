import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react'

import { getJobCardDetail } from '../api/allApi.js'

export default class ViewJobCard extends Component {

  constructor() {
    super();
    this.state = {}
  }


  componentDidMount () {
    const { jobCardID } = this.props;
    let jobCard;
    if(window.localStorage.jobCards) {

    let jobCards = JSON.parse(window.localStorage.jobCards);

    let jobCard =  jobCards[jobCardID];
}
    if(!jobCard){
      getJobCardDetail(jobCardID).then((data) => {
        console.log(data.val())
           this.setState({jobCard : data.val()});

        }).catch((e) => console.log(e))
    }
    this.setState({
      id : jobCardID,
      jobCard
    })
      console.log(this.props);
  }

  render() {
    const { jobCard } = this.state;
  if(!jobCard) {
   return null;
 }
    return <h1>{jobCard.checkedBy}</h1>
  }


}
