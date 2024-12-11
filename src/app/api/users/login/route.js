import { connectDB } from "@/app/lib/db/connectdb";
import { userModel } from "@/app/lib/model/Users";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function POST(request) {
    await connectDB(); 
    const obj = await request.json(); 
    const user = await userModel.findOne({email: obj.email})
    if(!user) return Response.json({
       error:true,
       msg:"User not Found!",    
    },{status:403})

    const ispasswordvalid = await bcrypt.compare(obj.password, user.password)
    if(!ispasswordvalid) return Response.json(
        {error:true,msg:"password is not valid"},
        {status:403})

    let token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_KEY );
    return Response.json({
    msg:"user Login Sucessfull",
    user,
    token
 
    }, {
        status: 201,
    });
}
