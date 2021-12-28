var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    
    
    username: {type: String, unique: true, required: true},
    password: String,
    firstName: String,
    lastName: String,
    avatar: [ { url: String, public_id: String} ],
    //cant have same email (unique) and its required which means they have to give it
    email: {type: String, unique: true, required: true},
    school: String,
    bio: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpires: Date
    
    
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);