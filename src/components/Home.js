import React, { Component } from 'react'
import TeamLogo from './TeamLogo'
import { Link } from 'react-router-dom'
import { getTeamNames } from '../api'
import { Button } from 'semantic-ui-react'
import { Card, Icon, Image } from 'semantic-ui-react'
import {browserHistory} from 'react-router';
import { Redirect } from 'react-router';

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

  redirect() {
    this.setState({redirect: true});
  }

  onCardClick() {
    this.setState({cardClicked: true});
  }
  render() {
    if(this.state.cardClicked) {
      return <Redirect push to="/jobcard/1" />
    }
    if (this.state.redirect) {
    return <Redirect push to="/jobcard/0" />;
   }
    const { teamNames } = this.state;

    const pStyle = {
      float: 'right'
    };

    const extra = (
      <a>
       <Icon name='indent' />
       2 Indents
      </a>
    )
    return (
      <div className='container'>

        <div style={pStyle}>
          <Button primary size="large" onClick={() => this.redirect()}>
          Create Job Card </Button>
        </div>
      <Card onClick={() => this.onCardClick()}
      header='KA 51 RK 1234'
      meta='Friend'
      description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
      extra={extra}
      />


      </div>
    )
  }
}
