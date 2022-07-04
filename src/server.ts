import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';

const router = express();

/** Connect to MongoDB */
mongoose
  .connect(config.mongo.url)
  .then(() => { 
    console.log('Successfully connected to MongoDB...');
    StartServer();
  })
  .catch(error => { console.log(error) });

/** Start server */
const StartServer = () => {
  router.use((req, res, next) => {
    /** Log the Request */
    console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on('finish', () => {
      /** Log the Response */
      console.log(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`)
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** API Rules */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */

  /** Healthcheck */
  router.get('/health', (req, res, next) => res.status(200).json({ message: 'OK' }));

  /** Error Handling */
  router.use((req, res, next) => {
    const error = new Error('Not Found');
    console.log(error);

    return res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}.`));
};