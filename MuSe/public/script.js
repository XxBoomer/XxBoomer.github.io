//Top Ten
window.onload = function showTopTen() {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://billboard-api2.p.rapidapi.com/hot-100?date=2020-04-11&range=1-10",
	  "method": "GET",
	  "headers": {
		"x-rapidapi-host": "billboard-api2.p.rapidapi.com",
		"x-rapidapi-key": "1c308cd868msh1115aad88f439abp100b8fjsn8497a2529b9e"
	  }
	}
	$.ajax(settings).done(function (response) {
	}).then(function(response) {
	  var topTen = response.content;
		var table = $("<table>");
		table.attr("class","table");
		table.append("<tr style='font-weight: 500'><td>Rank</td><td>Name</td><td>Artist</td></tr>")

	  for (var i = 1; i <= 10; i++) {
			console.log(topTen[i].title);
			// Make a row
			var tr = $("<tr>")
			var rank = $("<td>");
			var title = $("<td>");
			var artist = $("<td>");
			rank.append(topTen[i].rank);
			title.append(topTen[i].title)
			artist.append(topTen[i].artist)
			// Add data into row
			tr.append(rank);
			tr.append(title);
			tr.append(artist);
			// Add to table
			table.append(tr);
			/*
			var span = $("<span>");
			span.attr("class","top10results");
			span.html(`<br>${topTen[i].rank} | ${topTen[i].title}/${topTen[i].artist}`);
	    $("#top10").append(span);*/
	  }
		$("#top10").append(table);
	  $("#top10").show();
	});
  }


// Declare response global for easy access
var data;
// Enter -> search
$(document).on('keypress', function (e) {
  if (e.which == 13) {
    search();
  }
});
// Click -> search
$("#searchBtn").on("click", function () {
  search();
});
// Login & Registration
$("#loginBtn").on("click", function () {
  loadWheel();
});
$("#registerBtn").on("click", function () {
  loadWheel();
});

// Notification X button
$(".delete").on("click", function () {
  $(".notification").hide();
});
// Shows song by ID
function displaySong(id) {
  // Loop through results obj for the song id
  for (var i = 0; i < data.length; i++) {
    if (data[i].song_id == id) {
      // Show song info tiles
      $("#songTitle").show();
      $("#media").show();
      $("#lyrics").show();
      // Scroll down to lyric
      var offset = $("#songTitle").offset();
      $("html, body").animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
      });
      // Set title
      $(".name").text(data[i].title);
      // Set artist
      $(".artist").html("<u>Artist(s) :</u> " + data[i].artist);
      // Set album (if availabel)
      if (data[i].album)
        $(".album").html("<u>Album :</u> " + data[i].album);
      // Set lyrics
      $("#lyrics").text(data[i].lyrics);

      // Show youtube button on media tile
      // Show spotify button on media tile
      // Parse JSON into song
      var song = JSON.parse(data[i].media);
      //console.log(song);
      // Load meida URL to buttons
      for (var i = 0; i < song.length; i++) {
        if (song[i].provider == "youtube")
          $("#youtube").attr("href", song[i].url);
        else if (song[i].provider == "spotify")
          $("#spotify").attr("href", song[i].url);
        else if (song[i].provider == "soundcloud")
          $("#soundcloud").attr("href", song[i].url);
      }
      break;
    }
  }
};
// SEARCH
function search() {
  // Remove notification
  $(".notification").hide();
  // Remove Top 10 container
  $("#topSongs").hide();
  // Put loading gif to search bar while waiting to load
  $("#search-icon").html('<i class="fas fa-spinner fa-spin"></i>');
  var searchInput = $("#search-input").val();
  // Validate search input
  if (!searchInput) {
    $(".notification").show();
    // Remove loading igf
    $("#search-icon").html('<i class="fas fa-search"></i>');
    return
  }
  // Get results from API
  var api_token = "aac442290d3b6228e5387dc8352ecb4e";
  var queryURL = "https://api.audd.io/findLyrics/?q=" + searchInput + "&api_token=" + api_token;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (respond) {
    $("#results").show();
    console.log(respond);
    // Clear results
    $("#results").text("");
    // Clear search bar
    $("#search-input").val("");
    // Remove loading gif
    $("#search-icon").html('<i class="fas fa-search"></i>');
    data = respond.result;

    // DISPLAY THE RESULTS
    // Loop through result obj
    for (var i = 0; i < data.length; i++) {
      // Create new tile
      var newTile = $("<div>");
      newTile.attr("class", "box results");
      newTile.attr("onclick", "displaySong('" + data[i].song_id + "')");
      //newTile.attr("name",data[i].song_id);
      //console.log(data[i]);
      // Append title onto the tile
      newTile.append('<strong>' + data[i].full_title + '</strong><br>');
      // Append artists onto the resulttile
      newTile.append(data[i].artist);
      $("#results").append(newTile);
    }
  });
}
