import express from 'express'
import redis from 'redis'

// set config files
import dotenv from 'dotenv'
dotenv.config({ silent: process.env.NODE_ENV === 'production' })
import config from './config/config.js'
import expressConfig from './frameworks/webserver/express.js'
import serverConfig from './frameworks/webserver/server.js'

import routes from './frameworks/webserver/routes/index.js'
import redisConnection from './frameworks/databases/redis/connection.js'

// middlewares
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware.js'

const app = express()

// express.js configuration (middlewares etc.)
expressConfig(app)

// server configuration and start
serverConfig(app, config).startServer()

// create redis client
const redisClient = redisConnection(redis, config).createRedisClient()

// routes for each endpoint
routes(app, express, redisClient)

// error handling middleware
//app.use(errorHandlingMiddleware)

// Expose app
export default app
