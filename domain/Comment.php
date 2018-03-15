<?php
/**
 * Created by IntelliJ IDEA.
 * User: Urfan
 * Date: 13/03/2018
 * Time: 16:20
 */

class Comment
{
    public function __construct()
    {}

    /**
     * @return int
     */
    public function getPostIdInt()
    {
        return $this->postIdInt;
    }

    /**
     * @param int $postIdInt
     */
    public function setPostIdInt($postIdInt)
    {
        $this->postIdInt = $postIdInt;
    }

    /**
     * @return int
     */
    public function getIdInt()
    {
        return $this->idInt;
    }

    /**
     * @param int $idInt
     */
    public function setIdInt($idInt)
    {
        $this->idInt = $idInt;
    }

    /**
     * @return string
     */
    public function getNameStr()
    {
        return $this->nameStr;
    }

    /**
     * @param string $nameStr
     */
    public function setNameStr($nameStr)
    {
        $this->nameStr = $nameStr;
    }

    /**
     * @return string
     */
    public function getEmailStr()
    {
        return $this->emailStr;
    }

    /**
     * @param string $emailStr
     */
    public function setEmailStr($emailStr)
    {
        $this->emailStr = $emailStr;
    }

    /**
     * @return string
     */
    public function getBodyStr()
    {
        return $this->bodyStr;
    }

    /**
     * @param string $bodyStr
     */
    public function setBodyStr($bodyStr)
    {
        $this->bodyStr = $bodyStr;
    }

    private $postIdInt=0;
    private $idInt=0;
    private $nameStr="";
    private $emailStr="";
    private $bodyStr="";

}

?>