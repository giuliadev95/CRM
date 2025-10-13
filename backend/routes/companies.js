import express from 'express';

// import projects' controller
import { 
    get_companies, 
    get_single_company, 
    post_company,
    update_company, 
    delete_company, 
    search_company
} from '../controllers/companies.js';

const router = express.Router();

// companies
router.get('/companies/get', get_companies);    
router.get('/company/get/:id', get_single_company);  
router.get('/companies/search/company', search_company);  
router.post('/company/post', post_company);  
router.put('/company/update/:id', update_company);
router.delete('/company/delete/:id', delete_company);

export default router;
