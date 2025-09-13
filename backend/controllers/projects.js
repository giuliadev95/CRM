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
  const { name, description, company_id, status, start_date, end_date, budget } = req.body;
  try {
    await pool.query(
      `INSERT INTO projects (name, description, company_id, status, start_date, end_date, budget)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        name, 
        description, 
        company_id, 
        status, 
        start_date, 
        end_date, 
        budget    
      ]
    );
    res.status(201).send({ message: "Project created successfully." });
  } catch (err) {
    console.error(`Error creating the project: ${err}`);
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
  const { name, description, company_id, status, start_date, end_date, budget } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE projects
       SET name = $1, description = $2, company_id = $3, status = $4, start_date = $5, end_date = $6, budget = $7
       WHERE id_project = $8`,
      [name, description, company_id, status, start_date, end_date, budget, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `404 Not Found: Project with id: ${id} not found.` });
    }

    res.send({message: `Project with id: ${id} updated successfully.`});
  } catch (err) {
    console.error("Error updating the project: ", err);
    res.status(500).send({ error: "Error updating the project."});
  }
};


