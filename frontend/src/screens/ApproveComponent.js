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
        title: 'Take a photo at the Gold Coast of coastal erosion',
        description: 'The photo should be taken from the beach near Sturt Street.',
        image_url: 'https://www.sbs.com.au/yourlanguage/sites/sbs.com.au.yourlanguage/files/styles/full/public/podcasts//site_197_Filipino_441839.JPG?itok=_kkKIULx',
        id: 1
      },
      {
        title: 'Check Mitchelton Court for storm damage.',
        description: 'After the storm last night, check the street for any obstructions of the road.',
        image_url: 'http://www.trbimg.com/img-57fa3a26/turbine/dp-hurricane-matthew-storm-damage-20161009',
        id: 2
      }
    ]

    var panels = pictures_to_approve.map(function(x) {
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{x.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img style={{width: '50%', height: '50%'}}src={x.image_url} />
          </Panel.Body>
          <Panel.Body>
            {x.description}
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
