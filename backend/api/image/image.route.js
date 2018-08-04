const express = require('express')
const imageController = require('./image.controller')

const router = express.Router()

router.route('/').get(imageController.listConfirmed)

module.exports = router
