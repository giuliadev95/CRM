import { pool } from '../database/config.js';

// GET all contacts joined to their company name
export const get_contacts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT contact.*, company.name AS company_name
      FROM contact
      LEFT JOIN company ON contact.company_id = company.id_company
      ORDER BY contact.id_contact;
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in getting all contacts joined to their company-names.");
  }
};

// POST a new contact
export const post_contact = async (req, res) => {
  const { name, phone, email, role, company_id, details } = req.body;

  if (!name || !email) {
    return res.status(400).send({
      error: 'The name or email of the contact are missing, you must insert them both!'
    });
  }

  try {
    await pool.query(
      `INSERT INTO contact (name, phone, email, role, company_id, details)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, phone || '', email, role || '', company_id || null, details || '']
    );

    res.status(201).send({ message: 'Contact added successfully.' });
  } catch (err) {
    console.error('Error inserting the contact', err);
    res.status(500).send({ error: 'The insert in the database failed.' });
  }
};

// GET a single contact ( BY ID )
export const get_single_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT contact.*, company.name AS company_name
       FROM contact
       LEFT JOIN company ON contact.company_id = company.id_company
       WHERE id_contact = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: `The contact with id: ${id} was not found.` });
    }

    res.send(result.rows[0]);
  } catch (err) {
    console.error(`Error retrieving the contact with ID ${id}:`, err);
    res.status(500).send('Internal server error: couldn\'t retrieve the contact.');
  }
};

// DELETE a single contact ( by ID )
export const delete_contact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM contact WHERE id_contact = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `Contact with id: ${id} not found.` });
    }

    res.send({ message: `Contact with id ${id} deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error: couldn't delete the contact." });
  }
};

// UPDATE a single contact (BY ID )
export const update_contact = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, role, company_id, details } = req.body;

  if (!name || !email) {
    return res.status(400).send({ error: 'The required fields: name, email are missing.' });
  }

  try {
    const result = await pool.query(
      `UPDATE contact
       SET name = $1, phone = $2, email = $3, role = $4,
           company_id = $5, details = $6
       WHERE id_contact = $7`,
      [name, phone || '', email, role || '', company_id || null, details || '', id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send({ message: `Contact with id: ${id} not found.` });
    }

    res.send({ message: `Contact with id: ${id} updated successfully.` });
  } catch (err) {
    console.error('Error updating the contact: ', err);
    res.status(500).send({ error: 'Error updating the contact.' });
  }
};
