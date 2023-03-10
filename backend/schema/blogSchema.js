const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    title : {
        type : String,
        required :  true,
    },
    description : {
        type : String,
        required : true
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    comments : [
        {
           user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user"
        },
           message : {
                type : String,
                required : true
           } 
        }
    ],
    dateCreated : {
        type : Date,
        default  : new Date(Date.now())
    }
}, {
    timestamps  : true,
})

module.exports = mongoose.model("blog", blogSchema);