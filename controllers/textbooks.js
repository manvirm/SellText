const Textbook = require("../models/textbook");
const {cloudinary} = require("../cloudinary/index.js");



module.exports = {
    
async updatePost(req, res, next){
     
   let post = await Textbook.findById(req.params.id);
        
        //if there are images being deleted (see deleteImages array in edit.ejs)
        if(req.body.deleteImages && req.body.deleteImages.length){
        
            let deleteImages = req.body.deleteImages;
            
            //loop over deleted images array
            for(const public_id of deleteImages){
            //destroy images from cloudinary
             await cloudinary.v2.uploader.destroy(public_id);
            //delete image(s) from post.images
             for(const image of post.images){
                 
                 if(image.public_id === public_id){
                     let index = post.images.indexOf(image);
                     post.images.splice(index, 1);
                     
                 }
              }
            }
        }
        
        if(req.files) {
            
        //upload new images
        for(const file of req.files){

        //post is already defined above
        //add images to post.images array
       post.images.push({
            
            url: file.secure_url,
            public_id: file.public_id
            
         })
       }
     }
     
       post.save();
        
  Textbook.findByIdAndUpdate(req.params.id, req.body.Textbook, function(err, updatedBook){
            
    if(err){
            req.flash("error", err.message);
            res.redirect("back");
        }   else{
            
                
             req.flash("success", "Post Updated Successfully");
                res.redirect("/UVIC/" +req.params.id);
            }

        });
        
    },
    
   async destroyPost(req, res, next){
        
        
        let post = await Textbook.findByIdAndRemove(req.params.id);
        
        for(const image of post.images){
            
            await cloudinary.v2.uploader.destroy(image.public_id);
            
            
        }
        post.remove();
        req.flash("success", "Post Removed");
        res.redirect("/UVIC");
        
    }
}