import { pool } from '../database/config.js';

// GET all contacts joined to their company name
export const get_contacts = async (req, res) => {
  try {
    const result = await pool.query(`
       SELECT * FROM contacts_companies_view ORDER BY name
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in getting the VIEW of all contacts joined to their company-names.");
  }
};

// POST a new contact
export const post_contact = async (req, res) => {
  const { name, surname, phone, email, role, company_id, details} = req.body;
  // try catch block: insert the record and use $int placeholders to establish the values' counting
  try {
    await pool.query(
      `INSERT INTO contact (name, phone, email, role, company_id, details)
       VALUES ($1, $2, $3, $4, $5, $6, 7$)`,
      [
        name,
        surname,
        phone, 
        email, 
        role, 
        company_id,
        details
      ]
    );

    res.status(201).send({ message: "Contact created successfully." });
  } catch (err) {
    console.error(`Error creating the contact: ${error}`);
    res.status(500).send({ error: "Internal server error: The creation of the contact failed. Check the syntax and logic of the query in the backend." });
  }
};

// GET a single contact by ID
export const get_single_contact = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM contacts_companies_view WHERE id_contact = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: `404 Not Found: The contact with id: ${id} was not found.`});
    }

    res.send(result.rows[0]);
  } catch (err) {
    console.error(`Error retrieving the contact with ID ${id}:`, err);
    res.status(500).send("Internal server error: couldn't retrieve the contact.");
  }
};

// DELETE a single contact by ID
export const delete_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM contact WHERE id_contact = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `404 Not Found: Contact with id: ${id} not found.` });
    }

    res.send({ message: `Contact with id ${id} deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error: couldn't delete the contact." });
  }
};

// UPDATE a single contact by ID
export const update_contact = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, role, company_id, details } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE contact
       SET name = $1, phone = $2, email = $3, role = $4,
        company_id = $5, details = $6
       WHERE id_contact = $7`, // where the ID of the contact is equal to the req. params id. ATTENTION: The comparison is possible because PostgreSQL automatically converts the req.params to an integer while trying to compare it with the contact_id serial primary key.
      [name, phone, email, role, company_id, details, id] // Here, each value gets associated with the respective $placeholder.
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `404 Not Found: Contact with id: ${id} not found.` });
    }

    res.send({message: `Contact with id: ${id} updated successfully.`});
  } catch (err) {
    console.error("Error updating the contact: ", err);
    res.status(500).send({ error: "Error updating the contact."});
  }
};

