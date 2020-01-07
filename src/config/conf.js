require('dotenv').config({ path:`${__dirname }/../../.env` })

module.exports = {

	port: process.env.PORT ? process.env.PORT : 4600,

	dirname : process.env.NODES_CONF_DIRENAME,
	
	logger: {
		enabled: true , // process.env.LOGGER_ENABLED == 'ok' ? true : false
	},

	// redis
	redis: {
		host   : process.env.REDIS_HOST,
		port   : process.env.REDIS_PORT,
		prefix : process.env.REDIS_PREFIX
	},
}