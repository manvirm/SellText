

        //find postedit form
        let editPostForm = document.getElementById("editPostForm");
        
        //do something when submit is triggered
        editPostForm.addEventListener("submit", function(event){
            
         //find length of uploaded images   
        let imageUploads = document.getElementById("file").files.length;
        
        //find total number of existing images
        let existingImgs = document.querySelectorAll(".imageDeleteCheckbox").length;
        
        //find total number of potential deletions
        let imgDeletions = document.querySelectorAll(".imageDeleteCheckbox:checked").length;
        
        //figure out if form can be submitted or not (if the delete to upload ratio works)
        let newTotal = existingImgs - imgDeletions + imageUploads;
        
        if(newTotal > 6){
            //prevent from going ahead and submitting images
            event.preventDefault();
            //figure out how much you need to remove
            let removalAmount = newTotal -6;
            //send user an alert                                        //if removal amount is 1, use " ", otherwise, use "s". (we want to make sure if its plural)
            alert(`You need to remove at least ${removalAmount} (more) image${removalAmount === 1 ? "" : "s"}!`); 
            
        }
            
            
        });
    
    
    
