import 'dotenv/config';
import pkg from 'pg';

const { Pool } = pkg;

// Create connection pool with PosgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

// Open the pool 
pool.connect()
  .then(() => console.log("Connected to the PostgreSQL database on render.com"))
  .catch(err => console.error("PostgreSQL connection error:", err));