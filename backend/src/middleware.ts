import { RequestHandler } from "express";
import {z} from "zod";
import { User } from "./db/db";
import jwt  from "jsonwebtoken";

const signupSchema = z.object({
    username: z.string(),
    password: z.string().min(5).max(15),
    email: z.string().email()
})

export const signupMiddleware:RequestHandler = async(req, res, next)=>{
    const check = signupSchema.safeParse(req.body);
    if(!check.success){
        return res.status(400).json({
            msg:"Incorrect input values"
        })
    }

    const user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({
            msg: "Email already exists"
        })
    }
    next();
}

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

export const signinMiddleware:RequestHandler = async(req, res, next)=>{
    const success = signinSchema.safeParse(req.body);

    if(!success.success){
        return res.status(400).json({
            msg: "wrong parameters"
        })
    }
    const found = await User.findOne({email:req.body.email});
    if(!found){
        return res.status(401).json({
            msg: "No user found, Signup please"
        })
    }
    if(found.password !== req.body.password){
        return res.status(401).json({
            msg: "Wrong Password"
        })
    }
    next();
}

interface jwtPayload{
    userid: string
}

declare module 'express-serve-static-core' {
    interface Request {
      userId?: string;  // Add the custom property
    }
  }

const expenseSchema = z.object({
    amount: z.number(),
    category: z.string(),
    date: z.date(),
    description: z.string()
})

export const authMiddleware:RequestHandler = async(req, res, next)=>{
    const token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')){
        return res.status(401).json({
            msg: "You dont have permission to access it"
        })
    }
    const check = token.split(' ')[1];
    try{
        const decoded = jwt.verify(check, process.env.JWT_SECRET as string) as jwtPayload;
        req.userId = decoded.userid;
    }
    catch(err){
        return res.status(401).json({
            msg: "No access"
        })
    }
    next();
}