import React from "react"
import {Button, Container} from "reactstrap"
import {Link, withRouter} from "react-router-dom"


class About extends React.Component {
  render() {
    return (
      <Container>
        <h2>Test</h2>
        <Button color="link"><Link to="/">← Back to Racers</Link></Button>
      </Container>
    )
  }
}

export default withRouter(About)
