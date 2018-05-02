import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import Loading from './Loading'
import DynamicImport from './DynamicImport'

if (window.location.pathname !== '/login') {
  const localStorage = window.localStorage;
  const { email, token } = localStorage;
  if(!email || !token)
    window.location = '/login';
}

const Home = (props) => (
  <DynamicImport load={() => import('./Home')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Requests = (props) => (
  <DynamicImport load={() => import('./Requests')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Settings = (props) => (
  <DynamicImport load={() => import('./Settings')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Request = (props) => (
  <DynamicImport load={() => import('./Request')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const JobCard = (props) => (
  <DynamicImport load={() => import('./JobCard')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Articles = (props) => (
  <DynamicImport load={() => import('./Articles')}>
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


const Indent = (props) => (
  <DynamicImport load={() => import('./Indent')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Lorries = (props) => (
  <DynamicImport load={() => import('./Lorries')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Lorry = (props) => (
  <DynamicImport load={() => import('./Lorry')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Login = (props) => (
  <DynamicImport load={() => import('./Login')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const Jobcards = (props) => (
  <DynamicImport load={() => import('./Jobcards')}>
    {(Component) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

const CreatePurchase = (props) => (
  <DynamicImport load={() => import('./CreatePurchase')}>
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


class App extends Component {



  render() {
    const token = window.localStorage.token;
    let nav;
    if(token)
      nav=  <Navbar />

    return (
      <Router basename={'/'}>
        <div>
          {nav}
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Login} />
            <Route path='/requests' component={Requests} />
            <Route path='/settings' component={Settings} />
            <Route path='/request/:id' exact component={Request} />
            <Route path='/jobcards' component={Jobcards} />
            <Route path='/jobcard/:id' component={JobCard} />
            <Route path='/indents' component={Indents} />
            <Route path='/indent/:id' component={Indent} />
            <Route path='/lorries' component={Lorries} />
            <Route path='/lorry/:id' component={Lorry} />
            <Route path='/createpurchase' component={CreatePurchase} />
            <Route path='/purchases' component={Purchases} />
            <Route render={() => <h1 className='text-center'>Four oh Four.</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
