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
import Loading from './Loading';
import DynamicImport from './DynamicImport';


const Jobcards = (props) => (
  <DynamicImport load={() => import('./Jobcards')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Indents = (props) => (
  <DynamicImport load={() => import('./Indents')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Purchases = (props) => (
  <DynamicImport load={() => import('./Purchases')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)


export default class Home extends Component {

  componentDidMount () {

  }

  render() {
   return (
      <Fragment>
        {localStorage.role=='GARAGE' && <Jobcards /> }
        {localStorage.role=='STORE' && <Indents /> }
        {localStorage.role=='PURCHASE' && <Indents role={"PURCHASE"}/> }
        {localStorage.role=='SECURITY' && <Purchases /> }

      </Fragment>
    )
  }
}
