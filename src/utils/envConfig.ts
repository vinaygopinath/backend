import { config } from '../../config/config';
import { IEnvConfig } from '../interfaces/IEnvConfig';
const KNOWN_ENVS = ['local', 'development', 'production'];

const env = process.env.NODE_ENV;
if (!env) {
  throw new Error('Failed to load environment configuration - NODE_ENV is not defined');
}

if (KNOWN_ENVS.indexOf(env) === -1) {
  throw new Error(`Failed to load environment configuration - Unrecognized NODE_ENV "${process.env.NODE_ENV}"`);
}

if (env === 'production') {
  // tslint:disable-next-line:no-console
  console.warn('\n\n******\nWARNING: This server is connected to the production database!\n******\n\n');
}

export const envConfig: IEnvConfig = config[env];