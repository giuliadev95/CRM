import express from 'express';

// Import projects' controller
import { 
    get_projects, 
    post_project, 
    get_single_project, 
    update_project, 
    delete_project, 
    search_project 
} from '../controllers/projects.js';

const router = express.Router();

// projects
router.get('/projects/get', get_projects);
router.get('/project/get/:id', get_single_project);
router.get('/projects/search/project', search_project);
router.post('/project/post', post_project);
router.put('/project/update/:id', update_project);
router.delete('/project/delete/:id', delete_project);

export default router;
