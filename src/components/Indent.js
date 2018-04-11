import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button, TextArea } from 'semantic-ui-react'
import CreateIndent  from  './CreateIndent'
import ViewIndent  from  './ViewIndent'


export default class Indent extends Component {
  state = {
    loading: true,
    indentID : 0,
    createFlow : true
  }


  componentDidMount () {
    const { params } = this.props.location;
    this.setState({ params  });
    const indentID = this.props.match.params.id
    if(indentID != 0) {
      this.setState({createFlow : false, indentID  })
    }

  }



  render () {
    console.log(this.state);
      const {createFlow, indentID, params} = this.state;
      if(createFlow && params)
       return (<CreateIndent  jobCardID={params.jobCardID}
         vehicleNumber={params.vehicleNumber}
         modelNumber={params.modelNumber} />)
       else if(params)
         return (<ViewIndent indentID={indentID} {...params} />)
         else
         return null;


  }
}
