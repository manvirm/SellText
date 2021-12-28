var  mongoose = require("mongoose");



var TextbookSchema =  new mongoose.Schema({
    
    title: String,
    price: Number,
    course: String,
    images: [ { url: String, public_id: String} ],
    description: String,
    createdAt: {type: Date, default: Date.now},
    
    //author will be associated with the new textbook
    author: {
        
        id: {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            
            
        },
        
        username: String
        
    },
    comments: [
        
            {
                
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
                
                
                
            }
        
        
        ]
    
})

module.exports = mongoose.model("Textbook", TextbookSchema);