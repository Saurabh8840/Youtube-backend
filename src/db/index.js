import mongoose from "mongoose";


import { DB_NAME } from "../constant";

const connectDB=async()=>{

    try {
         const mongooseInstace=await mongoose.connect(`{process.env.MONGODB_URL}/{DB_NAME}`);
         console.log(`\n MongoDb connected successfully`);
    } catch (error) {
        console.log("Mongodb connection failed",error);
        process.exit(1)
        
    }


}

export default connectDB;

