import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // Set to true if auth is strictly enforced
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please enter a description or title'],
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'Please add an expense amount']
    },
    category: {
      type: String,
      required: true,
      enum: ['Living', 'Investments', 'Savings', 'Discretionary', 'Emergency']
    },
    budgetItemId: {
      type: String,
      default: null
    },
    account: {
      type: String,
      enum: ['HDFC', 'SBI', 'KVB', 'Demat'],
      default: 'HDFC'
    },
    monthYear: {
      type: String,
      required: true // e.g. "Sep 2026"
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

// Index for fast query per month
expenseSchema.index({ monthYear: 1, category: 1 });

export default mongoose.model('Expense', expenseSchema);
