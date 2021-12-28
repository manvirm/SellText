var mongoose = require("mongoose");

var replycommentSchema = mongoose.Schema({
    
    text: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        
        id:{
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            
        },
        
        
        username: String,
        avatar: [ { url: String, public_id: String} ]
        
        
    }
    
    
});

module.exports = mongoose.model("Replycomment", replycommentSchema);
