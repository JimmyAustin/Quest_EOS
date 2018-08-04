import React from 'react'
import MapComponent from './MapComponent.js'

export default class MapScreen extends React.Component {
  state = {
    lng: null,
    lat: null,
    acc: null
  }

  componentWillMount() {
    const id = navigator.geolocation.watchPosition(pos => {
      const { longitude, latitude, accuracy } = pos.coords
      this.setState({
        lng: longitude,
        lat: latitude,
        acc: accuracy
      })
    })
  }

  render() {
    return (
      <MapComponent
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBCom5sLobo4uZE-UsqgIg2XsvusgSQPdQ&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100vh` }} />}
        coords={this.state}
        jobs={[
          {
            name: 'Cape Otway Lightstation',
            description: 'Pictures of the lighthouse from the western side',
            lat: -38.8559933,
            lng: 143.5100641,
            completed: false,
            expensive: false
          },
          {
            name: 'Hordern Vale',
            description: 'Photographs of the cliffs from Hordern Lookout',
            lat: -38.8543526,
            lng: 143.501011,
            completed: true,
            expensive: true
          }
        ]}
      />
    )
  }
}
