var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    
    text: String,
    createdAt: {type: Date, default: Date.now},
    author: {
        
        id:{
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            
        },
        
        
        username: String,
        avatar: [ { url: String, public_id: String} ]
        
        
    },
    replycomments: [
        
            {
                
                type: mongoose.Schema.Types.ObjectId,
                ref: "Replycomment"
                
            }
        
        
        ]
    
    
});

module.exports = mongoose.model("Comment", commentSchema);

