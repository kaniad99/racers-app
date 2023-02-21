import React from "react"
import {Button, Container, Pagination,
  PaginationItem, PaginationLink, Table} from "reactstrap"
import {Link, withRouter} from 'react-router-dom'
import RacerItem from './RacerItem'
import Loading from "../commons/Loading"
import Message from "../commons/Message"
import LoadingPagination from "../commons/LoadingPagination"


class RacerList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingPagination: props.isLoadingPagination || false,
      allowCreateRacer: this.props.loggedUser.isAdmin,
      createRacerTooltip: this.props.loggedUser.isAdmin ?
        'Add Racer' : 'Only "Manager" are allowed to create racers'
    }
    this.handleNavFirst = this.handleNavFirst.bind(this)
    this.handleNavPrev = this.handleNavPrev.bind(this)
    this.handleNavNext = this.handleNavNext.bind(this)
    this.handleNavLast = this.handleNavLast.bind(this)
  }

  _handleNavFirst(e, link) {
    e.preventDefault()
    this.setState({isLoadingPagination: true})
    this.props.onNavigate(this.props.links[link].href)
      .then(()=>this.setState({isLoadingPagination: false}))
  }

  handleNavFirst(e) { this._handleNavFirst(e, "first") }
  handleNavPrev(e) { this._handleNavFirst(e, "prev") }
  handleNavNext(e) { this._handleNavFirst(e, "next") }
  handleNavLast(e) { this._handleNavFirst(e, "last") }

  render() {
    const navLinks = this.getNavLinks()
    return (
      <Container fluid>
        <div className="float-right" title={this.state.createRacerTooltip}>
          <Button color="success" tag={Link} className="d-print-none"
                  to="/racers/create"
                  disabled={!this.state.allowCreateRacer}>
            Add Racer
          </Button>
        </div>
        <h3>Racers</h3>
        <Table className="mt-4 table-hover">
          <thead>
          <tr>
            <th>First Name</th>
            <th className="d-none d-sm-table-cell">Last Name</th>
            <th>Date of birth</th>
            <th className="d-none d-sm-table-cell">Vehicle Brand</th>
            <th className="d-none d-sm-table-cell">Vehicle Model</th>
            <th className="d-none d-sm-table-cell">Track Name</th>
            <th className="d-none d-sm-table-cell">Record time</th>
            <th width="8%" className="d-print-none"></th>
          </tr>
          </thead>
          <tbody>
          {this.props.isLoadingRacers &&
            <tr key="isLoadingRacers">
              <td><Loading/></td>
            </tr>
          }
          {!this.props.isLoadingRacers && !this.props.error && this.props.racers.length === 0 &&
            <tr><td colSpan="100%"><strong>&#9746; No racers found.</strong></td></tr>
          }
          {!this.props.isLoadingRacers && this.props.racers.length > 0 &&
            this.props.racers.map(racer =>
              <RacerItem key={racer._links.self.href} racer={racer}
                        onDelete={this.props.onDelete}
                        onUpdate={this.props.onUpdate}/>
            )
          }
          </tbody>
        </Table>
        {navLinks.length > 0 &&
          <>
            <Pagination>
              {navLinks}
              {this.state.isLoadingPagination &&
                <LoadingPagination/>
              }
            </Pagination>
          </>
        }
        <Message error={this.props.error}/>
      </Container>
    )
  }

  getNavLinks() {
    const navLinks = []
    if ("first" in this.props.links) {
      navLinks.push(
        <PaginationItem key="first">
          <PaginationLink first onClick={this.handleNavFirst} />
        </PaginationItem>
      )
    }
    if ("prev" in this.props.links) {
      navLinks.push(
        <PaginationItem key="previous">
          <PaginationLink previous onClick={this.handleNavPrev} />
        </PaginationItem>
      )
    }
    if ("next" in this.props.links) {
      navLinks.push(
        <PaginationItem key="next">
          <PaginationLink next onClick={this.handleNavNext} />
        </PaginationItem>
      )
    }
    if ("last" in this.props.links) {
      navLinks.push(
        <PaginationItem key="last">
          <PaginationLink last onClick={this.handleNavLast} />
        </PaginationItem>
      )
    }
    return navLinks
  }
}

export default withRouter(RacerList)
