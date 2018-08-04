async function createImage (state, payload, blockInfo, context) {
  console.log('watty')
  const Im = state.image
  try {
    let im = await Im.find(
      {
        _id: {
          timestamp: payload.data.timestamp,
          author: payload.data.author
        }
      }
    ).exec()

    // if post already exists do not insert it in again
    if (im.length !== 0) return

    im = new Im(
      {
        _id: {
          timestamp: payload.data.timestamp,
          author: payload.data.author
        },
        author: payload.data.author,
        hash: payload.data.hash,
        latitude: payload.data.latitude,
        longitude: payload.data.longitude,
        imageConfirmed: true
      }
    )
    await im.save()
  } catch (err) {
    console.error(err)
  }
}

module.exports = createImage
