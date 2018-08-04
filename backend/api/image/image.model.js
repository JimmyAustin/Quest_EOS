const mongoose = require('mongoose')

const { Schema } = mongoose

let Im = null

try {
  const ImageSchema = new Schema({
    _id: {
      timestamp: Number,
      author: String
    },
    author: String,
    hash: String,
    latitude: String,
    longitude: String,
    accuracy: String,
    imageConfirmed: {
      type: Boolean,
      default: false
    }
  })
  Im = mongoose.model('Image', ImageSchema)
} catch (e) {
  Im = mongoose.model('Image')
}

module.exports = Im
