export default {
    port: process.env.PORT || 3000,
    ip: process.env.HOST || 'localhost',
    redis: {
      uri: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY || ''
  };