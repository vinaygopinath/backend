/**
 * This file is for implementing the server
 * to listen for incoming connections
 */
import * as http from 'http';

import { config } from '../config/config';
import { app } from './app';

// listen for the connection
const server = http.createServer(app);
server.listen(config.port, (err: Error) => {
  if (err) {
    // console.error(err)
  }
  // console.info('Server started on port %s.', config.port)
});
