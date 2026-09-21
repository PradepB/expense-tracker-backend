import MonthlyBudget from '../models/MonthlyBudget.js';

export const getBudget = async (req, res) => {
  try {
    const { month } = req.query;
    const filter = month ? { monthYear: month } : {};
    
    // If authenticated, we would filter by user too
    if (req.user) filter.user = req.user._id;

    const budget = await MonthlyBudget.findOne(filter);
    res.json({ success: true, data: budget || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  export const updateBudget = async (req, res) => {
    try {
      const { monthYear, allocations, notes, monthlySalary } = req.body;
      
      let budget = await MonthlyBudget.findOne({ monthYear, user: req.user ? req.user._id : undefined });
      
      if (budget) {
        if (allocations !== undefined) budget.allocations = allocations;
        if (notes !== undefined) budget.notes = notes;
        if (monthlySalary !== undefined) budget.monthlySalary = monthlySalary;
        await budget.save();
      } else {
        budget = await MonthlyBudget.create({
          user: req.user ? req.user._id : undefined,
          monthYear,
          allocations,
          notes,
          monthlySalary
        });
      }
    
    res.json({ success: true, data: budget });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
