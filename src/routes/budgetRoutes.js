import express from 'express';
import { getBudget, updateBudget } from '../controllers/budgetController.js';
// import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// router.use(protect); // Uncomment to protect all budget routes

router.route('/')
  .get(getBudget)
  .post(updateBudget);

export default router;
