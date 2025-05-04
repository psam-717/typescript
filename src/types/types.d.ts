import { Request } from "express";

declare module 'express'{
    interface Request{
        // including the user property to the Request interface for the project
        // ? indicates that the user property is optional (i.e. it might not always be present on the request object)
        // user?: {id: string} the user prop for the request has a property called id that is a string
        user?: {id: string} 
    }
}

declare namespace NodeJS{
    interface ProcessEnv {
        JWT_SECRET?: string;
        PORT?: string;
    }
}