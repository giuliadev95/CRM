import express from 'express';
import { get_contacts, post_contact, get_single_contact, delete_contact, update_contact } from '../controllers/contacts.js';
import { get_companies } from '../controllers/companies.js';

const router = express.Router();

router.get('/companies', get_companies);    
router.get('/contacts', get_contacts);
router.post('/new', post_contact);
router.delete('/:id', delete_contact);
router.put('/:id', update_contact);
router.get('/:id', get_single_contact);              

export default router;

