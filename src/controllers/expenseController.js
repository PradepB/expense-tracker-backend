import Expense from '../models/Expense.js';
import Goal from '../models/Goal.js';

export const getExpenses = async (req, res) => {
  try {
    const { month, category } = req.query;
    const filter = {};
    if (month) filter.monthYear = month;
    if (category) filter.category = category;
    
    // if (req.user) filter.user = req.user._id;

    const expenses = await Expense.find(filter).sort({ date: -1 });

    const summary = expenses.reduce(
      (acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        acc.total += curr.amount;
        return acc;
      },
      { Living: 0, Investments: 0, Savings: 0, total: 0 }
    );

    res.json({ success: true, count: expenses.length, summary, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { monthYear, category, amount, title, budgetItemId, account, date, notes } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }
    const expense = await Expense.create({
      // user: req.user ? req.user._id : undefined,
      monthYear: monthYear || new Date().toISOString().slice(0, 7),
      title,
      category,
      amount: Number(amount),
      budgetItemId,
      account,
      date: date || new Date(),
      notes,
    });
    const goalMapping = {
      'sbi_emergency': 'Emergency Fund',
      'kvb_car': 'Car Down Payment',
      'kvb_insurance': 'Insurance Reserve'
    };
    if (budgetItemId && goalMapping[budgetItemId]) {
      await Goal.findOneAndUpdate(
        { name: goalMapping[budgetItemId] },
        { $inc: { current: Number(amount) } }
      );
    }

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: 'Expense not found' });

    // if (req.user && expense.user && expense.user.toString() !== req.user._id.toString()) {
    //   return res.status(401).json({ success: false, message: 'Not authorized' });
    // }

    await expense.deleteOne();

    const goalMapping = {
      'sbi_emergency': 'Emergency Fund',
      'kvb_car': 'Car Down Payment',
      'kvb_insurance': 'Insurance Reserve'
    };
    if (expense.budgetItemId && goalMapping[expense.budgetItemId]) {
      await Goal.findOneAndUpdate(
        { name: goalMapping[expense.budgetItemId] },
        { $inc: { current: -Number(expense.amount) } }
      );
    }

    res.json({ success: true, message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
