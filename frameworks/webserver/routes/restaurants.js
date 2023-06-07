import restaurantsController from '../../../adapters/controllers/restaurantsController.js'
import restaurantsRedisRepository from '../../../application/repositories/restaurantsRedisRepository.js'
import restaurantsRedisRepositoryImpl from '../../databases/redis/restaurantsRepositoryRedis.js'
import redisCachingMiddleware from '../middlewares/redisCachingMiddleware.js'
import googleMapAPIService from '../../services/google-map-API/googleMapAPI.js'

// router of all restaurants API
export default function restaurantsRouter(express, redisClient) {
  const router = express.Router()

  // load controller with dependencies
  const controller = restaurantsController(
    redisClient,
    restaurantsRedisRepository,
    restaurantsRedisRepositoryImpl,
    googleMapAPIService,
  )

  // API path to get list of nearby restaurants
  router
    .route('/get_nearby')
    .post(redisCachingMiddleware(redisClient), controller.getNearby)

  return router
}
