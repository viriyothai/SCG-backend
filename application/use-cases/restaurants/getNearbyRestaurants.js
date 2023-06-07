// use case to get nearby restaurant using map service
export default function getNearbyRestaurants(lat, long, keyword, mapService) {
  return mapService.getNearbyRestaurants(lat, long, keyword)
}
