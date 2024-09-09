import mongoose from "mongoose";
import dotenv from "dotenv"
import { IBudget, IExpense, IIncome, IRecurringExpense, IUser } from "./dbSchema";
dotenv.config();
mongoose.connect(process.env.DATABASE_URL as string);

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const ExpenseSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref:'User', required: true},
    amount: {type: Number, required: true},
    category: {type: String},
    date: {type: Date, required: true},
    description: {type: String}
})

const BudgetSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true},
    category: {type: String},
    month: {type: Date, required: true}
})

const IncomeSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true},
    source: {type: [String], required: true},
    date: {type: Date, required: true},
})

const RecurringExpenseSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    amount: {type: Number, required: true},
    category: {type: String, required: true},
    startDate: {type: Date, required: true},
    frequency: {type: Date, required: true}
})

export const User = mongoose.model<IUser>("User", UserSchema);
export const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);
export const Budget = mongoose.model<IBudget>("Budget", BudgetSchema);
export const Income = mongoose.model<IIncome>("Income", IncomeSchema);
export const RecurringExpense = mongoose.model<IRecurringExpense>("RecurringExpense", RecurringExpenseSchema);