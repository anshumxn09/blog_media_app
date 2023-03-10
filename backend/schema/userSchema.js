const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    email : {
        type : String,
        required : true,
    },
    avatar : {
        public_id : {
            type : String,
            required : true,
        },
        url : {
            type : String,
            required : true,
        }
    },
    blogs  : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "blog"
        }
    ],
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    followings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    ],
    favourites : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "blog"
        }
    ]
}, {
    timestamps  : true,
})

userSchema.methods.isMatchedPassword = async function(password){
    return bcryptjs.compare(password, this.password);
}

userSchema.methods.generateToken = async function(){
    return jsonwebtoken.sign({_id : this._id}, process.env.SECRET);
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 12);
    }
    next();
})

module.exports = mongoose.model("user", userSchema);