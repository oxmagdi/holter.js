const events = require("events")
const eventEmitter = new events.EventEmitter().setMaxListeners(Infinity)


module.exports = eventEmitter