import {Request, Response, NextFunction} from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

export const authorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cookie = req.cookies?.['Authorization'];
        const authHeader = req.headers?.authorization;

        const accessToken = cookie || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

        if(!accessToken){
            res.status(404).json({success: false, message:'Unauthorized: No access token found'});
            return;
        }

        if(!process.env.JWT_SECRET){
            res.status(500).json({success: false, message: 'JWT_SECRET not set'});
            return;
        }
        

        const jwtUser = jwt.verify(accessToken, process.env.JWT_SECRET) as {id: string; email: string}; // a jwt user will always have an id and an email of types string after decoding

        if(!jwtUser || !jwtUser.id){
            res.status(400).json({success: false, message: 'Unauthorized: Invalid token payload'});
            return ;
        }

        // the user prop for the req object has been specified in types.d.ts
        req.user = {id: jwtUser.id};
        next()
    
    } catch (error) {
        console.error(error);
        if(error instanceof JsonWebTokenError){
            res.status(401).json({success: false, message: 'Unauthorized: Invalid token'});
            return;
        } else if (error instanceof TokenExpiredError){
            res.status(401).json({success: false, message: 'Internal server error during authorization'});
            return 
        } else { 
            res.status(500).json({success: false, message: 'Internal server error during authorization'});
            return;
        }
        
        
    }
}
