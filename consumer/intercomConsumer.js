const { getChannel } = require('../config/rabbitmq');
const intercomPublisher = require('../services/intercomPublisher');

(async () => {
  const channel = getChannel();
  channel.consume('orderQueue', async (message) => {
    if (message !== null) {
      const content = JSON.parse(message.content.toString());
      console.log(`Received message: ${JSON.stringify(content)}`);
      await handleMessage(content);
      channel.ack(message);
    }
  });
})();

async function handleMessage(content) {
  try {
    const { action, data } = content;
    
    switch (action) {
    //   case 'orderCreated':
    //     await intercomPublisher.orderCreated(data);
    //     break;
      case 'orderCancelled' : 
        await intercomPublisher.orderCancelled(data);
        break;
      case 'refunded' : 
        await intercomPublisher.refundinititated(data);
        break;
      case 'orderStatusUpdate' :  
        await intercomPublisher.paymentStatus(data);
        break;
      default:
        console.error(`Unknown action: ${action}`);
    }
  } catch (error) {
    console.error(`Error processing message: ${error.message}`);
  }
}
