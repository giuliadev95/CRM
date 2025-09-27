import { pool } from '../database/config.js';


// GET all companies
export const get_companies = async (req, res) => {
  try {
    const result = await pool.query(
      ` SELECT * FROM companies_view `
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error getting the companies:", err);
    res.status(500).send("Internal Server Error: Error getting the companies");
  }
};

// GET a single company by ID
export const get_single_company = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM companies_view WHERE id_company = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send({ message: `404 Not Found: The company with id: ${id} was not found.`});
    }
    res.send(result.rows[0]);
  } catch (err) {
    console.error(`Error retrieving the company with ID ${id}:`, err);
    res.status(500).send("Internal server error: couldn't retrieve the company.");
  }
};


// DELETE company by ID
 export const delete_company = async(req,res) => {
  const {id} = req.params;
  try {
    const result = await pool.query(
      ` DELETE FROM company WHERE id_company = $1 `,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send({message: `404 Not Found: Company with id: ${id} doesn't exist.`})
    }
    res.send({message: `Contact with id ${id} deleted successfully.`});
  } catch(err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error: couldn't delete the company." });
  }
 }


// POST a new company
export const post_company = async (req, res) => {
  const { name, phone, email, website, company_type, notes } = req.body;
  try{
    await pool.query(
      `INSERT INTO company (name, phone, email, website, company_type, notes)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        name,
        phone,
        email,
        website,
        company_type,
        notes
      ]
    );
    res.status(201).send({ message: "Company created successfully."});
  }
  catch(error){
    console.error(`Error creating the new company record: ${error}`);
    res.status(500).send({error:"Internal server error: Failed creating the new company record."})
  }
};


// UPDATE company by ID
export const update_company = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, website, company_type, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE company
       SET name = $1, phone = $2, email = $3, website = $4,
        company_type = $5, notes = $6
       WHERE id_company = $7`,
      [name, phone, email, website, company_type, notes, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).send({ message: `404 Not Found: Company with id: ${id} not found.` });
    }
    res.send({message: `Company with id: ${id} updated successfully.`});
  } catch (err) {
    console.error(`Error updating the company: ${err}`);
    res.status(500).send({ error: "Error updating the company."});
  }
}; 

// Get searched company
export const search_company = async (req, res) => {
  try {
    const { q } = req.query;

    // 1) Basic server-side validation
    if (typeof q !== "string") {
      return res.status(400).send("Invalid query"); // query is not a string
    }

    const trimmed = q.trim();

    // 2) Reject too-long queries
    if (trimmed.length > 100) {
      return res.status(400).send("Invalid query, too long."); // too long
    }

    // 3)To lower case for the [like] values
    const like = `%${trimmed.toLowerCase()}%`;

    // 4) Set Parametres against SQL injections
    const result = await pool.query(
      `SELECT * FROM companies_view
       WHERE LOWER(name) LIKE $1
          OR LOWER(email) LIKE $1
          OR LOWER(phone) LIKE $1
          OR LOWER(website) LIKE $1
          OR LOWER(company_type) LIKE $1
          OR LOWER(notes) LIKE $1
       ORDER BY name
       LIMIT 100`, // set a limit to the returned contacts number
      [like]
    );

    return res.json(result.rows);
  } catch (err) {
    console.error("Error in the query: ", err.message);
    return res.status(500).send("500: Internal Server Error");
  }
};