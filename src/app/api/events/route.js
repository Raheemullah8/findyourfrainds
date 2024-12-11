import { connectDB } from "@/app/lib/db/connectdb";
import { eventsModel } from "@/app/lib/model/Events";
import { userModel } from "@/app/lib/model/Users";
import { CategoryModel } from "@/app/lib/model/Category";
import { SubCateoryModel } from "@/app/lib/model/Subcategory";

export async function GET(request) {
  connectDB();
  const url = request.url;
  const query = {};
  const events = await eventsModel
    .find(query)
    .populate("category", "title")
    .populate("createby", "fullname email profileimage")
    .populate("subcategory", "title");

  return Response.json(
    {
      msg: "events fetch sucessfull",
      events,
    },
    {
      status: 200,
    }
  );
}
export async function POST(request) {
    connectDB();
    const obj = await request.json();
    
    // Correctly access the createby field from the request body
    const user = await userModel.findOne({ _id: obj.createby });
  if (!user)
    return Response.json(
      {
        error: true,
        msg: "User not found",
        data: null,
      },
      { status: 403 }
    );
  
    let newevents = new eventsModel(obj);
    await newevents.save();  // Saving the new event, not 'newcategory'
  
    return Response.json(
      {
        msg: "Event added successfully",
        event: newevents,
      },
      {
        status: 201,
      }
    );
  }
  