import * as express from "express";

// declare module 'express-serve-static-core'{
//     interface Request{
        
//         user?: {id: string} 
//     }
// }


 declare global {
    namespace Express {
      interface Request {
        user?: {id: string}
      }
    }
  }

// declare namespace NodeJS{
//     interface ProcessEnv {
//         JWT_SECRET?: string;
//         PORT?: string;
//     }
// }

