<?php

    //获取连接,查询,执行  的脚本
    include 'conExc.php';

    //获取html页面的输入数据
    $tel = $_POST["tel"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    //查询脚本
    $sqlCheck = "select * from yj
                where tel = '$tel' or email = '$email'";
    //查询结果
    $sqlCheckResult = query($sqlCheck);

    //逻辑脚本
    $sqlReg = "insert into yj(tel, email, password)
            values('$tel','$email','$password')";

    //判断tel 或 email 是否已存在
    if(count($sqlCheckResult) > 0) {

        echo "{state: false, message: 'email or tel 已被注册!!!'}";

    } else {
        //执行逻辑语句 (插入 注册)
        //返回 true Or false, 返回结果由$excResult保存
        $excResult = excute($sqlReg);

        //判断是否插入成功
        if ($excResult) {

            echo "{state: true, message: '注册成功'}";

            //注册成功后执行查询语句
            $queryResult = query($sqlCheck);

            //注册成功后 创建相应的保存购物车的表
            //获取用户名 加 $ 才符合数据库表名的命名规范
            $loggedClient = "$".($queryResult[0]->tel);

            //创建 表 语句
            $cartDataList = "CREATE TABLE ". $loggedClient ."( ".
                                   "id INT NOT NULL AUTO_INCREMENT, ".
                                   "goods_id INT(11) NOT NULL, ".
                                   "goods_num INT(11) NOT NULL, ".
                                   "goods_price INT(11) NOT NULL, ".
                                   "goods_img VARCHAR(100) NOT NULL, ".
                                   "goods_des VARCHAR(100) NOT NULL, ".
                                   "PRIMARY KEY ( id )); ";
            //执行创建表 语句
            excute($cartDataList);

             //根据查询结果  保存登录状态
            if (count($queryResult) > 0)
            {
                //删除原有的  session_start();
//                session_destroy();
//                session_start();
                $status = session_status();
                if($status == PHP_SESSION_NONE)
                {
                    //There is no active session
                    session_start();
                }
                else if ($status == PHP_SESSION_DISABLED)
                {
                    //Sessions are not available
                }
                else if ($status == PHP_SESSION_ACTIVE)
                {
                    //Destroy current and start new one
                    session_destroy();
                    session_start();
                }
                $_SESSION["logged"] = ($queryResult[0]->tel);
            }
        }
        else
        {
            echo "{state: false, message: '注册失败'}";
        }
    }

//    $status = session_status();

//    if($status == PHP_SESSION_NONE){

//        //There is no active session
//        session_start();

//    } else if ($status == PHP_SESSION_DISABLED){

//        //Sessions are not available

//    } else if ($status == PHP_SESSION_ACTIVE){

//        //Destroy current and  start new one
//        session_destroy();
//        session_start();
//    }

?>