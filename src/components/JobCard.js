import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react'
import CreateJobCard  from  './CreateJobCard'
import ViewJobCard  from  './ViewJobCard'


import {createJobCard} from '../api/allApi.js'


export default class JobCard extends Component {
  state = {
    loading: true,
    jobCardID : 0,
    createFlow : false
  }


  componentDidMount () {

    console.log(this.props.match.params.id)
    if(this.props.match.params.id == 0)
        this.setState({createFlow : true})

  }



  render () {
      const {createFlow} = this.state;
      if(createFlow)
       return (<CreateJobCard  />)
       else
         return (<ViewJobCard />)


  }
}
