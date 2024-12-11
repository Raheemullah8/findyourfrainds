import mongoose from "mongoose";

export async function connectDB() {
    try {
        let connection = await mongoose.connect(process.env.MONGODB_URI)
        console.info("connection Sucessfull",connection)
    
    } catch (error) { 
        console.log("Error in connection=>",error)
    } 
}


