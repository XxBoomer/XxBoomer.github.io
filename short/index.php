<?php  
	if(isset($_GET['id'])){
		include $_SERVER['DOCUMENT_ROOT'] . '/short/includes/functions.php';
		$id  = $_GET['id'];
		$url = getUrlLocation($id);
		header('Location: ' . $url);
	}
?>

<!DOCTYPE html>
<html>
<head>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<title>URL Shortener</title>
</head>
<body>
	<input type="text" name="url">
	<input type="submit" value="Shorten My URL!"><br>
	<p class="errors"></p>

	<script type="text/javascript">
		$(document).ready(function(){
			$('input[type="submit"]').click(function(e){
				e.preventDefault();

				$('.errors').html('');
				var url = $('input[name="url"]').val();

				if(url.length == 0){
					$('.errors').html('Whoops! Please enter a URL!');
					return false;
				}

				$.post('/short/includes/process.php', {
					url: url
				}, function(data, textStatus, xhr) {
					var od = data;
					data = 'http://downloadmycode.com/short?id=' + data;
					$('.errors').html('<a href="' + data + '" target="_blank">sho.rt/' + od + '</a>')
				});
			});
		});
	</script>
</body>
</html>