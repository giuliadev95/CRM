import express from 'express';
import { get_contacts, post_contact, get_single_contact, delete_contact, update_contact, search_contact, get_recent_contacts } from '../controllers/contacts.js';
import { get_companies, get_single_company, post_company ,update_company, delete_company, search_company} from '../controllers/companies.js';
import { get_projects, post_project, get_single_project, update_project, delete_project, search_project } from '../controllers/projects.js';
const router = express.Router();
 // companies
router.get('/companies/get', get_companies);    
router.get('/company/get/:id', get_single_company);  
router.get('/companies/search/company', search_company);  
router.post('/company/post', post_company);  
router.put('/company/update/:id', update_company);
router.delete('/company/delete/:id', delete_company);

// contacts
router.get('/contacts/get', get_contacts);
router.get('/contact/get/:id', get_single_contact);              
router.get('/contacts/search/contact', search_contact);
router.post('/contact/post', post_contact);
router.put('/contact/update/:id', update_contact);
router.delete('/contact/delete/:id', delete_contact);
router.get('/contacts/get/recent', get_recent_contacts);

// projects
router.get('/projects/get', get_projects);
router.get('/project/get/:id', get_single_project);
router.get('/projects/search/project', search_project);
router.post('/project/post', post_project);
router.put('/project/update/:id', update_project);
router.delete('/project/delete/:id', delete_project)
export default router;


