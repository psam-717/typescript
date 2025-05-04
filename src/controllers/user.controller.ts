import User from "../models/user.model";
import { Response, Request } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, email, password} = req.body;
        //verify user does not exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            res.status(400).json({success: false, message: 'User already exists'});
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save();
         res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            data: user
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error while signing up'});
    }
}


export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            res.status(404).json({success: false, message: 'User not found'});
            return;
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({success: false, message: 'Password is incorrect'});
            return;
        }

        if(!process.env.JWT_SECRET){
            res.status(500).json({success: false, message: 'JWT_SECRET not set'});
            return;
            
        }

        // assign token when user has an account
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.cookie('jwtToken',token,{
                httpOnly: true,
                secure: process.env.NODE === 'production',
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            }
        )

        res.status(200).json({
            success: true,
            message: 'user logged in',
            data: user
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Internal server error while logging in'});
        return;
    }
}
