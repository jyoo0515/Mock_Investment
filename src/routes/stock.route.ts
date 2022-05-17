import express from 'express';
import * as stockController from '../controllers/stock.controller';
import * as auth from '../middleware/auth';
const router = express.Router();

router.route('/').get(stockController.getAll);

export default router;
