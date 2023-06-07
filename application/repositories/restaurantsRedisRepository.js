// set redis cache
export default function restaurantsRedisRepository(repository) {
  const setCache = (options) => repository.setCache(options)
  return {
    setCache,
  }
}
