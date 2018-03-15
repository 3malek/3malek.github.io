<?php
/**
 * Created by IntelliJ IDEA.
 * User: Urfan
 * Date: 15/03/2018
 * Time: 12:54
 */

include "domain/Comment.php";

class Comments
{
    private $record;
    private $perPage = 10;
    private $currentPage;
    private $total;
    private $jsonFile = "http://jsonplaceholder.typicode.com/comments";

    public function __construct($page=1)
    {
        $this->currentPage = $page;
    }

    public function getList()
    {
        $json_array  = json_decode(file_get_contents($this->jsonFile), true);

        //print_r($json_array);
        echo "<br />";
        //exit();

        $this->total = count($json_array);

        echo "<br />";
        print($this->total);
        echo "<br />";

        $start = ($this->currentPage - 1) * $this->perPage;
        $end   = $start + $this->perPage - 1;
        $i = 0;
        $records = array();


        foreach($json_array as $record)
        {
            $commentObj = new Comment();
            $commentObj->setPostIdInt($record["postId"]);
            $commentObj->setIdInt($record["id"]);
            $commentObj->setNameStr($record["name"]);
            $commentObj->setEmailStr($record["email"]);
            $commentObj->setBodyStr($record["body"]);

            $records[$i] = $commentObj;

            /*
            foreach($record as $key => $value) {
//                if($i >= $start && $i <= $end)
                //{
                    $records[$key] = $value;
                //}
                $i++;
            }
            */
            $i++;
        }
        /*print_r($records);
        echo "<br />";
        exit();*/
        return $records ? $records : false;
    }

}
?>