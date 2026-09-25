import mongoose from 'mongoose';

const stockTransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ticker: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ['buy', 'sell'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0.01,
    },
    pricePerUnit: {
      type: Number,
      required: true,
      min: 0.01,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    fees: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('StockTransaction', stockTransactionSchema);
