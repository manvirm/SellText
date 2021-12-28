function ConfirmDeletePost()
{
  var x = confirm("Are you sure you want to delete this post?");
  if (x)
      return true;
  else
    return false;
} 