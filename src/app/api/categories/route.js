import { connectDB } from "@/app/lib/db/connectdb";
import { CategoryModel } from "@/app/lib/model/Category";

export async function GET(request) {
    connectDB()
    const category = await CategoryModel.find()
    
    return Response.json({
        msg:'category fetch sucessfull',
        category,
    },{
        status:200
    })

}
export async function POST(request) {
    connectDB();
    const obj = await request.json()
    let newcategory = new CategoryModel(obj)
    await newcategory.save();
    
    return Response.json({
      msg:"category add sucessfull",
      category:newcategory
    },{
        status:201,
    })
   
}