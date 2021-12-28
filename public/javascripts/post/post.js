

        //find post form
        let PostForm = document.getElementById("PostForm");
        
        //do something when submit is triggered
        PostForm.addEventListener("submit", function(event){
            
         //find length of uploaded images   
        let imageUploads = document.getElementById("file").files.length;
        
    
        
        if(imageUploads > 6){
            //prevent from going ahead and submitting images
            event.preventDefault();
           
            //send user an alert                                        //if removal amount is 1, use " ", otherwise, use "s". (we want to make sure if its plural)
            alert("You can only upload 6 images at a time."); 
            
        }
            
            
        });