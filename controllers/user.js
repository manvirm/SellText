const User = require("../models/user");
const {cloudinary} = require("../cloudinary/profile.js");



module.exports = {
    
async updatePic(req, res, next){
    

     
   let post = await User.findById(req.params.id);

   for(const avatar of post.avatar){
            
            await cloudinary.v2.uploader.destroy(avatar.public_id);
            
            
        }
        
        
        if(req.files) {
            
        //upload new images
        for(const file of req.files){

        //post is already defined above
        //add images to post.images array
        
       post.avatar.push({
            
            url: file.secure_url,
            public_id: file.public_id
            
         })
         
  
       }
       
       
     
  
           
       
       req.flash("success", "Profile Picture Successfully Updated");
     }
     
     
    if(req.body.school){ 
    
    post.school = req.body.school;
     req.flash("success", "School Successfully Updated");
    }
    
    if(req.body.bio){
        post.bio = req.body.bio;
    }
    
     if(req.body.email){
         
         let emailCheck = await User.findOne({ email: req.body.email });
         
         if(emailCheck){
             
              req.flash('error', 'Account with that email address already exists.');
          return res.redirect("/users/" +req.params.id );
             
         }else{
         
        post.email = req.body.email;
        req.flash("success", "Email Successfully Updated");
         }
    }
       post.save();

    
        
  User.findByIdAndUpdate(req.params.id, req.body.User, function(err, updatedUser){
            
    if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }   else{
                res.redirect("/users/" +req.params.id);
            }

        });
        
    }
}