import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'

var markerOk = require('../assets/styles/img/icons/google_maps_icon.png')

const Splash = (state) => (
  <div className="splash-main">
    <a className="logotext" />
    <button/>
  </div>
  )

const Popup =({ name, updateState }) => {
   return (
    <div className="popup-container">
      <div className="popup-image">
      <h3>{name.name || 'Cape Otway erosion'}</h3>
      </div>
      <div className="popup-main">
      <div className="popup-description">
        <h3>Requirements: </h3><h4>&nbsp;Time of day</h4>
      </div>
      <div className="popup-description">
        <h3>Location: </h3><h4>&nbsp;33° 51' 54.5148 S..</h4>
      </div>
      <div className="popup-description">
        <h3>Reward: </h3><h4>&nbsp;$$$</h4>
      </div>
      </div>
      <button onClick={() => updateState()}>Capture Data</button>
    </div>
  )
}

class MapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.setCameraState = this.setCameraState.bind(this)
  }
  state = {
    didCenter: false,
    coords: null,
    currentMarker: null,
    selectedJob: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords && !this.state.didCenter) {
      this.setState({ didCenter: true })
    }
  }

  componentDidMount() {
    // wew
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onMapClicked = this.onMapClicked.bind(this)
  }

  onMarkerClick(job, props, marker, e) {
    this.setState({
      selectedJob: job,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  setCameraState () {
    this.setState({ goToCamera: true })
  }

  render() {
    const self = this

    if (self.state.goToCamera) return <Redirect to="/camera" />

    const markers = this.props.jobs.map(function(job) {
      return (
        <Marker
          key={job.name}
          job={job}
          onClick={self.onMarkerClick.bind(this, job)}
          icon={{
            url: job_icon(job.expensive, job.completed),
            scaledSize: new window.google.maps.Size(43, 43)
          }}
          position={{ lat: job.lat, lng: job.lng }}
        >
          {self.state.selectedJob == job &&
            self.state.showingInfoWindow && (
              <InfoWindow
                key={'infowindow'}
                visible={self.state.showingInfoWindow}
              >
              <Popup name={job.name} updateState={() => self.setCameraState()} />
               {/*} <div
                  style={{
                    width: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div>
                    <h3>{self.state.selectedJob.name}</h3>
                    <div>{self.state.selectedJob.description}</div>
                  </div>
                  <img
                    src="../assets/styles/img/icons/camera.svg"
                    style={{ color: 'blue' }}
                    onClick={() => {
                      self.setState({ goToCamera: true })
                    }}
                  />
                </div> */}
              </InfoWindow>
            )}
        </Marker>
      )
    })
    return (
      <div className="main">
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: -38.8559933, lng: 143.5100641 }}
        center={{ lat: -38.8559933, lng: 143.5100641 }}
        mapTypeId={'satellite'}
        options={{ fullscreenControl: false }}
      >
        <Marker
          position={this.props.coords}
          defaultShape={'circle'}
          icon={{ url: markerOk }}
          shape={{
            coords: [this.props.coords.lat, this.props.coords.lng, 10],
            type: 'circle'
          }}
        />
        {markers}
      </GoogleMap>
      <Splash />
      </div>
    )
  }
}

var expensiveCompleteIcon = require('../assets/styles/img/icons/expensive_red.png')
var expensiveIncompleteIcon = require('../assets/styles/img/icons/expensive_green.png')
var cheapCompleteIcon = require('../assets/styles/img/icons/medium_red.png')
var cheapIncompleteIcon = require('../assets/styles/img/icons/medium_green.png')

var job_icon = function(expensive, completed) {
  if (expensive) {
    if (completed) {
      return expensiveCompleteIcon
    } else {
      return expensiveIncompleteIcon
    }
  } else {
    if (completed) {
      return cheapCompleteIcon
    } else {
      return cheapIncompleteIcon
    }
  }
}

export default withScriptjs(withGoogleMap(props => <MapComponent {...props} />))
