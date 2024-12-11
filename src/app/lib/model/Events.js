import mongoose from "mongoose";
const { Schema } = mongoose;

const eventsSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    startTime: String,
    endTime: String,
    startDate: String,
    endDate: String,
    location: {
      lat: Number,
      long: Number,
    },
    address: String,
    createby: { type: mongoose.Types.ObjectId, ref: "Users" },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Types.ObjectId, ref: "SubCategory" },
    users: { type: mongoose.Types.ObjectId, ref: "Users" },
  });
  
export const eventsModel =
  mongoose.models.Events || mongoose.model("Events", eventsSchema);
