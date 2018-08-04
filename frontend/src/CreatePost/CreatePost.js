import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CreateImage extends Component {
  state = {
    //title: '',
    hash: '',
    //content: '',
    //tag: ''
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createImage = e => {
    e.preventDefault()
    this.props.createImage({ ...this.state })
    this.setState({
      hash: '',
      //content: '',
      //tag: ''
    })
  }

  render () {
    return (
      <div className='createContainer padding-30'>
        <div className='card-item padding-30'>
          <input
            className='margin-bottom-15'
            name='title'
            value={this.state.hash}
            onChange={this.handleOnChange}
            placeholder='Title'
          />
          <textarea
            className='margin-bottom-15'
            name='content'
            value={this.state.hash}
            onChange={this.handleOnChange}
            rows={4}
            placeholder='Content'
          />
          <input
            className='margin-bottom-15'
            name='tag'
            value={this.state.hash}
            onChange={this.handleOnChange}
            placeholder='Tag'
          />
          <button
            onClick={this.createImage}
            type='submit'
            className='margin-right-15'
          >Create Post</button>
        </div>
      </div>
    )
  }
}
CreateImage.displayName = 'CreatePost' // Tell React Dev Tools the component name

// Assign Prop Types
CreateImage.propTypes = {
  createImage: PropTypes.func.isRequired
}

export default CreateImage
