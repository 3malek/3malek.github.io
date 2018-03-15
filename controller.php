<?php

// get the q parameter from URL
$q = $_REQUEST["q"];

$hint = "";

/*
if ($q !== "")
{}
*/

include "Model.php";
$modelObj = new Model();
$modelObj->getAllData();



?>