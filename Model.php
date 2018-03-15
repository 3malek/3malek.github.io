<?php
/**
 * Created by IntelliJ IDEA.
 * User: Urfan
 * Date: 15/03/2018
 * Time: 17:24
 */

include "domain/Comments.php";

class Model
{
    public function __construct(){}

    public function getAllData()
    {
        $commentsObject = new Comments();
        $commentsArr = $commentsObject->getList();

        if ($commentsArr != false) {
            foreach ($commentsArr As $commentObj) {
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
        }
        else
        {
            // Output "no comments" if no comment was found
            echo "no comments";
        }

    }

}