import { connectDB } from "@/app/lib/db/connectdb";
import { userModel } from "@/app/lib/model/Users";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function GET(request) {
    await connectDB();
    const users = await userModel.find();
    return Response.json({
        msg:"data fetch sucessfull",
        users
    }, {
        status: 200,
    });
}



export async function POST(request) {
    await connectDB(); 
    const obj = await request.json(); 
    const user = await userModel.findOne({email: obj.email})
    if(user) return Response.json({
       error:true,
       msg:"User Email Already Exists",    
    },{status:403})

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(obj.password, saltRounds)
    obj.password = hashpassword

    let newUser = new userModel(obj); 
    await newUser.save();
    
    let token = jwt.sign({id:newUser._id, role:newUser.role}, process.env.JWT_KEY );
    return Response.json({
    msg:"user Added Sucessfull",
    users:newUser,
    token
 
    }, {
        status: 201,
    });
}
