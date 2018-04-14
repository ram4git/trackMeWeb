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
     lorryNumber: 0,
    createFlow : true
  }


  componentDidMount () {

    const lorryNumber = this.props.match.params.id
    if(lorryNumber != 0) {
      this.setState({createFlow : false, lorryNumber  })
    }

  }



  render () {
      const {createFlow, lorryNumber} = this.state;
      if(createFlow)
       return (<AddLorry  />)
       else
         return (<ViewLorry lorryNumber={lorryNumber} />)


  }
}
