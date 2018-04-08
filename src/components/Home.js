import React, { Component, Fragment } from 'react'
import TeamLogo from './TeamLogo'
import { Link } from 'react-router-dom'
import { getTeamNames } from '../api'
import { Card, Icon, Image } from 'semantic-ui-react'
import {browserHistory} from 'react-router';
import { Redirect } from 'react-router';
import Button from 'material-ui/Button';
import {getAllActiveJobCards} from '../api/allApi.js'


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
      <Fragment>

      <div className='container'>

        <div style={pStyle}>
          <Button color="primary" onClick={() => this.redirect()} >Create Job Card</Button>
        </div>
      <Card onClick={() => this.onCardClick()}
      header='KA 51 RK 1234'
      meta='Friend'
      description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
      extra={extra}
      />
      </div>

      </Fragment>
    )
  }
}
