import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { loginUser, getRole } from '../api/allApi.js';
import { Redirect } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      loginSuccess: false
    }
  }

  handleChange = (e, {name , value}) =>{
      this.setState({ [name]: value });
  }

  loginClick = () => {
    const data = Object.assign({}, this.state);
    console.log(data)
    loginUser(data.email, data.password).then((payload) => {
      console.log(payload)
      if(!payload.errorCode) {
            try {
              const localStorage = window.localStorage;
              localStorage.email = payload.email;
              localStorage.name = payload.displayName;
              localStorage.token = payload.uid;
            } catch (e) {
              alert(
                'Unable to preserve session, probably due to being in private ' +
                'browsing mode.'
              );
            }
            getRole(payload.uid).then((data) => {
              let result = data.val();
              this.setState({
                loginSuccess: true,
                result
              })

              localStorage.role = result;
            })
          }else {
            alert("Invalid username / password");
          }
    })
      .catch((e)=>console.log(e))

  }


  render() {
    const { loginSuccess } = this.state
    if(loginSuccess) {
      return <Redirect push to='/' />
    }

    return (
      <div className='login-form'>
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='/logo.png' />
              {' '}Log-in to your account
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  name='email'
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large' onClick={this.loginClick}>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


export default Login
