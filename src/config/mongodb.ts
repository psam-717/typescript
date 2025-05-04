import mongoose from "mongoose";

const connectDB = async(): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if(!mongoURI){
            throw new Error('Mongo URI not defined')
        }
        await mongoose.connect(mongoURI);
        console.log('Database connected');
    } catch (error) {
        console.error(error);
        process.exit(1)// exit app due to failure
    }
}

export default connectDB;