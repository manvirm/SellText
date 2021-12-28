var express         = require("express");

                        //"mergeParams: true" will allow the ":id" to pass by
var router          = express.Router({mergeParams: true});
var Textbook     = require("../models/textbook");
var Comment         = require("../models/comment");
var middleware     = require("../middleware"); 






//===================
//COMMENT ROUTES
//==================



//comments create                            //prevent anyone from POSTING comment unless logged in (postman)
router.post("/",middleware.isLoggedIn, function(req, res){
    
    //lookup textbook using ID
    
    Textbook.findById(req.params.id, function(err, textbook) {
        
       
       if(err){
           
           console.log(err);
           res.redirect("/UVIC");
           
       } else{
           
           Comment.create(req.body.comment, function(err, comment){
               
               if(err){
                    req.flash("error", "Something went wrong");
                   console.log(err);
                   
               }else{
                   
                   //add id and username to comment
                   
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.author.avatar = req.user.avatar; 
                   
                   
                   //save comment
                   comment.save();
                   textbook.comments.push(comment);
                   textbook.save();
                   
                    req.flash("success", "Successfully Added New Comment");
                   res.redirect("/UVIC/" +textbook._id);
                   
               }
               
               
           })
           
           
       }
        
    });
    
    
})




//UPDATE COMMENT


router.put("/:comment_id",middleware.checkCommentOwnership,  function(req, res){
    
    //find and update correct textbook, then redirect somewhere
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        
        if(err){
            
            res.redirect("back");
            
            
        }else{
            
           
             req.flash("success", "Comment Updated");
            res.redirect("/UVIC/" +req.params.id);
            
            
        }
        
        
        
    })
    
    
    
})



//DESTROY COMMENT
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    
     Comment.findByIdAndRemove(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        
        if(err){
            
            res.redirect("back");
            
            
        }else{
             req.flash("success", "Comment Deleted");
            res.redirect("/UVIC/"+req.params.id);
            
            
        }
        
    })
    
    
})



module.exports = router;