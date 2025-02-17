import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({
    name: String,
    otp: String,
    email: {
        type: String,
        required: true, 
        unique: true
    },
    favorites: [{
        movieId: String,
        title: String,
        year: Number,
        poster: String
    }]
});

const UserModel = mongoose.model("User", UserModelSchema);

export default UserModel;
