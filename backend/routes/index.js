import express from 'express';
// import routes from projects, contacts, and companies files
import contact_routes from './contacts.js';
import projects_routes from './projects.js';
import companies_routes from './companies.js'

const router = express.Router();

router.use(contact_routes);
router.use(projects_routes);
router.use(companies_routes);

export default router;