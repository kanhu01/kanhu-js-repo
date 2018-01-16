function loginClick(e) {
  var data = {
    username: $('#username').val(),
    password: $('#password').val()
  };
  if (data.username == "") {
    $('#message').text('Username can not be blank.');
    return;
  } else if (data.password == "") {
    $('#message').text('Password can not be blank.');
    return;
  }
  $('#message').text('');
  $.post("./users/login", data, function(response) {
    if (response.responseStatus == "Success") {
      location.href = "dashboard.html";
    } else {
      $('#message').text(response.responseMessage);
    }
  });
}

function logout() {
  $.get("./users/logout", function(response) {
    if (response.responseStatus == "Success") {
      location.href = "/";
    } else {
      alert('Something went wrong.');
    }
  });
}
