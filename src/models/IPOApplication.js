import mongoose from 'mongoose';

const ipoApplicationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ipoName: {
      type: String,
      required: true,
      trim: true,
    },
    ticker: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    dateApplied: {
      type: Date,
      required: true,
    },
    allocatedShares: {
      type: Number,
      default: 0,
    },
    amountInvested: {
      type: Number,
      required: true,
    },
    pricePerShare: {
      type: Number,
      default: 0,
    },
    quantitySold: {
      type: Number,
      default: 0,
    },
    soldPricePerShare: {
      type: Number,
      default: 0,
    },
    dateSold: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['applied', 'allotted', 'rejected', 'listed'],
      default: 'applied',
    },
    realizedProfitLoss: {
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

export default mongoose.model('IPOApplication', ipoApplicationSchema);
