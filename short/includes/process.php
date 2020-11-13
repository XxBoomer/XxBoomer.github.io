<?php  
	include $_SERVER['DOCUMENT_ROOT'] . '/includes/init.php';
	include $_SERVER['DOCUMENT_ROOT'] . '/short/includes/functions.php';

	$id 	= rand(111,999);
	$url 	= $_POST['url']; 

	if(idExists($id) == true){
		$id = rand(111,999);
	}

	if(urlHasBeenShortened($url)){
		echo getURLID($url);
		return true;
	}

	insertID($id, $url);

	echo $id;
?>