import { Pool } from 'pg';
import config from '../config';

const pool_1 = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort as string, 10),
});

pool_1.on('error', (error: Error) => 
{
  console.error(error.message);
});
export default pool_1;
