import React from "react"
import {client} from "../../client"
import {Container} from "reactstrap"
import RacerList from "./RacerList"
import {withRouter} from "react-router-dom"
import {reduceError} from "../../errors"
import UserList from "../user/UserList";

class RacersHome extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      racers: [],
      pageSize: 20,
      links: [],
      isLoadingRacers: true,
      isLoadingPagination: false,
      error: null
    }
    this.onDelete = this.onDelete.bind(this)
    this.onNavigate = this.onNavigate.bind(this)
  }

  loadFromServer(pageSize) {
    return client({url: 'racers', params: {size: this.state.pageSize}})
      .then(response => {
        this.setState({
          racers: response.data._embedded.racers,
          links: response.data._links,
          pageSize: pageSize,
          isLoadingRacers: false,
          error: null
        })
        return response
      })
      .catch(ex=> {
        this.setState({
          error: reduceError(ex, "racers", "get"),
          isLoadingRacers: false, isLoadingPagination: false
        })
      })
  }

  onDelete(racer) {
    return client({method: 'delete', url: racer._links.self.href}).then(resp =>
      this.loadFromServer(this.state.pageSize)
    ).catch(ex => {
      if (ex.response.status === 403) {
        alert("Access DENIED: You are not authorized to " +
          "delete the racer: " + racer.firstName + " " + racer.lastName)
      } else {
        console.error("Unknown error deleting racer -", ex)
        alert('Unexpected error')
      }
      throw ex
    })
  }

  componentDidMount() {
    this.loadFromServer(this.state.pageSize)
  }

  onNavigate(navUri) {
    return client.get(navUri).then(racerCollection => {
      this.setState({
        racers: racerCollection.data._embedded.racers,
        pageSize: this.state.pageSize,
        links: racerCollection.data._links,
        isLoadingRacers: false, isLoadingPagination: false,
        error: null
      })
    })
    .catch(ex=>{
      this.setState({
        error: reduceError(ex, "racers", "get"),
        isLoadingRacers: false, isLoadingPagination: false
      })
    })
  }

  render() {
    return (
      <Container fluid>
        <RacerList racers={this.state.racers}
                  links={this.state.links}
                  pageSize={this.state.pageSize}
                  isLoadingRacers={this.state.isLoadingRacers}
                  isLoadingPagination={this.state.isLoadingPagination}
                  error={this.state.error}
                  loggedUser={this.props.loggedUser}
                  onNavigate={this.onNavigate}
                  onDelete={this.onDelete}/>
      </Container>
    )
  }
}

export default withRouter(RacersHome)
