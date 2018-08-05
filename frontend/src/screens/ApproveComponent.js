import React from 'react'
import MapComponent from './MapComponent.js'
import {
  Navbar,
  Nav,
  MenuItem,
  NavItem,
  NavDropdown,
  Panel,
  PanelGroup,
  Grid,
  Button,
  ButtonToolbar
} from 'react-bootstrap'

export default class ApproveScreen extends React.Component {
  state = {
    lng: null,
    lat: null,
    acc: null
  }

  componentWillMount() {}

  render() {
    var pictures_to_approve = [
      {
        title: 'Test Image',
        description: 'This is a test image!',
        image_url: 'https://media.giphy.com/media/mokQK7oyiR8Sk/giphy.gif',
        id: 1
      },
      {
        title: 'Test Image',
        image_url: 'https://media.giphy.com/media/YIW0KqAQShjCE/giphy.gif',
        id: 2
      },
      {
        title: 'Test Image',
        image_url: 'http://s3.amazonaws.com/barkpost-assets/50+GIFs/39.gif',
        id: 3
      }
    ]

    var panels = pictures_to_approve.map(function(x) {
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{x.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img src={x.image_url} />
          </Panel.Body>
          <Panel.Body>
            <ButtonToolbar>
              <Button bsStyle="success">Approve</Button>
              <Button bsStyle="danger">Reject</Button>
            </ButtonToolbar>
          </Panel.Body>
        </Panel>
      )
    })

    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Quest</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">
              To Approve
            </NavItem>
            <NavItem eventKey={2} href="#">
              Approved
            </NavItem>
          </Nav>
        </Navbar>
        <Grid>
          <PanelGroup>{panels}</PanelGroup>
        </Grid>
      </div>
    )
  }
}
