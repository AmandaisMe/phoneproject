<?php
    include 'conExc.php';

    //保存前端的 post 数据
    $account = $_GET['account'];
    $logPass = $_GET['logPass'];

    //查询脚本
    $querySql = "select * from yj where
        tel = '$account' or email = '$account' and password = '$logPass'";

    $queryResult = query($querySql);

    if (count($queryResult) > 0)
    {
        //删除原有的  session_start();
//        session_destroy();
        session_start();
        $_SESSION["logged"] = $account;

        echo "{state: true, message:'登录成功!!!'}";
    }
?>