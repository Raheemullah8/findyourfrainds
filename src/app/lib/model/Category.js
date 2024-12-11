import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
});

// Use a unique name for the model
export const CategoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);
