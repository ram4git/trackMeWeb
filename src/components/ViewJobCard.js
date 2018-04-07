import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react'

import {createJobCard} from '../api/allApi.js'


export default class ViewJobCard extends Component {

  constructor() {
    super();
  }


  componentDidMount () {
      console.log(this.props);
  }

  render() {
    return <h1>hi</h1>
  }


}
