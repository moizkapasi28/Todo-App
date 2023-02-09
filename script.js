let taskList = [];
let task = $("#form3").val()
let id = taskList.length
var index;
var content;

function validation(input) {
  let returnVal = true
  if (input == "") {
    $("#error").css("display", "block");
    $("#error").text("*Input is Empty");
    returnVal = false
  } else {
    $("#error").text("");
  }
  return returnVal
}

function taskRemaining(taskList) {
  $('#taskpending').html("")
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].checked != true) {
      $('#taskpending').append(`<li
    class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
    <div class="d-flex align-items-center">
      <span class="checked"><input class="form-check-input" id="checkbx" type="checkbox" value="" aria-label="..." onChange="check(${i})"/></span>
      ${taskList[i].task}<button class="btnremove" onclick="$().DeleteTask(${i});"><span class="span">Delete</span></button>
    </div>
  </li>`);
    }
  }
}

function taskCompleted(taskList) {
  $('#taskcompleted').html("")
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].checked == true) {
      $('#taskcompleted').prepend(`<li
  class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
  <div class="d-flex align-items-center">
  <span class="checked"><input class="form-check-input" id="checkbx" type="checkbox" value="" aria-label="..." onChange="uncheck(${i})" checked/></span>
    ${taskList[i].task}<button class="btnremove" onclick="$().DeleteTask(${i});"><span class="span">Delete</span></button>
  </div>
  </li>`).css({
        "text-decoration": "line-through solid black 3px"
      });
    }
  }
}

function uncheck(index) {
  taskList[index].checked = false
  console.log(taskList)
  taskRemaining(taskList)
  taskCompleted(taskList)
}

function check(index) {
  taskList[index].checked = true
  console.log(taskList)
  taskRemaining(taskList)
  taskCompleted(taskList)
}
$(document).ready(function () {
  $("#btnsubmit").click(function (e) {
    e.preventDefault();
    let task = $("#form3").val()
    if (validation(task)) {
      let taskItem = {
        id: taskList.length,
        task: enCode(task),
        checked: false
      };
      taskList.push(taskItem)
      $("#form3").val("");
      $('#taskpending').html("")
      console.log(taskList)
      taskRemaining(taskList);
    }
  });
  $(document).on('click', '.taskRemaining', function () {
    $(".tasklistrem").animate({
      height: 'toggle'
    });
  });
  $(document).on('click', '.taskcompleted', function () {
    $(".tasklistcom").animate({
      height: 'toggle'
    });
  });
  $.fn.DeleteTask = function (id) {
    taskList.splice(id, 1)
    taskRemaining(taskList)
    taskCompleted(taskList)
  }
});

function enCode(text) {
  const entities = {
    "<": "&lt;",
    ">": "&gt;",
    "/": "&#47;",
    ":": "&#58;",
    ".": "&#xb7;",
  };
  let arr = text.split("").map(function (elem) {
    if (entities.hasOwnProperty(elem)) {
      return entities[elem];
    } else {
      return elem;
    }
  });
  return arr.join("")
}

















































//edit function
// $(document).on('click', 'li', function () {
//   index = $('li').index(this)
//   content = taskList[index].task;
//   $("#form3").val(content)
//   $("#btnedit").show();
//   $("#btnsubmit").hide();
// });
// $(document).on('click', '#btnedit', function (e) {
//   e.preventDefault();
//   string = $("#form3").val()
//   if (validation(string)) {
//     taskList[index].task = string
//     document.getElementsByTagName('li')[index].innerHTML = `<div class="d-flex align-items-center">
//     <span class="checked"><input class="form-check-input" id="checkbx" type="checkbox"  value="" aria-label="..." /></span>
//     ${string}<button class="btnremove"><span class="span">Delete</span></button></div>`;
//     $("#form3").val("");
//     $("#btnedit").hide();
//     $("#btnsubmit").show();
//   }
// });