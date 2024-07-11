import express from 'express';
import getContractors from '../controllers/getContractors.js';

const router = express.Router()

router
    .get('/', getContractors)

export default router; 