import pool from './src/config/postgres.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected! Time:', res.rows[0].now);
    process.exit(0);
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();
