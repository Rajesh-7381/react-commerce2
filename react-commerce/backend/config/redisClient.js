const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  host: '127.0.0.1', // Redis server address
  port: 6379         // Redis port (default is 6379)
});

// Handle connection error
redisClient.on('error', (err) => {
  console.error('Error connecting to Redis:', err);
});

// Connect to Redis server
redisClient.connect()
  .then(() => {
    console.log('Connected to Redis');
  })
  .catch(err => {
    console.error('Failed to connect to Redis:', err);
  });

module.exports = redisClient;
