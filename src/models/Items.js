const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    expirationDate: {type: Date, required: true},
    quantity: {type: Number, required: true},
    minimumQuantity: {type: Number, required: true},
    location: {type: String, required: true},
    foodGroup: {type: String, required: true},
    restock: {type: Boolean, required: true, default: false},
    alertDate: {type: Date, required: false},
    // userOwner:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
});

ItemSchema.methods.isExpiringSoon = function() {
    const today = new Date();
    const expirationDate = new Date(this.expirationDate);
    const differenceInDays = (expirationDate - today) / (1000 * 3600 * 24);
    return differenceInDays <= this.alertDate;
}

ItemSchema.methods.isExpired = function() {
    const today = new Date();
    const expirationDate = new Date(this.expirationDate);
    const differenceInDays = (expirationDate - today) / (1000 * 3600 * 24);
    return differenceInDays < 0;
}

ItemSchema.methods.isBelowMinimum = function() {
    return this.quantity <= this.minimumQuantity;
}

const ItemModel = mongoose.model('Item', ItemSchema);
exports.ItemModel = ItemModel;