import { pool } from '../database/config.js';

// GET all companies
export const get_companies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_company, name FROM company ORDER BY name"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error getting the companies:", err);
    res.status(500).send("Error getting the companies");
  }
};