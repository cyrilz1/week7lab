let mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        firstName:{
            type: String,
            required: true
        },
        lastName: String,
    },
    age: {
        type: Number,
        validate: {
            //validator is used to check the validation
            validator: function (ageValue) {
                return ageValue >= 10 && ageValue <= 110;
            },
            message: 'Age should be a number between 10 and 110'
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Author', authorSchema);