const { sendMail } = require("../emailNotification");
const {sendMessage} = require('../config/rabbitmq')

module.exports = {

    async orderCancelled(data) {
        try {

            //productservice
            sendMessage({
                action: 'orderCancelation',
                data : {
                  productId : data.product_id,
                  amount : data.amount,
                }
              });

              sendMessage({
                action: 'processRefund',
                data : {
                  charge_id : data.charge_id,
                }
                
              });

            //notification
 
          return ;// Assuming you want to return the data received from the server
        } catch (error) {
            console.error(error);
            throw new Error('Authentication Failed');
        }
    },
    async refundinititated(data) {
        try {

            //productservice
            sendMessage({
                action: 'refundSucessful',
                data

              });

 
            return ; // Assuming you want to return the data received from the server
        } catch (error) {
            console.error(error);
            throw new Error('error sending the data');
        }
    },

    async paymentStatus(data) {
        try {

            //productservice

                sendMessage({
                    action: 'productStatus',
                    data : {
                      productId : data.productId,
                      quantity : data.quantity
                    }
                  });

                  sendMessage({
                    action: 'orderStatus',
                    data : {
                      order_id : data.orderId,
                      charge_id : data.charge_id,
                      total_price : data.amount,
                      status : data.status
                    }
                  })




            
    



            
           
 
            return ; // Assuming you want to return the data received from the server
        } catch (error) {
            console.error(error);
            throw new Error('Authentication Failed');
        }
    },

    
    
}