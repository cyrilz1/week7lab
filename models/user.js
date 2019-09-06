let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        validate:{
            validator:function(value){
                if (value%2 === 0)
                    return true;
                else
                    return false;
            },
            message:"Should be even number.Sorry :("
        }
    },
    address: {
        type: String,
        set: function(newAddress){
            return "You live in " + newAddress; //pre-processing
        },
    },
    created:{
        type:Date,
        default: Date.now
    }
});

userSchema.pre('save', function(){
    this.age += 2;
    this.address += ' City';
});

let userModel = mongoose.model("UserCollection", userSchema);

module.exports = userModel;

