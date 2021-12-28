 
 //initialize values based on ids
 var email = document.getElementById("emailFirst")
  , confirm_email = document.getElementById("emailConfirm");

//check if they are equal. If they arent, create message saying: "Passwords Don't Match"
function validateEmail(){
  if(email.value != confirm_email.value) {
    confirm_email.setCustomValidity("Emails Don't Match");
  } else {
    confirm_email.setCustomValidity('');
  }
}

//check again if any of the passwords are changed
email.onchange = validateEmail;
confirm_email.onkeyup = validateEmail;