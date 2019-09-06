let mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskName:{
        type:String,
        required: true
    },
    taskAssign: {
        type: String,
        required: true
    },
    taskDate: Date,
    taskStatus: {
        type: String,
        required: true
    },
    taskDescription: {
        type:String,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);