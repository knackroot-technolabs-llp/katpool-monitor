import { startServer } from './web';
import { configServer } from './config';
import { startMetricsServer, updateMetrics } from './metrics';
import dotenv from 'dotenv';

dotenv.config();
console.log(`Main: starting main()`);

const PROMETHEUS_URL = process.env.MONITORING;
if (!PROMETHEUS_URL) {
  throw new Error('Environment variable PROMETHEUS_URL is not set.');
}

async function main() {
  console.log(`Main: starting config server`);
  configServer();
  console.log(`Main: starting API server for front-end`);
  startServer();
  console.log(`Main: starting Metric Server`);
  startMetricsServer();

  console.log(`Main: Setting up interval`);
  setInterval(async () => {
    console.log(`Main: Updating metrics`);
    await updateMetrics();
  }, 10000);
}

main();
