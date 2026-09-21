import mongoose from 'mongoose';

const monthlyBudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  monthYear: {
    type: String,
    required: true, // e.g. "Sep 2026"
  },
  monthlySalary: {
    type: Number
  },
  allocations: [{
    itemId: String,
    name: String,
    category: String,
    plannedAmount: Number,
    account: String
  }],
  notes: String
}, { timestamps: true });

export default mongoose.model('MonthlyBudget', monthlyBudgetSchema);
