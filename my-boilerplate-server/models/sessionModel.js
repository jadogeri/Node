const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({

    session_id:{
        type : String,
        requred : [true, "unique session id"],
        unique:[true,"session already taken"]
    },
    userName:{
        type : String,
        requred : [true, "Please add a username"],
        //unique:[true,"Email is already taken"]
    }, 
},
{
    timestamps:true
});

module.exports = mongoose.model('SessionS',sessionSchema);