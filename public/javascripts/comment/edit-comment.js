
    //Toggle Add Comment Form
    
        
    $('.toggle-post-form').on('click', function() {
        //toggle the edit button text on click
            
        
        //toggle visibility of the edit form
        $(this).siblings('#edit-post-form').removeClass("edit-post-form");
  
         
    });
    
    $('.cancel-post-form').on('click', function() {
        //toggle the edit button text on click
            
        
        //toggle visibility of the edit form
        $(this).parents('#edit-post-form').addClass("edit-post-form");
  
    });
    
    
    
    //Toggle Edit Comment Form

 
    $('.toggle-edit-form').on('click', function() {
        //toggle the edit button text on click
            
        
        //toggle visibility of the edit form
        $(this).siblings('.edit-comment-form').toggle();
        $(this).parent().next('#deleteComment').toggleClass("delete-icon");
         
    });
    
    $('.cancel-edit-form').on('click', function() {
        //toggle the edit button text on click
            
        
        //toggle visibility of the edit form
        $(this).parents('.edit-comment-form').toggle();
          $(this).parents().parent().next('#deleteComment').toggleClass("delete-icon");
    });
    
    
    
    
    
    $('.toggle-reply-form').on('click', function() {
        //toggle the edit button text on click
            
        
        //toggle visibility of the edit form
        $(this).siblings('#edit-reply-form').removeClass("edit-reply-form");
  
         
    });
    
    $('.cancel-reply-form').on('click', function() {
        //toggle the edit button text on click
            
        
        //toggle visibility of the edit form
        $(this).parents('#edit-reply-form').addClass("edit-reply-form");
  
    });