import express from 'express';
import {
  createStockTransaction,
  getHoldings,
  getTransactions,
  createIPO,
  getIPOs,
  updateIPO,
  deleteTransaction,
  deleteIPO,
} from '../controllers/stocksController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/transactions')
  .post(protect, createStockTransaction)
  .get(protect, getTransactions);

router.route('/transactions/:id')
  .delete(protect, deleteTransaction);

router.route('/holdings')
  .get(protect, getHoldings);

router.route('/ipos')
  .post(protect, createIPO)
  .get(protect, getIPOs);

router.route('/ipos/:id')
  .put(protect, updateIPO)
  .delete(protect, deleteIPO);

export default router;
