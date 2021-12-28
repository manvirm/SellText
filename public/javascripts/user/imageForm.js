//Toggle add profile pic form
$('.toggle-image-form').on('click', function() {
        
            
        
    //toggle visibility of the edit form
    $(this).siblings('#image-post-form').removeClass("image-post-form");

     
});

//when cancel button is clicked, hide form
$('.cancel-image-form').on('click', function() {
        
    
    //toggle visibility of the image form
    $(this).parents('#image-post-form').addClass("image-post-form");

});