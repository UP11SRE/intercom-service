const amqp = require('amqplib');
const makeCallWithCircuitBreaker = require('../circuit-breaker-retry');
require('dotenv').config();


let connection;
let channel;

async function connect() {
  try {
    connection = await amqp.connect(product.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('orderQueue');
  } catch (error) {
    throw error; // Re-throw for handling in connectWithCircuitBreaker
  }
}

async function connectWithCircuitBreaker() {
  try {
    await makeCallWithCircuitBreaker(connect, {}, { /* Optional retry config */ });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
    // Handle connection error appropriately (e.g., log retries, retry manually later)
  }
}

function getChannel() {
  return channel;
}

async function sendMessage(message) {
  if (!channel) {
    throw new Error('Channel is not initialized. Call connect() first.');
  }
  return new Promise((resolve, reject) => {
    channel.sendToQueue('orderQueue', Buffer.from(JSON.stringify(message)), {}, (err, ok) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(ok);
      }
    });
  });
}

module.exports = { connectWithCircuitBreaker, getChannel, sendMessage };
