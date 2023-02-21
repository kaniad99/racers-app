import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, ButtonGroup } from 'reactstrap'


class RacerItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      editUrl: props.racer._links.self.href.split("/api")[1],
      racer: {
        ...props.racer
      }
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.setState({isLoading: true})
    if (window.confirm("Do you really want to delete the racer " +
      this.state.racer.firstName + " " + this.state.racer.lastName + " ?")) {
      this.props.onDelete(this.state.racer)
        .catch(() => this.setState({isLoading: false}))
    } else {
      this.setState({isLoading: false})
    }
  }

  render() {
    return (
      <tr key={this.state.racer._links.self.href}>
        <td style={{whiteSpace: 'nowrap'}}>{this.state.racer.firstName}</td>
        <td className="d-none d-sm-table-cell">{this.state.racer.lastName}</td>
        <td>{this.state.racer.dateOfBirth}</td>
        <td className="d-none d-sm-table-cell">{this.state.racer.vehicleBrand}</td>
        <td>{this.state.racer.vehicleModel}</td>
        <td className="d-none d-sm-table-cell">{this.state.racer.trackName}</td>
        <td>{this.state.racer.recordTimeOfTrack}</td>
        <td className="d-print-none">
          <ButtonGroup>
            <Button size="sm" color="primary" disabled={this.state.isLoading}
                    tag={Link} to={this.state.editUrl}>Edit</Button>
            <Button size="sm" color="danger" disabled={this.state.isLoading}
                    onClick={this.handleDelete}>
              {!this.state.isLoading ? 'Delete' : 'Dele...'}
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    )
  }
}

export default withRouter(RacerItem)
