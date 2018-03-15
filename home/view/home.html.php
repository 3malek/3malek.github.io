<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="description" content="Single Page App - City Uni" />
    <meta name="author" content="Urfan Malik" />

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Single Page App - City University</title>

    <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" type="text/javascript"></script>

</head>

<body>

	<h1>Single Page App - City University</h1>
	<h2>Below...</h2>

    <?php

    /** test code
    include "domain/Comments.php";
    $commentsObject = new Comments();
    echo "<br />";
    print_r($commentsObject->getList());
    echo "<br />";
     **/
    include "domain/Comments.php";
    $commentsObject = new Comments();
    $commentsArr = $commentsObject->getList();
    foreach ($commentsArr As $commentObj)
    {
        echo $commentObj->getPostIdInt();
        echo "<br />";
        echo $commentObj->getIdInt();
        echo "<br />";
        echo $commentObj->getNameStr();
        echo "<br />";
        echo $commentObj->getEmailStr();
        echo "<br />";
        echo $commentObj->getBodyStr();
        echo "<br />";
        echo "<br />";
    }
    echo "<br />";
    //print_r($commentsObject->getList());
    echo "<br />";

    ?>

</body>

</html>