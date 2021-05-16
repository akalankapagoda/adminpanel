import Pg from 'pg';

const pool = new Pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'carna_akalanka',
  password: 'root',
  port: 5432,
});

export default pool;