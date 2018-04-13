import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react'
import AddLorry from './AddLorry';
import ViewLorry from './ViewLorry'


export default class Lorry extends Component {
  state = {
    loading: true,
    lorryID : 0,
    createFlow : true
  }


  componentDidMount () {

    const lorryID = this.props.match.params.id
    if(lorryID != 0) {
      this.setState({createFlow : false, lorryID  })
    }

  }



  render () {
      const {createFlow, lorryID} = this.state;
      if(createFlow)
       return (<AddLorry  />)
       else
         return (<ViewLorry lorryID={lorryID} />)


  }
}
