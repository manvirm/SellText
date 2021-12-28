 
 //initialize values based on ids
 var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

//check if they are equal. If they arent, create message saying: "Passwords Don't Match"
function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

//check again if any of the passwords are changed
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;