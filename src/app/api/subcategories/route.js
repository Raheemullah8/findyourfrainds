import { connectDB } from "@/app/lib/db/connectdb";
import { SubCateoryModel } from "@/app/lib/model/Subcategory";

export async function GET(request) {
    await connectDB(); 
    const requrl = request.url;
    const { searchParams } = new URL(requrl);
    console.log("search params=>", searchParams);
    const query = {};
    const category = searchParams.get("category");
    if (category) {
        query.category = category; 
    }
    
    
    const subCategory = await SubCateoryModel.find(query).populate('category', 'title'); 

    return Response.json({
        msg: "Subcategory Fetch Successful",
        subCategory,
    }, {
        status: 200,
    });
}

export async function POST(request) {
    await connectDB(); // Ensure connection is awaited
    const obj = await request.json();
    const newSubCate = new SubCateoryModel(obj);
    await newSubCate.save();
    return Response.json({
        msg: "Sub Category Add Successful", 
        subCategory: newSubCate,
    }, {
        status: 201,
    });
}
