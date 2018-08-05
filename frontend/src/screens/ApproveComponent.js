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
    acc: null,
    approved: [],
    rejected: []
  }

  componentWillMount() {}

  approveClick(id, props) {
    this.setState({approved: this.state.approved.concat([id])})
    console.log('approve')
    console.log(props)
    console.log(id)
  }

  rejectClick(id, props) {
    this.setState({rejected: this.state.rejected.concat([id])})

    console.log('reject')
    console.log(props)
    console.log(id)
  }

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
      },
      {
        title: 'Check Murrary River Erosion',
        description: 'This portion of the murray river has experienced sustained erosion over the last 6 months.',
        image_url: require('../assets/james_dummy_photo.jpg'),
        id: 3
      }
    ]

    var approval_panel = (<Panel>
          <Panel.Heading> Thank You </Panel.Heading>
          <Panel.Body>
            The bounty has been released to the citizen scientist.

          </Panel.Body>
        </Panel>)

    var revoked_panel = (<Panel>
          <Panel.Heading> Thank You </Panel.Heading>
          <Panel.Body>
            The bounty has been revoked.
          </Panel.Body>
        </Panel>)
    var self = this;
    var panels = pictures_to_approve.map(function(x) {
      if (self.state.approved.filter((y) => { return x.id == y}).length > 0) {
        return approval_panel;
      }
      if (self.state.rejected.filter((y) => { return x.id == y}).length > 0) {
        return revoked_panel;
      }
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
              <Button bsStyle="success" onClick={self.approveClick.bind(self, x.id)}>Approve</Button>
              <Button bsStyle="danger" onClick={self.rejectClick.bind(self, x.id)}>Reject</Button>
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
