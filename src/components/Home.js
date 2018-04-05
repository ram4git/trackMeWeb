import React, { Component } from 'react'
import TeamLogo from './TeamLogo'
import { Link } from 'react-router-dom'
import { getTeamNames } from '../api'
import { Button } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'


export default class Home extends Component {
  state = {
    teamNames: []
  }
  componentDidMount () {
    getTeamNames()
      .then((teamNames) => this.setState(() => ({
        teamNames
      })))
  }
  render() {
    const { teamNames } = this.state

    return (
      <div className='container'>
      
        <div>
        <Button size="massive">Click Here</Button>
      </div>
      <Card>
      <Image src={require('../background.jpg')} size='large'/>
   <Card.Content>
     <Card.Header>
       Matthew
     </Card.Header>
     <Card.Meta>
       <span className='date'>
         Joined in 2015
       </span>
     </Card.Meta>
     <Card.Description>
       Matthew is a musician living in Nashville.
     </Card.Description>
   </Card.Content>
   <Card.Content extra>
     <a>
       <Icon name='user' />
       22 Friends
     </a>
   </Card.Content>
 </Card>
      
      </div>
    )
  }
}
