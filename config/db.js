import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const mongoUrl=process.env.MONGODB

const connectdb=async ()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log("DB connected");
    } catch (error) {
        console.log(`DB error: ${error}`);
    }
}

export default connectdb