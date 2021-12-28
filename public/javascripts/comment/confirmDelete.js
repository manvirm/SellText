function ConfirmDeleteComment()
{
  var x = confirm("Are you sure you want to delete this comment?");
  if (x)
      return true;
  else
    return false;
}