import React from 'react'
import SelectLocationMapComponent from './SelectLocationMapComponent.js'
import {FormGroup, ControlLabel, HelpBlock, FormControl, Navbar, Nav, MenuItem, NavItem, NavDropdown, Panel, PanelGroup, Grid, Button, ButtonToolbar} from 'react-bootstrap';

export default class NewBountyComponent extends React.Component {
  state = {
    lng: null,
    lat: null,
    acc: null
  }

  componentWillMount() {
    
  }

  render() {

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



      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>What information do you need?</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
          />
          <FormControl.Feedback />
          <HelpBlock>Make sure you specify exactly what sort of data you need!</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <ControlLabel>Where is it?</ControlLabel>
          <SelectLocationMapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCom5sLobo4uZE-UsqgIg2XsvusgSQPdQ&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `50vh` }} />}
        mapElement={<div style={{ height: `50vh` }} />}
        coords={this.state}
      />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <ControlLabel>How much do you want to pay per data point?</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="formBasicText">
          <ControlLabel>How many data points do you want?</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="1+"
          />
          <FormControl.Feedback />
        </FormGroup>

              <Button bsStyle="success">Submit</Button>

      </form>

</Grid>
      </div>
    )
  }
}
