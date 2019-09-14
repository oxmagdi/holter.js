const pino = require('pino')
const config = require('../../../config/conf')

const logger = pino({
  enabled:  config.logger.enabled,
  prettyPrint: { 
    colorize: true,
    levelFirst: true,
    ignore: 'pid,hostname',
  },
})

module.exports = logger