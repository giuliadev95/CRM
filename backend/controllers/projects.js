import { pool } from '../database/config.js';

// GET all projects joined to their company name
export const get_projects = async (req, res) => {
  try {
    const result = await pool.query(`
       SELECT * FROM projects_view ORDER BY name
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in getting the VIEW of all projects: ", err);
  }
};

// POST a new project
export const post_project = async (req, res) => {
  const { name, description, company_id, status, details, start_date, end_date, budget} = req.body;
  // try catch block: insert the record and use $int placeholders to establish the values' counting
  try {
    await pool.query(
      `INSERT INTO contact (name, description, company_id, status, details, start_date, end_date, budget)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        name, 
        description, 
        company_id, 
        status, 
        details, 
        start_date, 
        end_date, 
        budget    
      ]
    );
    res.status(201).send({ message: "Project created successfully." });
  } catch (err) {
    console.error(`Error creating the project: ${error}`);
    res.status(500).send({ error: "Internal server error: The creation of the project failed. Check the syntax and logic of the query in the backend." });
  }
};

// GET a single project by ID
export const get_single_project = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM projects_view WHERE id_project = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: `404 Not Found: The project with id: ${id} was not found.`});
    }

    res.send(result.rows[0]);
  } catch (err) {
    console.error(`Error retrieving the project with ID ${id}:`, err);
    res.status(500).send("Internal server error: impossible to retrieve the project.");
  }
};

// DELETE a single project by ID
export const delete_project = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM projects WHERE id_project = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `404 Not Found: Project with id: ${id} not found.` });
    }

    res.send({ message: `Project with id ${id} deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error: couldn't delete the project." });
  }
};

// UPDATE a single project by ID
export const update_project = async (req, res) => {
  const { id } = req.params;
  const { name, description, company_id, status, details, start_date, end_date, budget } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE contact
       SET name = $1, description = $2, company_id = $3, status = $4, details = $5, start_date = $6, end_date = $7, budget = $8
       WHERE id_project = $9`, // where the ID of the project is equal to the req. params id. ATTENTION: The comparison is possible because PostgreSQL automatically converts the req.params to an integer while trying to compare it with the project_id serial primary key.
      [name, description, company_id, status, details, start_date, end_date, budget] // Here, each value gets associated with the respective $placeholder.
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `404 Not Found: Project with id: ${id} not found.` });
    }

    res.send({message: `Project with id: ${id} updated successfully.`});
  } catch (err) {
    console.error("Error updating the contact: ", err);
    res.status(500).send({ error: "Error updating the project."});
  }
};

