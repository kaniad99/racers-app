import React from "react"
import ReactDOM from "react-dom"
import {Link, withRouter} from 'react-router-dom'
import {get, post, put} from "../../client"
import {applyEventToState} from "../../commons"
import {Button, Container, Input, Label, Row} from "reactstrap"
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation-safe'
import Loading from "../commons/Loading"
import Message from "../commons/Message"
import {reduceError} from "../../errors"


class Racer extends React.Component {

  constructor(props) {
    super(props)
    const isCreateRacer = props.match.path === "/racers/create"
    this.state = {
      racer: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        vehicleBrand: '',
        vehicleModel: '',
        trackName: '',
        recordTimeOfTrack: '',
      },
      isCreateRacer: isCreateRacer,
      isLoadingRacer: !isCreateRacer,
      isSavingRacer: false,
      error: null,
      showForm: isCreateRacer
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.save = this.save.bind(this)
  }

  componentDidMount() {
    if (this.state.isCreateRacer){

    } else if (!this.state.isCreateRacer) {
      get(`/racers/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          racer: response.data,
          isLoadingRacer: false, showForm: true
        })
      })
      .catch(ex=> {
        this.setState({
          error: reduceError(ex, "racer", "get"),
          isLoadingRacer: false, showForm: false
        })
      })
    }
  }

  handleValidSubmit(event, values) {
    let racer = {...this.state.racer}
    let newState = {racer: racer, isSavingRacer: true}
    this.setState(newState, ()=>
      this.save()
        .then(response => {
          this.props.history.push('/')
        }).catch(ex =>
        this.setState({
          error: reduceError(ex, "racer", "save"),
          isSavingRacer: false
        })
      ))
  }

  handleChange(event) {
    applyEventToState(event, this.state, "racer", this.setState.bind(this))
  }

  save() {
    if (this.state.isCreateRacer) {
      return post({
        url: 'racers',
        data: this.state.racer
      })
    } else {
      return put({
        url: this.state.racer._links.self.href + '/profile',
        data: this.state.racer
      })
    }
  }

  render() {
    return (
      <Container>
        <h3>Racer Details</h3>
        <Loading display={this.state.isLoadingRacer}/>
        <Message error={this.state.error} display={!this.state.showForm}/>
        {!this.state.isLoadingRacer && this.state.showForm &&
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <Row>
              <AvGroup className="col-md-6">
                <Label for="firstName">First name</Label>
                <AvInput type="text" placeholder="First Name" name="firstName" id="firstName" ref="firstName"
                       value={this.state.racer.firstName} required
                       onChange={this.handleChange}/>
                <AvFeedback>First name required</AvFeedback>
              </AvGroup>
              <AvGroup className="col-md-6">
                <Label for="lastName">Last name</Label>
                <AvInput type="text" placeholder="Last Name" name="lastName" id="lastName" ref="lastName"
                       value={this.state.racer.lastName} required
                       onChange={this.handleChange}/>
                <AvFeedback>Last name required</AvFeedback>
              </AvGroup>
              <AvGroup className="col-md-6">
                <Label for="dateOfBirth">Date of birth</Label>
                <AvInput type="date" placeholder="Date of birth" name="dateOfBirth" id="dateOfBirth" ref="dateOfBirth"
                         value={this.state.racer.dateOfBirth}
                         onChange={this.handleChange}/>
                <AvFeedback>Date of birth required</AvFeedback>
              </AvGroup>
              <AvGroup className="col-md-6">
                <Label for="vehicleBrand">Vehicle Brand</Label>
                <AvInput type="text" placeholder="Vehicle Brand" name="vehicleBrand" id="vehicleBrand" ref="vehicleBrand"
                         value={this.state.racer.vehicleBrand} required
                         onChange={this.handleChange}/>
                <AvFeedback>Vehicle brand required</AvFeedback>
              </AvGroup>
              <AvGroup className="col-md-6">
                <Label for="vehicleModel">Vehicle Model</Label>
                <AvInput type="text" placeholder="Vehicle Model" name="vehicleModel" id="vehicleModel" ref="vehicleModel"
                         value={this.state.racer.vehicleModel} required
                         onChange={this.handleChange}/>
                <AvFeedback>Vehicle Model required</AvFeedback>
              </AvGroup>
              <AvGroup className="col-md-6">
                <Label for="trackName">Track Name</Label>
                <AvInput type="text" placeholder="Track Name" name="trackName" id="trackName" ref="trackName"
                         value={this.state.racer.trackName} required
                         onChange={this.handleChange}/>
                <AvFeedback>Track Name required</AvFeedback>
              </AvGroup>
              <AvGroup className="col-md-6">
                <Label for="recordTimeOfTrack">Record time</Label>
                <AvInput type="text" placeholder="Record time" name="recordTimeOfTrack" id="recordTimeOfTrack" ref="recordTimeOfTrack"
                         value={this.state.racer.recordTimeOfTrack} required
                         onChange={this.handleChange}/>
                <AvFeedback>Record time required</AvFeedback>
              </AvGroup>
            </Row>
            <Message error={this.state.error}/>
            <AvGroup>
              <Button color="primary" disabled={this.state.isSavingRacer} className="d-print-none">
                {this.state.isSavingRacer ? 'Saving...' : 'Save' }
              </Button>&nbsp;&nbsp;
              <Button color="secondary" tag={Link} to="/" className="d-print-none">Cancel</Button>
            </AvGroup>
          </AvForm>
        }
      </Container>
    )
  }
}

export default withRouter(Racer)
