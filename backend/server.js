require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const demux = require('./demux')
const imageRoutes = require('./api/image/image.route')
const io = require('./utils/io')

app.use(cors())

app.use('/images', imageRoutes)

const server = app.listen(process.env.PORT, () => console.info(`Example app listening on port ${process.env.PORT}!`))

io.connect(server)

demux.watch()
