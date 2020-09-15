setInterval(update, 1000);
load();

function update() {
  $('#clock').html(moment().format('LLLL'));
  var currentHour = moment().format('H');

  for (var i = 9; i <= 17; i++) {
    if (i < currentHour)
      $(".hour-"+i).addClass("note-past");
    else if (i == currentHour)
      $(".hour-"+currentHour).addClass("note-present");
    else
      $(".hour-"+i).addClass("note-future");
  }

}

function edit(num) {
  $(".hour-"+num).prop("disabled", (_, val) => !val);
  $(".hour-"+num).focus();
  var text = $(".edit-"+num).text();
  $(".edit-"+num).text(function(){
    if (text == "✏️")
      $(".edit-"+num).text("💾");
    else {
      save();
      $(".edit-"+num).text("✏️");
    }
  });
}

function load() {
  var note = localStorage.getItem("note");
  var obj = JSON.parse(note);

  for (var content in obj) {
    $("."+content).val(obj[content]);
    console.log(`${content}: ${obj[content]}`);
  }

}

function save() {
  var note = {
    "hour-9": $(".hour-9").val(),
    "hour-10": $(".hour-10").val(),
    "hour-11": $(".hour-11").val(),
    "hour-12": $(".hour-12").val(),
    "hour-13": $(".hour-13").val(),
    "hour-14": $(".hour-14").val(),
    "hour-15": $(".hour-15").val(),
    "hour-16": $(".hour-16").val(),
    "hour-17": $(".hour-17").val(),
  };
  localStorage.setItem("note", JSON.stringify(note));
}
