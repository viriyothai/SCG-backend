// set redis caching as middleware to check if the searched keyword is stored
// if found, return the mapping value
// if not found, continue working on the controller
export default function redisCachingMiddleware(redisClient) {
  return function (req, res, next) {
    if (req.params.lat && req.params.long && req.params.keyword) {
      var key =
        req.params.lat + ':' + req.params.long + ':' + req.params.keyword
      redisClient.get(key, (err, data) => {
        if (err) {
          console.log(err)
        }
        if (data) {
          return res.json(JSON.parse(data))
        }
        return next()
      })
    } else {
      return next()
    }
  }
}
