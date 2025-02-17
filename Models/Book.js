import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    name: String,
    review: String,
    rating: Number
});

export default mongoose.model("Book", BookSchema);