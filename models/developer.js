let mongoose = require('mongoose');

var developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        firstName:{
            type:String,
            required: true},
        lastName:String
    },
    level:{
        type: String,
        required: true,
        uppercase: true,
        validate: {
            validator: function (levelType) {
                return levelType === 'BEGINNER' || levelType === 'EXPERT';
            },
            message: 'Level Should be BEGINNER OR EXPERT'
        }
    },
    address:{
        State:String,
        Suburb:String,
        Street:String,
        Unit: String
    }
});

module.exports = mongoose.model('Developer', developerSchema);


