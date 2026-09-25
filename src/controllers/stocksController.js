import StockTransaction from '../models/StockTransaction.js';
import IPOApplication from '../models/IPOApplication.js';

export const createStockTransaction = async (req, res, next) => {
  try {
    const { ticker, type, quantity, pricePerUnit, transactionDate, fees, notes } = req.body;
    const totalAmount = (quantity * pricePerUnit) + (fees || 0);

    const transaction = await StockTransaction.create({
      user_id: req.user._id,
      ticker,
      type,
      quantity,
      pricePerUnit,
      totalAmount,
      transactionDate,
      fees,
      notes,
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const query = { user_id: req.user._id };
    if (req.query.ticker) query.ticker = req.query.ticker.toUpperCase();
    if (req.query.type) query.type = req.query.type;
    
    if (req.query.month) {
      const [year, month] = req.query.month.split('-');
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
      query.transactionDate = { $gte: startDate, $lte: endDate };
    }

    const transactions = await StockTransaction.find(query).sort({ transactionDate: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getHoldings = async (req, res, next) => {
  try {
    // Basic aggregation for MVP
    const transactions = await StockTransaction.find({ user_id: req.user._id });
    const holdings = {};

    transactions.forEach(t => {
      const ticker = t.ticker;
      if (!holdings[ticker]) {
        holdings[ticker] = { ticker, quantity: 0, totalInvested: 0, averageCost: 0, realizedPL: 0 };
      }

      if (t.type === 'buy') {
        holdings[ticker].quantity += t.quantity;
        holdings[ticker].totalInvested += (t.quantity * t.pricePerUnit);
      } else if (t.type === 'sell') {
        const avgCost = holdings[ticker].quantity > 0 ? (holdings[ticker].totalInvested / holdings[ticker].quantity) : 0;
        holdings[ticker].quantity -= t.quantity;
        holdings[ticker].totalInvested -= (avgCost * t.quantity);
        holdings[ticker].realizedPL += ((t.pricePerUnit - avgCost) * t.quantity) - t.fees;
      }
      
      holdings[ticker].averageCost = holdings[ticker].quantity > 0 
        ? (holdings[ticker].totalInvested / holdings[ticker].quantity) 
        : 0;
    });

    res.json(Object.values(holdings));
  } catch (error) {
    next(error);
  }
};

export const createIPO = async (req, res, next) => {
  try {
    const { ipoName, ticker, dateApplied, amountInvested, status, notes } = req.body;

    const ipo = await IPOApplication.create({
      user_id: req.user._id,
      ipoName,
      ticker,
      dateApplied,
      amountInvested,
      status,
      notes,
    });

    res.status(201).json(ipo);
  } catch (error) {
    next(error);
  }
};

export const getIPOs = async (req, res, next) => {
  try {
    const query = { user_id: req.user._id };
    
    if (req.query.month) {
      const [year, month] = req.query.month.split('-');
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59, 999);
      query.dateApplied = { $gte: startDate, $lte: endDate };
    }

    const ipos = await IPOApplication.find(query).sort({ dateApplied: -1 });
    res.json(ipos);
  } catch (error) {
    next(error);
  }
};

export const updateIPO = async (req, res, next) => {
  try {
    const ipo = await IPOApplication.findById(req.params.id);
    if (!ipo) {
      res.status(404);
      throw new Error('IPO not found');
    }
    if (ipo.user_id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    
    const updatedIPO = await IPOApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedIPO);
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await StockTransaction.findById(req.params.id);
    if (!transaction) {
      res.status(404);
      throw new Error('Transaction not found');
    }
    if (transaction.user_id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    await StockTransaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction removed' });
  } catch (error) {
    next(error);
  }
};

export const deleteIPO = async (req, res, next) => {
  try {
    const ipo = await IPOApplication.findById(req.params.id);
    if (!ipo) {
      res.status(404);
      throw new Error('IPO not found');
    }
    if (ipo.user_id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }
    await IPOApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'IPO removed' });
  } catch (error) {
    next(error);
  }
};
