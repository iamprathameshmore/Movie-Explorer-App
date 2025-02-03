import mongoose from "mongoose";

const MovieModelSchema = new mongoose.Schema({
    movieId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
})

const MovieModel = mongoose.model("Movie", MovieModelSchema)

export default MovieModel