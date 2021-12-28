var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var AdminSchema = new mongoose.Schema({
    
    isAdmin: {type: Boolean, default: false}
    
})

AdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin", AdminSchema);