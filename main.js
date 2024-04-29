const express = require('express');
const app = express();
const routes = require('./routes/intercomRoutes');
const {connectWithCircuitBreaker} = require('./config/rabbitmq')
require('dotenv').config();


app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send("Welcome to the Intercom Service"); 
  });
  
app.use('/api/intercom', routes );

const port = process.env.PORT;;

connectWithCircuitBreaker().then(() => {
    console.log('Connected to RabbitMQ');
  }).catch((error) => {
    console.error('Failed to connect to RabbitMQ:', error);
  });

  // const startServer = async () => {
  //   try {
  //     await sequelize.authenticate();
  //     console.log('Connection to the database has been established successfully.');
  
      // Synchronize models with the database (if needed)
       //await sequelize.sync(); // Uncomment this line if you want to synchronize models with the database
  
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
       });
  //   } catch (error) {
  //     console.error('Unable to connect to the database:', error);
  //   }
  // };
  
  // Call the function to start the server
