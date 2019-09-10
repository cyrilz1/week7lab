let mongoose =require("mongoose");

let warehouseSchema  = mongoose.Schema({
    name: {
        type:String
    },
    quantity: {
        type: Number
    },
    address:{
        type: String
    }

});

let warehouseModel = mongoose.model("warehouseCol", warehouseSchema);
module.exports= warehouseModel;