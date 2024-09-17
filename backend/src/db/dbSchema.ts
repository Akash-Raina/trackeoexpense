import mongoose from "mongoose";
export interface IUser{
    username: string;
    email: string;
    password: string;
}

export interface IExpense{
    user: mongoose.Types.ObjectId;
    amount: number;
    category: string;
    date: Date;
    description?: string;
}

export interface IBudget{
    user: mongoose.Types.ObjectId,
    amount: number;
    category?: string;
    month: number
}

export interface IIncome{
    user: mongoose.Types.ObjectId;
    amount: number;
    source: string[];
    date: number;
}

export interface IRecurringExpense{
    user: mongoose.Types.ObjectId,
    amount: number;
    category:string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: number;
}