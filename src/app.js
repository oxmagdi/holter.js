// init env object
const config = require('./config/conf')

const nodesRoute = require('./web/routes/nodes')
const nodesApi = require('./web/api/nodes')
const nodesEventsApi = require('./web/api/events')

const {client, redis} = require('./libs/redis/connection/client')({})

const logger = require('./libs/logger/logger')

const bodyParser = require('body-parser')
const path = require('path')

const express = require('express')
const app = express()

let kue = require('kue')

kue.app.listen(config.kue.port)

// process all background jobs 
require('./jobs/process')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//static file path
app.use(express.static(path.join(__dirname, '/web/ui/assets/')))

//static file path
// app.use(express.static(require("./_config_").project.images_path))

// view engine setup
app.set('views', [
  path.join(__dirname, '/web/ui/views')
])

// Set view engine as EJS
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')


//  redis client connection events 
client.on("error", function (error) {
    throw error
})

client.on("connect", function () {
    logger.info('-connected to the Redis client-')
})


// init routes
app.use('/', nodesRoute)
app.use('/api/nodes/', nodesApi)
app.use('/api/events/', nodesEventsApi)

module.exports = app