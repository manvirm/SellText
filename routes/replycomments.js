var express         = require("express");

                        //"mergeParams: true" will allow the ":id" to pass by
var router          = express.Router({mergeParams: true});
var Textbook     = require("../models/textbook");
var Comment         = require("../models/comment");
var Replycomment = require("../models/replycomment")
var middleware     = require("../middleware"); 






//===================
//REPLYCOMMENT ROUTES
//==================



//replycomments create                           
//prevent anyone from POSTING comment unless logged in (postman)
router.post("/",middleware.isLoggedIn, function(req, res){
    
    //lookup comment using ID
    
Textbook.findById(req.params.id, function(err, textbook) {
    
     if(err){
           
           console.log(err);
           res.redirect("/UVIC");
           
       } else{
    
    Comment.findById(req.params.comment_id, function(err, comment) {
        
       
       if(err){
           
           console.log(err);
           res.redirect("/UVIC");
           
       } else{
           
           Replycomment.create(req.body.replycomment, function(err, replycomment){
               
               if(err){
                    req.flash("error", "Something went wrong");
                   console.log(err);
                   
               }else{
                   
                   //add id and username to comment
                   
                    replycomment.author.id = req.user._id;
                    replycomment.author.username = req.user.username;
                    replycomment.author.avatar = req.user.avatar; 
                   
                   
                   //save comment
                   replycomment.save();
                   comment.replycomments.push(replycomment);
                   comment.save();
                    req.flash("success", "Successfully Replied to comment");
                   res.redirect("/UVIC/" +textbook._id);
                   
               }
               
               
           })
           
           
       }
       
        
    });
    
       }
    
});
    
    
})








//DESTROY COMMENT
router.delete("/:replycomment_id",middleware.checkCommentOwnership, function(req, res){
    
     Replycomment.findByIdAndRemove(req.params.replycomment_id, req.body.replycomment, function(err, updatedReply) {
        
        if(err){
            
            res.redirect("back");
            
            
        }else{
             req.flash("success", "Comment Deleted");
            res.redirect("/UVIC/"+req.params.id);
            
            
        }
        
    })
    
    
})



module.exports = router;