// init env object
const envConfig = require('./config/conf')

const nodesRoute = require('./routes/nodes')

const {client, redis} = require('./helpers/redis/connection/client')({})

const logger = require('./helpers/logger/logger')

const bodyParser = require('body-parser')
const path = require('path')

const port = envConfig.port
const express = require('express')
const app = express()

let kue = require('kue')

kue.app.listen(envConfig.kue.port)


// process all background jobs 
require('./subscribers/screech')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//static file path
app.use(express.static(path.join(__dirname, '/ui/assets/')))

//static file path
// app.use(express.static(require("./_config_").project.images_path))

// view engine setup
app.set('views', [
  path.join(__dirname, '/ui/views')
])

// Set view engine as EJS
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')


//  redis client connection events 
client.on("error", function (error) {
    throw error
})

client.on("connect", function () {
    logger.info('-connected to the client-')
    app.listen(port, () => {
        logger.info(`~holter.js server~ running on port [::${port}]`)
    })
    
    // init routes
    app.use('/', nodesRoute)
})

function draw() {
  console.log(` _________________________________________________________________`)
  console.log(`|                                                                 |`)
  console.log(`|                           Holter.js                             |`)
  console.log(`|_________________________________________________________________|`)
  console.log(`|_________________________________________________________________|`)
  console.log(`|  ..          ..          ..                     ..          ..  |`)
  console.log(`| .  .        .  .        .  .                  .   .        .  . |`)
  console.log(`|.    .      .    .      .    .                .     .      .    .|`)
  console.log(`|-----------------------------------------------------------------|`)
  console.log(`|      .    .      .    .                             .    .      |`)
  console.log(`|       .  .        .  .                               .  .       |`)
  console.log(`|        ..          ..                                 ..        |`)
  console.log(`|_________________________________________________________________|`)
  console.log(`|_________________________________________________________________|`)
  console.log('')

}
async function run () {
  try {
    await draw()
    await require('./services/ConfigsReader').setConfigs()
    await require('./services/Checker').check()
  } catch (error) {
    console.log(error)
  }
}

run()