function addTask(e) {
  var data = {
    taskName: $('#taskName').val(),
    dueDate: $('#dueDate').val(),
    listType: $('#listType').val()
  };
  if (data.taskName == "") {
    $('#message').text('Task name can not be blank.');
    return;
  } else if (data.dueDate == "") {
    $('#message').text('Due date can not be blank.');
    return;
  }
  $('#message').text('');
  $.post("./users/addTask", data, function(response) {
    if (response.responseStatus == "Success") {
      location.href = "addTask.html";
    } else {
      $('#message').text(response.responseMessage);
    }
  });
}

function searchTask(e) {
  var data = {
    taskName: $('#taskName').val(),
    listType: $('#listType').val()
  };
  if (data.taskName == "") {
    $('#message').text('Task name can not be blank.');
    return;
  }
  $('#message').text('');
  $.post("./users/searchTask", data, function(response) {

    var trHTML = '';

    $.each(response, function(i, item) {
      console.log(item);
      trHTML += '<tr><td>' + item.task_name + '</td><td>' + item.due_date + '</td>' + '<td>' + item.list_type + '</td></tr>';
    });

    $('#tasklist').append(trHTML);
  });
}

function getAllTask() {
  $.get("./users/getAllTask", function(response) {

    var trHTML = '';

    $.each(response, function(i, item) {
      console.log(item);
      trHTML += '<tr><td>' + item.task_name + '</td><td>' + item.due_date + '</td>' + '<td>' + item.list_type + '</td></tr>';
    });

    $('#tasklist').append(trHTML);
  });
}
