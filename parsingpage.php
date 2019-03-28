<?php

	$text = file_get_contents('http://webrates.truefx.com/rates/connect.html?f=csv');
	$arr = array_filter(explode("\n", $text));
	unset($arr[10]);
	sort($arr);

	$array = [];
	for ($i = 0; $i < 10; $i++)
		$array[] = explode(",", $arr[$i]);
	echo json_encode($array, JSON_FORCE_OBJECT);
?>