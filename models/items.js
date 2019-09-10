let mongoose = require('mongoose');

let itemSchema = mongoose.Schema({
    name :String,
    cost:Number,
    quantity: Number,
    Warehouse: mongoose.Types.ObjectId
});

let itemModel = mongoose.model('itemCol', itemSchema);
module.exports = itemModel;