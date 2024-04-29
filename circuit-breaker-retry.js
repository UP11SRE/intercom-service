const opossum = require('opossum');
const axios = require('axios');
const axiosRetry = require('axios-retry');

// Default circuit breaker configuration
const DEFAULT_CIRCUIT_BREAKER_CONFIG = {
  threshold: 0.5, // Failure rate threshold (e.g., 50% failures)
  cooldownTime: 5000, // Cooldown time in milliseconds (5 seconds)
  resetTime: 10000, // Time to reset after cooldown (optional)
};

// Default retry configuration (unchanged)
const DEFAULT_RETRY_CONFIG = {
  retries: 3, // Number of retries
  retryDelay: (retryCount) => retryCount * 1000, // Exponential backoff delay
};

function createAxiosClient(config = {}) {
  const client = axios.create(config);
  axiosRetry(client, DEFAULT_RETRY_CONFIG);
  return client;
}

function makeCallWithCircuitBreaker(func, circuitBreakerConfig = {}, retryConfig = {}) {
  const circuitBreaker = new opossum(DEFAULT_CIRCUIT_BREAKER_CONFIG, circuitBreakerConfig);

  return circuitBreaker.fire(async () => {
    const client = createAxiosClient(retryConfig);
    try {
      const response = await client(func); // Pass the function as the request configuration
      return response;
    } catch (error) {
      throw error; // Re-throw for further error handling
    }
  });
}

module.exports = { makeCallWithCircuitBreaker, createAxiosClient };
