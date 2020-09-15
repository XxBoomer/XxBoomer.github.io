// Start at question #1
var num = 0;
var score = 0;
var time = 0;
var timer = "";
//
var last_player = JSON.parse(localStorage.getItem("names"));

// SUBMIT INITIALAS
$("#submit").on("click",function() {
  $("#highscore").hide();
  $("#highscore-board").show();
  var initials = $("#initials").val();
  addHighscore(initials,score);
  getHighscore();
});
// START
$("#start").on("click",function() {
  // Hide start screen
  $("#start-screen").hide();

  // Start timer
  timer = setInterval(myTimer, 1000);
  time = 74;
  $("#time").text("75");
  // Show questions div
  $("#questions").show();

  // Set question
  setQuestion(num);
});
$("#view-highscore").on("click",function() {
  $("#questions").hide();
  $("#start-screen").hide();
  $("#highscore-board").show();
  getHighscore();
  stopTimer();
  $("#time").text("0");
  $("#result").text("");
});
$("#clear-highscore").on("click",function() {
  localStorage.clear();
  getHighscore();
});
$(".choices").on("click",function() {
  var value = $(this).val();
  // Check answer
  if (value == questions[num].answer) {
    $("#result").append("<hr> Correct !");
    score++;
  }
  else {
    $("#result").append("<hr> Wrong !");
    time-=10;
  }

  // Move on to next question
  num++;
    // Check end of questions
    if (num == questions.length) {
      $("#questions").hide();
      $("#point").text(score);
      $("#highscore").show();
      $("#time").text("0");
      $("#result").text("");
      time = 0;
      stopTimer();
    }
    else {
      // Dsiplay questions
      $("#title").text(questions[num].title);
      // Display choices
      for (var i = 0; i <= questions[num].choices.length; i++) {
        $("#choice-" + i).text(questions[num].choices[i]);
        $("#choice-" + i).attr("value",questions[num].choices[i]);
        $("#choice-" + i).attr("text",questions[num].choices[i]);
      }

      // Delay 500ms, 1/2 a second
      window.setTimeout(function() {
        $("#result").text("");
      }, 500);
      // Clear result

    }
});
function addHighscore(ini, point) {
  var player = ini + "," + point + "|";
  // Create table row
  var tRow = $("<tr>");
  // Create table data
  var ini = $("<td>").text(ini);
  var score = $("<td>").text(point);
  tRow.append(ini);
  tRow.append(score);

  // Append new tabel data into table
  $("#board").append(tRow);
  var current_player = localStorage.getItem("player");
  console.log(current_player);
  if (current_player == null)
    current_player = "";
  localStorage.setItem("player", current_player + player);
}
function getHighscore() {

  // Clear out Table
  $("#board").html("");
  var tr = $("<tr>");
  var ini = $("<th>").text("Initials");
  var score = $("<th>").text("Score");
  tr.append(ini);
  tr.append(score);
  $("#board").append(tr);

  var player = localStorage.getItem("player");
  var player_ = player.split("|");
  for (var i = 0; i < player_.length; i++) {

    var temp = player_[i].split(",");
    var ini = temp[0];
    var point = temp[1];
    var row = $("<tr>");
    var initial = $("<td>");
    var score = $("<td>");

    initial.text(ini);
    score.text(point);
    row.append(initial);
    row.append(score);
    $("#board").append(row);

  }
}
function myTimer() {
  $("#time").text(time);
  if (time <= 0)
    {
      $("#questions").hide();
      $("#point").text(score);
      $("#highscore").show();
      $("#time").text("0");
      stopTimer();
    }
    time--;
}
function stopTimer() {
  window.clearInterval(timer);
}
function setQuestion(num) {
  // Clear result
  $("#result").text("");
  // Set questions
  $("#title").text(questions[num].title);
  // Set choices
  for (var i = 0; i <= questions[num].choices.length; i++) {
    $("#choice-" + i).text(questions[num].choices[i]);
    $("#choice-" + i).attr("value",questions[num].choices[i]);
    $("#choice-" + i).attr("text",questions[num].choices[i]);
  }
}
