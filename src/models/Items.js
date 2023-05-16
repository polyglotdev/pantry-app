const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    expirationDate: {type: Date, required: true},
    quantity: {type: Number, required: true},
    location: {type: String, required: true},
    foodGroup: {type: String, required: true}
});

module.exports = mongoose.model('ItemModel', ItemSchema);