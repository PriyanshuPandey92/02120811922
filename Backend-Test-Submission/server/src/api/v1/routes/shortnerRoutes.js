import express from 'express';
import {createShortURL,redirectShortURL,getStats} from '../controller/shortnerController.js';

const router = express.Router();

router.post('/shorturls', createShortURL);
router.get('/shorturls/:code', getStats);
router.get('/:code', redirectShortURL);

export default router;
