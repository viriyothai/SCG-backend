// redis function to implement in the application
export default function restaurantsRepositoryRedis(redisClient) {
  const setCache = ({ key, expireTimeSec, data }) =>
    redisClient.setex(key, expireTimeSec, data)
  return {
    setCache,
  }
}
