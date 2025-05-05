import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';


// interface CustomRequest extends Request {
//     user?: { id: string };
//   }

export const authorization = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cookie = req.cookies?.['jwtToken'];
        const authHeader = req.headers?.authorization;

        const accessToken = cookie || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if(!accessToken){
            res.status(400).json({success: false, message: 'Unauthorized: No access Token found'});
            return;
        }

        if(!process.env.JWT_SECRET){
            res.status(400).json({success: false, message: 'JWT not set'});
            return;
        }

        const jwtUser = jwt.verify(accessToken, process.env.JWT_SECRET) as {id: string, email: string};

        if(!jwtUser || !jwtUser.id){
            res.status(400).json({success: false, message: 'Unauthorized: Invalid token payload'});
            return;
        }

        (req as any).user = {id: jwtUser.id}
        next();

    } catch (error) {
        console.error(error);
        if (error instanceof JsonWebTokenError){
            res.status(500).json({success: false, message: 'Json web token error'});
            return;
        }else if (error instanceof TokenExpiredError){
            res.status(500).json({success: false, message: 'Token has expired'});
            return;
        }else{
            res.status(500).json({success: false, message: 'Internal server error while assigning token'})
        }
    }
}