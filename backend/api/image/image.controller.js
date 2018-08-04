const Im = require('./image.model')

/**
 * Get list of all posts confirmed by the blockchain
 * @returns {Im[]}
 */
const listConfirmed = async (req, res) => {
  console.log("do it")
  try {
    console.log('wat')
    const confirmedImages = await Im.find({ imageConfirmed: true }).exec()
    console.log(confirmedImages)
    res.send(confirmedImages)
    console.log('ahppen')
  } catch (err) {
    console.error(err)
  }
}

module.exports = { listConfirmed }
