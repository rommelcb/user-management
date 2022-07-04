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

  
};