import mongoose from "mongoose";


const { Schema } = mongoose;

const subcategorySchema = new Schema({
    title: { type: String, required: true }, 
    description: String,
    thumbnail: { type: String, required: true }, 
    category: { type: mongoose.Types.ObjectId , ref:"Category"}
});

export const SubCateoryModel = mongoose.models.SubCategory || mongoose.model("SubCategory", subcategorySchema);
