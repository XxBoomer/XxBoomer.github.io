<?php  
	function idExists($id){
		include $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';
		$row = $conn->query("SELECT * FROM urls WHERE id = '$id'");

		if($row->num_rows > 0){
			return true;
		} else {
			return false;
		}
	}

	function urlHasBeenShortened($url){
		include $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';
		$row = $conn->query("SELECT * FROM urls WHERE link_to_page = '$url'");

		if($row->num_rows > 0){
			return true;
		} else {
			return false;
		}
	}

	function getURLID($url){
		include $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';
		$row = $conn->query("SELECT id FROM urls WHERE link_to_page = '$url'");

		return $row->fetch_assoc()['id'];
	}

	function insertID($id, $url){
		include $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';
		$conn->query("INSERT INTO urls (id, link_to_page) VALUES ('$id', '$url')");

		if(strlen($conn->error) == 0){
			return true;
		}
	}

	function getUrlLocation($id){
		include $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';
		$row = $conn->query("SELECT link_to_page FROM urls WHERE id = '$id'");

		return $row->fetch_assoc()['link_to_page'];
	}
?>