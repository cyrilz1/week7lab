let mongoose = require('mongoose');

let carSchema = mongoose.Schema({
    maker:String,
    year:Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCollection'
    }
});

let carModel = mongoose.model('carCollection', carSchema);
module.exports = carModel;

