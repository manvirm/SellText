$(document).ready(function() {
                    
    //define variable to use for creating orange border to minislides
    var x = document.getElementsByClassName("minislides");
    var i = 1;
    var j = 0;
                    
            //give first image orange border
            x[0].style =" margin-top: 3px;height:100px; width: 100px; display: inline; border: 3px solid orange;"
            
            //define swiper
            
            var swiper = new Swiper('.swiper-container', {
                autoHeight: true, //enable auto height
                 spaceBetween: 20,
                 
                  pagination: {
                    el: '.numNum',
                    type: 'fraction',
                  },
             //make buttons swipe to "nextEl" or "prevEl"
              navigation: {
                nextEl: '.btn2',
                prevEl: '.btn1',
              },
              
               on: {
                   //the transition to next slide will make the current image border 0 and next image orange
                   
                    slideNextTransitionStart: function () {
                      
                      x[i-1].style= " margin-top: 3px;height:100px; width: 100px; display: inline; border: 0;"
                       x[i].style =" margin-top: 3px;height:100px; width: 100px; display: inline; border: 3px solid orange;"
                       i++;
                    },
                    
                    //the transition to prev side will make current image border 0 and previous image orange
                    //since i is increased due to function above, it will be one greater than the current index
                    //therefore i must be subtracted by one to obtain current index, and subtracted by 2 to obtain previous index
                    
                    slidePrevTransitionStart: function () {
                      
                    
                       x[i-1].style =" margin-top: 3px;height:100px; width: 100px; display: inline; border: 0;"
                      x[i-2].style= " margin-top: 3px;height:100px; width: 100px; display: inline; border: 3px solid orange;"
                      
                       i--;
                      
                    },
                  }
            });
                    
                    
//event when minipic is clicked on

$(".thumb").on('click', 'span', function(){
swiper.slideTo($(this).index(), 500);
//make every minimage have border of none
while(j<x.length){
    
    x[j].style = " margin-top: 3px;height:100px; width: 100px; display: inline; border: 0;"
    j++;
}
//then make current miniimage index (which will match the current Bigimage index) have border of orange
i = $(this).index();
x[i].style=" margin-top: 3px;height:100px; width: 100px; display: inline; border: 3px solid orange;"
//restart j
j=0;
//increment i since i is always one greater than the current index, according to the slidetransition functions. 
//if i is not incremented, the slidetransition functions will not produce the borders for the correct miniimage
i++;
});

});