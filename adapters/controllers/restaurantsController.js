import getNearbyRestaurants from '../../application/use-cases/restaurants/getNearbyRestaurants.js'
import mapService from '../services/mapService.js'

// control the application data and incoming data
// the controller will use the dependencies passing from outer layer
export default function restaurantsController(
  cachingClient,
  restaurantsCachingRepository,
  restaurantsCachingRepositoryImpl,
  mapAPIService,
) {
  // set caching repository
  const cachingRepository = restaurantsCachingRepository(
    restaurantsCachingRepositoryImpl(cachingClient),
  )

  // set map API service
  const service = mapService(mapAPIService)

  // if there are other use cases, they need to be implemented here
  // get nearby restaurants
  const getNearby = async (req, res, next) => {
    const lat = req.body.lat
    const long = req.body.long
    const keyword = req.body.keyword

    // implement use case
    getNearbyRestaurants(lat, long, keyword, service).then((restaurants) => {
      var result = []
      restaurants.forEach((restaurant) => {
        result.push({
          name: restaurant.name,
          location: {
            lat: restaurant.geometry.location.lat,
            long: restaurant.geometry.location.lng,
          },
          place_id: restaurant.place_id,
          rating: restaurant.rating,
          user_rating_total: restaurant.user_ratings_total,
          url: restaurant.photos
            ? restaurant.photos[0].html_attributions[0].split('"')[1]
            : '',
        })
      })
      // cache the result to redis
      const cachingOptions = {
        key: lat + ':' + long + ':' + keyword,
        expireTimeSec: 30,
        data: JSON.stringify(result),
      }
      cachingRepository.setCache(cachingOptions)

      return res.json(result)
    })
  }

  return {
    getNearby,
  }
}
