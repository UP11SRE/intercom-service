const axios = require('axios');
const {makeCallWithCircuitBreaker,createAxiosClient} = require('../circuit-breaker-retry'); 
const {sendMail} = require('../emailNotification');

module.exports = {
    async authenticate(email, token) {
        try {
          //const url = `${process.env.USER_URL}/api/users/auth`;
//dotenv require('dotenv').config();

            const response = await makeCallWithCircuitBreaker({
                method: 'post',
                url: 'http://localhost:8080/api/users/auth',
                data: { email, token }, // Data for the POST request
              });
              return response;
        } catch (error) {
            console.error(error);
            throw new Error('Authentication Failed');
        }
    },
    
      async productAvilability(productId) {
        try {


            const response = await makeCallWithCircuitBreaker({
                method: 'get',
                url: `http://localhost:8081/api/products/getbyid/${productId}`,
              });



              sendMail(mailOptions);
              return response;

        } catch (error) {
          console.error(error);
          throw new Error('Product Quantity Check Failed');
        }
      },
      async pay(amnt, email, customername, orderId) {
        try {


            const response = await makeCallWithCircuitBreaker({
                method: 'post',
                url: 'http://localhost:8083/api/payment/payment',
                data: { amnt, email, customername, orderId }, // Data for the POST request
              });
              return response;



        } catch (error) {
          console.error(error);
          throw new Error('Payment Initation Failed');
        }
      },
    }