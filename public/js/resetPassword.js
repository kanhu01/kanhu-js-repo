function resetPassword(e) {
  var data = {
    email: $('#email').val()
  };
  if (data.email == "") {
    $('#message').text('Email can not be blank.');
    return;
  }
  $('#message').text('');
  $.post("./users/resetPassword", data, function(response) {
    if (response.responseStatus == "Success") {
      $('#message').text(response.responseMessage);
    } else {
      $('#message').text(response.responseMessage);
    }
  });
}
