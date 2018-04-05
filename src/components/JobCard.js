import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { getTeamNames, getTeamsArticles } from '../api'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'
import Loading from './Loading'
import { Input, Label, Form , Select,Header, Image,Dropdown,
  Grid, Table, Button} from 'semantic-ui-react'


export default class JobCard extends Component {
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
    console.log(this.props.match.params.id)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

 handleSubmit = () => this.setState({ email: '', name: '' })



  render () {

    const pStyle = {
      marginLeft: '40px',
      marginRight:'40px'
    };

    const mStyle = {
      marginTop: '40px'
    };

    const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

    const { loading, teamNames, articles } = this.state
    const { match } = this.props

    console.log(match);
    const { name, email } = this.state

    const { teamId } = match.params;


    return (
      <div>

        <Form style={pStyle} onSubmit={this.handleSubmit}>
          <Form.Field  inline={true} control={Input}
          label={<Label color="teal" size="large">Vehicle Number</Label>}
           >
          <Input size="large"
          placeholder='Search...'
          icon={{ name: 'search', circular: true, link: true }}
          />
          </Form.Field>
          <Grid style={mStyle} divided='vertically'>
    <Grid.Row columns={3}>
      <Grid.Column>
      <Table celled striped>
      <Table.Body>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Make
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
      22
      </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Number of Tyres
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
      15
      </Table.Cell>
      </Table.Row>

      </Table.Body>
      </Table>
      </Grid.Column>
      <Grid.Column>
      <Table celled striped>
      <Table.Body>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Model Number
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
        M1312
      </Table.Cell>
      </Table.Row>
      <Table.Row>
      <Table.Cell>
      <Header as='h4' image>
      <Header.Content>
          Driver Name
      </Header.Content>
      </Header>
      </Table.Cell>
      <Table.Cell>
        Krishna
      </Table.Cell>
      </Table.Row>

      </Table.Body>
      </Table>
      </Grid.Column>
    </Grid.Row>
    </Grid>
    <Form.Group style={mStyle} widths={3}>
         <Form.Field control={Dropdown} fluid label='Complaint Type'
             placeholder='Skills' fluid multiple selection options={options} >
          </Form.Field>
         <Form.Select fluid label='Category' options={options} placeholder='Gender' />
         <Form.Select fluid label='Checked by' options={options} placeholder='Gender' />

   </Form.Group>
   <Form.Group style={mStyle} widths={2}>
        <Form.Field width={2} control={Input} label='Estimated Duration to complete' placeholder='2 days' >
         </Form.Field>
         <Form.Select fluid label='Mechanic Alloted' options={options} placeholder='Raju' />


  </Form.Group>
  <Form.Field label='Complaint description' control='textarea' rows='3' width={6}/>



          {/* <Form.Field width="6">
           <Label icon="bus"  size="large">Vehicle Number</Label>
           <Input size="large"
           placeholder='Search...'
           icon={{ name: 'search', circular: true, link: true }}
           />
           </Form.Field>

           <Form.Group widths='equal'>
             <Form.Input fluid label='Job card number' placeholder='JB340' readOnly />
             <Form.Input fluid label='Created by' placeholder='Krishna Kumar' readOnly />
             <Form.Input fluid label='Created at' placeholder='Read only' readOnly />
           </Form.Group>
           <Form.Group widths='equal'>
             <Form.Input label='Make' placeholder='Ashok Leyland' readOnly />
             <Form.Input fluid label='Number of tyres' placeholder='4' readOnly />
             <Form.Input fluid label='Driver Name' placeholder='Ram Kumar' readOnly />
           </Form.Group>


            */}
            <Form.Field control={Button} color='green' content='SUBMIT' width={3} />
       </Form>
      </div>
    )
  }
}
