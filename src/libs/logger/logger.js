const pino = require('pino')
const config = require('../../../config/conf')

const logger = pino({
  enabled:  config.app.logger.logs,
  prettyPrint: { 
    colorize: true,
    levelFirst: true,
    ignore: 'pid,hostname',
  },
})

module.exports = logger