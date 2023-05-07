import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expirationDate: { type: Date },
    location: { type: String, required: true },
    foodGroup: { type: String }
});

export const ItemModel = mongoose.model("items", ItemSchema);