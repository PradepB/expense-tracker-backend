import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Goal from './models/Goal.js';
import Expense from './models/Expense.js';
import User from './models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/personal_finance');
    console.log('Clearing old data...');

    await Goal.deleteMany({});
    await Expense.deleteMany({});
    await User.deleteMany({});

    const defaultUser = await User.create({
      name: 'Admin User',
      email: 'admin@finance.com',
      password: 'password123', // bcrypt will hash this
      monthlySalary: 128321
    });

    const initialGoals = [
      { user: defaultUser._id, name: 'Emergency Fund', target: 400000, current: 50000, monthlyRate: 15000, bank: 'SBI Emergency', targetDate: 'Mid 2027', color: 'from-emerald-500 to-teal-600' },
      { user: defaultUser._id, name: 'Car Down Payment', target: 250000, current: 76000, monthlyRate: 12000, bank: 'KVB Car', targetDate: 'Dec 2026', color: 'from-blue-600 to-indigo-600' },
      { user: defaultUser._id, name: 'Insurance Reserve', target: 84000, current: 24000, monthlyRate: 7000, bank: 'KVB Insurance', targetDate: 'Annual', color: 'from-purple-500 to-pink-600' },
      { user: defaultUser._id, name: 'Marriage Fund', target: 300000, current: 0, monthlyRate: 0, bank: 'FD / Debt Fund', targetDate: '2027-2028', color: 'from-amber-500 to-orange-600' },
    ];

    await Goal.insertMany(initialGoals);

    const initialExpenses = [
      { monthYear: '2026-09', category: 'Discretionary', amount: 300, title: 'Food - Snacks', account: 'HDFC', date: new Date('2026-09-13') },
      { monthYear: '2026-09', category: 'Living', amount: 4532, title: 'Transport - Bike repair', account: 'HDFC', date: new Date('2026-09-11') },
      { monthYear: '2026-09', category: 'Living', amount: 700, title: 'Social Life - Bsnl recharge', account: 'HDFC', budgetItemId: 'mobile_bills', date: new Date('2026-09-11') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 1536, title: 'Food - Marina mall', account: 'HDFC', date: new Date('2026-09-11') },
      { monthYear: '2026-09', category: 'Living', amount: 302, title: 'Transport - Petrol', account: 'HDFC', budgetItemId: 'fuel_petrol', date: new Date('2026-09-10') },
      { monthYear: '2026-09', category: 'Living', amount: 100, title: 'Food - Chicken', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Living', amount: 100, title: 'Food - Milk', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Living', amount: 600, title: 'Household - Induction fry pan', account: 'HDFC', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Living', amount: 1000, title: 'Household - Vincent', account: 'HDFC', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Living', amount: 10, title: 'Food - Leaf', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Living', amount: 25, title: 'Food - Milk', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Investments', amount: 3000, title: 'Investment - Nippon sip', account: 'Demat', budgetItemId: 'nippon_nifty', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 60, title: 'Food - Snacks', account: 'HDFC', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 25, title: 'Food - Tea', account: 'HDFC', date: new Date('2026-09-08') },
      { monthYear: '2026-09', category: 'Investments', amount: 2500, title: 'Investment - Invesko sip', account: 'Demat', budgetItemId: 'invesco_mid', date: new Date('2026-09-07') },
      { monthYear: '2026-09', category: 'Investments', amount: 2500, title: 'Investment - Quanti sip', account: 'Demat', budgetItemId: 'quant_small', date: new Date('2026-09-07') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 130, title: 'Social Life - Movie', account: 'HDFC', date: new Date('2026-09-06') },
      { monthYear: '2026-09', category: 'Living', amount: 400, title: 'Household - Market', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-06') },
      { monthYear: '2026-09', category: 'Living', amount: 600, title: 'Food - Mutton', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-06') },
      { monthYear: '2026-09', category: 'Savings', amount: 10000, title: 'Savings - Variable pay', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Savings', amount: 15000, title: 'Savings - Emg fund', account: 'SBI', budgetItemId: 'sbi_emergency', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Savings', amount: 7000, title: 'Savings - Insurance savings', account: 'KVB', budgetItemId: 'kvb_insurance', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Savings', amount: 12000, title: 'Savings - Car savings', account: 'KVB', budgetItemId: 'kvb_car', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 851, title: 'Bill - Hdfc cc bill', account: 'HDFC', budgetItemId: 'credit_card', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 30, title: 'Health - Tablet mouth ulcer', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 10, title: 'Food - Pattani mushroom', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 150, title: 'Food - Mushroom', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 60, title: 'Food - Sugarcane juice', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 1262, title: 'Household - Other grocery', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 1636, title: 'Household - Arisi kannan department', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 1606, title: 'Household - Kannan department', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 230, title: 'Food - Juice', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 440, title: 'Food - Fruits', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 220, title: 'Food - Snacks', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 35000, title: 'Savings - Amma', account: 'HDFC', budgetItemId: 'mother_support', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 4110, title: 'Investment - Seetu', account: 'HDFC', budgetItemId: 'chit_fund', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 90, title: 'Food - Snacks', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 9074, title: 'Rent - PG rend', account: 'HDFC', budgetItemId: 'rent', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 95, title: 'Food - Ice cream Nithis', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 1911, title: 'Bill - One card bill', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 35, title: 'Food - Tea', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 10, title: 'Food - Water bottle', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 199, title: 'Food - Black grapes', account: 'HDFC', budgetItemId: 'food_personal', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Living', amount: 500, title: 'Health - Tablet amma', account: 'HDFC', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Investments', amount: 2000, title: 'Investment - Creed gold', account: 'Demat', budgetItemId: 'gold_reserve', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Investments', amount: 3000, title: 'Investment - Hdfc sip', account: 'Demat', budgetItemId: 'hdfc_flexi', date: new Date('2026-09-05') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 1000, title: 'Culture - Temple', account: 'HDFC', date: new Date('2026-09-04') },
      { monthYear: '2026-09', category: 'Discretionary', amount: 119, title: 'Food - Lunch', account: 'HDFC', date: new Date('2026-09-01') }
    ];

    await Expense.insertMany(initialExpenses);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
