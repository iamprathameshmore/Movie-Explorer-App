import mongoose from "mongoose";

const UserModelSchema = new mongoose.Schema({
    name: String,
    otp: String,
    email: {
        type: String,
        require: true,
        unique: true

    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }]
})

const UserModel = mongoose.model("User", UserModelSchema)

export default UserModel