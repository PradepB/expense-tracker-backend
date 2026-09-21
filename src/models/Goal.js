import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
    monthlyRate: {
      type: Number,
      default: 0,
    },
    milestones: {
      type: [Number],
      default: []
    },
    color: {
      type: String,
      default: 'from-emerald-500 to-teal-600',
    },
    targetDate: {
      type: String,
    }
  },
  { timestamps: true }
);

export default mongoose.model('Goal', goalSchema);
