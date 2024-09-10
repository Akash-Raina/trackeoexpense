import express, { json } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import z from "zod"
import { authMiddleware, signinMiddleware, signupMiddleware } from "../middleware";
import { Budget, Expense, RecurringExpense, User } from "../db/db";
import mongoSanitize from "mongo-sanitize"
import { mongo } from "mongoose";
dotenv.config();

export const route = express.Router();

route.post("/signup", signupMiddleware, async(req, res)=>{

 try{
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    const username = req.body.username;
    const userId = user._id;
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string);

    res.status(201).json({
        msg: "user created successfully",
        username,
        token
    })
 }
 catch(err){
    res.status(411).json({
        msg : err
    })
 }
})

route.post("/signin",signinMiddleware, async(req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        const userid = user?._id;
        const token = jwt.sign({userid}, process.env.JWT_SECRET  as string);
        res.status(200).json({
            msg: "Logged In successfully",
            userid,
            token
        })
    }
    catch(err){
        return res.status(500).json({
            error:{
                msg: err
            }
        })
    }
})

route.post("/expense", authMiddleware, async(req, res)=>{

    try{

        const body = mongoSanitize(req.body);
        const data = await Expense.create({
            user: req.userId,
            amount: body.amount,
            category: body.category,
            date: body.date,
            description: body.description
        })
    res.status(200).json({
        msg: "Expense created successfully"
    })
    }
    catch(err){
        return res.status(500).json({
            msg: err
        })
    }
})

route.post("/budget", authMiddleware, async(req, res)=>{
    try{
        const body = mongoSanitize(req.body);
        const data = await Budget.create({
            user: req.userId,
            amount: body.amount,
            category: body.category,
            month: body.month
        })
        res.status(200).json({
            msg : "budget created successfully"
        })
    }
    catch(err){
            return res.status(500).json({
                msg: err
            })
    }
})

route.post("/income", authMiddleware, async(req,res)=>{
    try{
        const body = mongoSanitize(req.body);
        const data = await Budget.create({
            user: req.userId,
            amount: body.amount,
            source: body.source,
            date: body.date
        })
        res.status(200).json({
            msg: "income created"
        })
    }
    catch(err){
        return res.status(500).json({
            msg: err
        })
    }
})

route.post("/reexpense", authMiddleware, async(req, res)=>{
    try{
        const body = mongoSanitize(req.body);
        const data = await RecurringExpense.create({
            user: req.userId,
            amount: body.amount,
            category: body.category,
            startDate: body.startDate,
            frequency: body.frequency
        })
        return res.status(500).json({
            msg: "recurring expense has been added"
        })
    }
    catch(err){
        return res.status(500).json({
            msg: err
        })
    }
})