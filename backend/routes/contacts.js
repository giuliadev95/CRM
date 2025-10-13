import express from 'express';

// import contacts' controller
import { 
    get_contacts, 
    post_contact, 
    get_single_contact, 
    delete_contact, 
    update_contact, 
    search_contact, 
    get_recent_contacts 
} from '../controllers/contacts.js';

const router = express.Router();

// contacts
router.get('/contacts/get', get_contacts);
router.get('/contact/get/:id', get_single_contact);              
router.get('/contacts/search/contact', search_contact);
router.post('/contact/post', post_contact);
router.put('/contact/update/:id', update_contact);
router.delete('/contact/delete/:id', delete_contact);
router.get('/contacts/get/recent', get_recent_contacts);

export default router;