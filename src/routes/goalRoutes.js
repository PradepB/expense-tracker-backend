import express from 'express';
import { getGoals, updateGoal } from '../controllers/goalController.js';

const router = express.Router();
router.route('/').get(getGoals);
router.route('/:id').put(updateGoal);

export default router;
