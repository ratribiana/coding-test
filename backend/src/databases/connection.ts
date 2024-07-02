import mongoose from 'mongoose';

import { MONGODB_URI } from '@config';
import { logger } from '@utils/logger';

const DB = mongoose.connection;
let isConnectedBefore = false;

mongoose.set('strictQuery', false);

const dbStateListeners: (() => void)[] = [];

async function connect() {
  if (DB.readyState === 0) {
    await mongoose.connect(MONGODB_URI, {} as mongoose.ConnectOptions);
  }

  logger.info(`[DATABASE]: Connected to "${MONGODB_URI}".`);
  logger.info(`=================================================================`);

  dbStateListeners.forEach(listener => listener());
}

export const dbDrop = async () => {
  try {
    await mongoose.connection.dropDatabase();
    console.log('Database has been dropped');
    process.exit();
  } catch (error) {
    console.log(`[DATABASE]: [ERROR] ${error}`);
  }
};

const whenReady = (callback: () => void) => {
  if (DB.readyState === 1) {
    callback();
  } else {
    dbStateListeners.push(callback);
  }
};

const closeDatabaseConnection: () => Promise<void> = async () => {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  } catch (error) {
    logger.error('Error closing database connection:', error);
  }
};

const dbError = () => {
  DB.on('error', function () {
    logger.info('[DATABASE]: [ERROR] Could not connect to MongoDB');
  });
};

const dbDisconnected = () => {
  DB.on('disconnected', function () {
    logger.info('[DATABASE]: [ERROR] Lost MongoDB connection...');
    if (!isConnectedBefore) connect();
  });
};

const dbConnected = () => {
  DB.on('connected', function () {
    isConnectedBefore = true;
    logger.info('[DATABASE]: Connection established to MongoDB');
  });
};

const dbReconnected = () => {
  DB.on('reconnected', function () {
    logger.info('[DATABASE]: Reconnected to MongoDB');
  });
};

const dbExit = () => {
  // Close the Mongoose connection, when receiving SIGINT, SIGTERM and SIGQUIT
  ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(signal =>
    process.on(signal, async () => {
      logger.info(`[${signal}] Received`);
      await mongoose.connection.close();
      logger.info('Force to close the MongoDB connection');
      process.exit(0);
    }),
  );
};

const startConnection = async () => {
  await connect();
  await dbError();
  await dbDisconnected();
  await dbConnected();
  await dbReconnected();
  await dbExit();
};

export default {
  startConnection,
  connect,
  whenReady,
  closeDatabaseConnection,
  dbError,
  dbDisconnected,
  dbConnected,
  dbReconnected,
  dbExit,
};
