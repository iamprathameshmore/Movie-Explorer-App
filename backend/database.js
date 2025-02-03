import mongoose from "mongoose";

function DBConnection(url) {
    mongoose.connect(url)
        .then(() => console.log("Connected To Database"))
        .catch((error) => console.error("Database Connection Failed:", error));
}

export default DBConnection;