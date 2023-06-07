import restaurantsRouter from './restaurants.js'

export default function routes(app, express, redisClient) {
  app.use('/api/restaurants', restaurantsRouter(express, redisClient))
}
