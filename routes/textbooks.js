const express     = require("express");
const router      = express.Router();
const Textbook = require("../models/textbook");
const User        = require("../models/user");
const request = require("request");
const middleware     = require("../middleware"); 
const async = require("async");
const multer = require("multer");
const {cloudinary, storage} = require("../cloudinary/index.js");
const upload = multer({storage});
const { errorHandler } = require("../middleware/promisehandler");

const { 
    
  updatePost,    
  destroyPost
  
} 

= require("../controllers/textbooks")

//will show all textbooks
router.get("/", function(req,res){
    
      if(req.query.search) {
          
           const regex = new RegExp(escapeRegex(req.query.search), 'gi');
          
          Textbook.find({$or : [{course: regex},{title: regex}]}, function(err, allTextbooks){
            
            if(err){
                console.log(err);
            }
            else{
                
 
                    if(allTextbooks.length < 1) {
                        req.flash("error", "No Textbooks for " +req.query.search+ " found. Please try again.");
                        return res.redirect("back");
                }
                
                
                res.render("textbooks/show.ejs", {Textbook: allTextbooks});
            }
            
        })
          
          
      }
        
     else{   Textbook.find({}, function(err, allTextbooks){
            
            if(err){
                console.log(err);
            }
            else{
                res.render("textbooks/show.ejs", {Textbook: allTextbooks});
            }
            
        })
        
     }
    })
    
    //Post new textbook button in UVIC textbook page will lead me here 
router.get("/post",middleware.isLoggedIn, function(req,res){
        
        res.render("textbooks/form.ejs");
    })

//will post new textbook at /UVIC
router.post("/",middleware.isLoggedIn, upload.array("images", 6), function(req,res){
        
        
     req.body.Textbook.author = {
        id: req.user._id,
        username: req.user.username
      }
       
       req.body.Textbook.images = []; 
       for(const file of req.files){
           
          req.body.Textbook.images.push({
                url: file.secure_url,
                public_id: file.public_id
            })
            
           
          } 
        
  Textbook.create(req.body.Textbook, function(err, newBook){
            
    if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
        }       
            
     else{
            req.flash("success", "Post Created");
              res.redirect("/UVIC");
          }
            
        })
    })
    
    //More Info button will lead here
router.get("/:id", function(req, res) {
    
    
        
 Textbook.findById(req.params.id).populate({path: 'comments', populate: { path: 'replycomments' }}).exec(function(err, foundTextbook){
                
    if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
       }     
       
       else{
           
           
              res.render("textbooks/id.ejs", {Textbook: foundTextbook});
           }
                
            });
})

router.get("/:id/edit", middleware.checkTextbookOwnership, function(req, res) {
    
      
   Textbook.findById(req.params.id, function(err, foundTextbook){
        
      
   res.render("textbooks/edit.ejs", {Textbook: foundTextbook});
        
        
    })
    
})



//place new updated info into database and over write it.
router.put("/:id", middleware.checkTextbookOwnership, upload.array("images", 6), errorHandler(updatePost));
router.delete("/:id", middleware.checkTextbookOwnership, errorHandler(destroyPost));

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;