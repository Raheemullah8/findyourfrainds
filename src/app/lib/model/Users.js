import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    profileimage:String,
    location: {
        log: Number,
        end: Number
    },
    address: String,
    bio: String,
    role: {
        type: String,
        default: "users",
        enum: ["users","admin"] 
    }
});

export const userModel = mongoose.models.Users || mongoose.model('Users', userSchema);
