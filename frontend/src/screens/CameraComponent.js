import React, { Component } from 'react'
import Camera from 'react-camera'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2'

export default class CameraScreen extends Component {
  state = {
    ipfsHash: null,
    done: false
  }

  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
  }

  takePicture() {
    this.camera.capture().then(blob => {
      // we need some more swal in here
      axios.post('https://ipfs.enzypt.io/ipfs/', blob).then(res => {
        this.setState({ ipfsHash: res.headers['ipfs-hash'] })
        swal({
          title: 'Thanks!',
          text: 'Your contribution is appreciated ♡',
          type: 'success',
          confirmButtonText: 'Cool'
        }).then(() => {
          this.setState({ done: true })
        })
      })
    })
  }

  render() {
    if (this.state.done) return <Redirect to="/map" />
    return (
      <div style={style.container}>
        <Camera
          style={style.preview}
          ref={cam => {
            this.camera = cam
          }}
        >
          <div style={style.captureContainer} onClick={this.takePicture}>
            <div style={style.captureButton} />
          </div>
        </Camera>
      </div>
    )
  }
}

const style = {
  container: {
    overflow: 'hidden'
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%'
  }
}
