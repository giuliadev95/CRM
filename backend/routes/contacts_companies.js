import express from 'express';
import { get_contacts, post_contact, get_single_contact, delete_contact, update_contact } from '../controllers/contacts.js';
import { get_companies } from '../controllers/companies.js';

const router = express.Router();

router.get('/companies/get', get_companies);    
router.get('/contacts/get', get_contacts);
router.post('/contact/post', post_contact);
router.delete('/contact/delete/:id', delete_contact);
router.put('/contact/update/:id', update_contact);
router.get('/contact/get/:id', get_single_contact);              

export default router;

