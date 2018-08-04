function createImage (state, payload, blockInfo, context) {
  const post = {
    _id: {
      timestamp: payload.data.timestamp,
      author: payload.data.author
    },
    author: payload.data.author,
    hash: payload.data.hash,
    latitude: payload.data.latitude,
    longitude: payload.data.longitude,
    accuracy: payload.data.accuracy
  }
  context.socket.emit('createimage', image)
}

module.exports = createImage
