var Textbook  = require("../models/textbook");
var Comment         = require("../models/comment");

//all the middleware goes here


    var middlewareObj = {};
    
    //check if user owns campground
   
middlewareObj.checkTextbookOwnership = function(req, res, next){
    
 if(req.isAuthenticated()){
                     
      Textbook.findById(req.params.id, function(err, foundTextbook){
                        //check if err
                if(err){
                         req.flash("error", "Textbook not found");
                       }
                
                     else{  //does user own campground?
                                 if(foundTextbook.author.id.equals(req.user._id) || req.user.isAdmin){
                                     next();
                                 }
                    
                                 else{
                                      req.flash("error", "Access Denied");
                                      res.redirect("back");
                                     }
                        }
        });
                  
                }
                        else{ 
                         req.flash("error", "Please Login");
                      res.redirect("back");
                         }
}
   
   
   //check is user owns comment
    
  middlewareObj.checkCommentOwnership = function(req, res, next){
    
 if(req.isAuthenticated()){
                     
        Comment.findById(req.params.comment_id, function(err, foundComment){
                        //check if err
                     if(err){
                            res.redirect("back");
                           }
    
                     else{
                            //does user own campground?
                            if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin || middlewareObj.checkTextbookOwnership){
                                next();
                             }
                             
                             else{
                                  req.flash("error", "Access Denied");
                                 res.redirect("back");
                            }
                        }
      });
               }
                
                    else{ 
                         req.flash("error", "Please Login");
                      res.redirect("back");
                    }
    
 }
 
 //check if user is logged in
 middlewareObj.isLoggedIn = function(req, res, next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    }
    
    req.flash("error", "Please Login");
    res.redirect("/login");
    
    
}

  
    
    module.exports = middlewareObj;