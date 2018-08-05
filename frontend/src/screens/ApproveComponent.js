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
import swal from 'sweetalert2'

export default class ApproveScreen extends React.Component {
  state = {
    lng: null,
    lat: null,
    acc: null,
    hide: [],
    images: [
      {
        title: 'Take a photo at the Gold Coast of coastal erosion',
        description:
          'The photo should be taken from the beach near Sturt Street.',
        image_url:
          'https://www.sbs.com.au/yourlanguage/sites/sbs.com.au.yourlanguage/files/styles/full/public/podcasts//site_197_Filipino_441839.JPG?itok=_kkKIULx',
        id: 1
      },
      {
        title: 'Check Mitchelton Court for storm damage.',
        description:
          'After the storm last night, check the street for any obstructions of the road.',
        image_url:
          'http://www.trbimg.com/img-57fa3a26/turbine/dp-hurricane-matthew-storm-damage-20161009',
        id: 2
      }
    ]
  }

  componentWillMount() {}

  render() {
    var panels = this.state.images.map(x => {
      if (this.state.hide.indexOf(x.id) !== -1) return <div />
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{x.title}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img style={{ width: '50%', height: '50%' }} src={x.image_url} />
          </Panel.Body>
          <Panel.Body>{x.description}</Panel.Body>
          <Panel.Body>
            <ButtonToolbar>
              <Button
                bsStyle="success"
                onClick={() => {
                  swal({
                    title: 'Thanks!',
                    text: 'Image accepted!',
                    type: 'success',
                    confirmButtonText: 'Ok'
                  }).then(() => {
                    let hide = this.state.hide
                    hide.push(x.id)
                    this.setState({ hide: hide })
                  })
                }}
              >
                Approve
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => {
                  swal({
                    title: 'Declined',
                    text: 'Image declined!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                  }).then(() => {
                    let hide = this.state.hide
                    hide.push(x.id)
                    this.setState({ hide: hide })
                  })
                }}
              >
                Reject
              </Button>
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
              <a href="#home">Geohash</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <PanelGroup>{panels}</PanelGroup>
        </Grid>
      </div>
    )
  }
}
