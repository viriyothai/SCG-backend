// the map service implementation for use case
export default function mapService(mapService) {
  const service = mapService()

  // call Google map API
  // if there is another map API, you need to change the implementation below to call instead id Google map API
  // start with empty array and no next page token
  // default distance is set to 2km
  const getNearbyRestaurants = (lat, long, keyword) => {
    return service.nearbySearch(lat, long, keyword, 2000, 'restaurant', [], '')
  }
  return { getNearbyRestaurants }
}
