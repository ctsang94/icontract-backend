import express from 'express';
import getAllProjects from '../controllers/getAllProjects.js';
import addProject from '../controllers/addProject.js';

const router = express.Router()

router
    .get('/', getAllProjects)
    .post('/', addProject);

export default router; 