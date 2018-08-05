import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import {Panel} from 'react-bootstrap';


import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'

var markerOk = require('../assets/styles/img/icons/google_maps_icon.png')

class SelectLocationMapComponent extends React.Component {
  state = {
    didCenter: false,
    currentLat: null,
    currentLng: null,
  }

  componentDidMount() {
    // wew
    this.onMapClicked = this.onMapClicked.bind(this)
  }

  onMapClicked(props) {
    console.log(props)
      this.setState({
        currentLat: props.latLng.lat(),
        currentLng: props.latLng.lng()
      })
  }

  render() {
    const self = this

    return (
      <GoogleMap
        defaultZoom={14}
        center={{ lat: -33.873327, lng: 151.199035 }}
        mapTypeId={'hybrid'}
        onClick={self.onMapClicked.bind(self)}
        options={{ fullscreenControl: false }}
      >
      { self.state.currentLat != null && 
        (<Marker
          position={{ lat: self.state.currentLat, lng: self.state.currentLng }}
        />) }
      </GoogleMap>
    )
  }
}


export default withScriptjs(withGoogleMap(props => <SelectLocationMapComponent {...props} />))
