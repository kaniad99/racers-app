import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom"
import React from 'react'
import UsersHome from "./user/UsersHome"
import RacersHome from "./racer/RacersHome";
import About from "./About"
import User from "./user/User"
import Navbar from "./Navbar"
import RouteNoMatch from "./RouteNoMatch"
import Racer from "./racer/Racer";

class App extends React.Component {

  constructor(props) {
    super(props)
    const loggedUserData = document.querySelector('#user-data').dataset
    this.state = {
      loggedUser: {
        name: loggedUserData.username,
        isAdmin: loggedUserData.isAdmin === 'true'
      }
    }
  }

  render() {
    return (
      <Router>
        <Navbar loggedUser={this.state.loggedUser}/>
        <Switch>
          <Route
            exact path="/"
            render={() => <Redirect to="/racers" />}
          />
          <Route path="/users" exact={true}>
            <UsersHome loggedUser={this.state.loggedUser}/>
          </Route>
          <Route path="/racers" exact={true}>
            <RacersHome loggedUser={this.state.loggedUser}/>
          </Route>
          <Route path="/racers/create" exact={true} component={Racer}/>
          <Route path="/racers/:id" component={Racer}/>
          <Route path="/users/create" exact={true} component={User}/>
          <Route path="/users/:id" component={User}/>
          <Route path="/about" exact={true} component={About}/>
          <Route path="*">
            <RouteNoMatch />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
