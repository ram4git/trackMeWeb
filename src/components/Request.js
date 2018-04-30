import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getTeamNames, getTeamsArticles } from '../api'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'

export default class Request extends Component {
  state = {
    loading: true,
    teamNames: {},
    articles: [],
  }
  componentDidMount () {
    // Promise.all([
    //   getTeamNames(),
    //   getTeamsArticles(this.props.match.params.teamId)
    // ]).then(([teamNames, articles]) => {
    //   this.setState(() => ({
    //     teamNames,
    //     articles,
    //     loading: false
    //   }))
    // })
  }
  render () {
    const { loading, teamNames, articles } = this.state
    const { match } = this.props

    const { teamId } = match.params;


    if (
      loading === false &&
      teamNames.includes(teamId) === false
    ) {
      return <Redirect to='/' />
    }

    return (
      <div>

      </div>
    )
  }
}
