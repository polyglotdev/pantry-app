const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    expirationDate: {type: Date, required: false},
    quantity: {type: Number, required: true},
    location: {type: String, required: true},
    foodGroup: {type: String, required: true}
});

const ItemModel = mongoose.model('Item', ItemSchema);
exports.ItemModel = ItemModel;